import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

// ── Billing helpers ─────────────────────────────────────────────────────────

/**
 * Calculate billing for a single player using their rate events.
 * Rate events allow accurate billing when group rate changes mid-session.
 *
 * @param {Object} sp  - session_player row
 * @param {Array}  events - session_rate_events for this player (or null = applies to all)
 * @param {string} membershipType - 'walk-in' | 'founders' | 'monthly'
 * @returns {number} amount in rupees
 */
export function calculatePlayerBill(sp, events, membershipType) {
  if (membershipType === 'monthly') return 0

  const start = new Date(sp.joined_at)
  const end   = sp.left_at ? new Date(sp.left_at) : new Date()
  const totalMs = end - start
  const totalMin = totalMs / 60000

  // Under 10 minutes → courtesy, free
  if (totalMin < 10) return 0

  // Sort events by time
  const sorted = [...events].sort((a, b) => new Date(a.occurred_at) - new Date(b.occurred_at))

  let amount = 0
  let cursor = start

  for (let i = 0; i < sorted.length; i++) {
    const segEnd = i + 1 < sorted.length ? new Date(sorted[i + 1].occurred_at) : end
    if (segEnd <= cursor) continue

    const segStart  = cursor > new Date(sorted[i].occurred_at) ? cursor : new Date(sorted[i].occurred_at)
    const segMin    = Math.max(0, (segEnd - segStart) / 60000)
    const rate      = sorted[i].rate_type === 'group' ? 85 : 100
    const segAmount = (segMin / 60) * rate
    amount += segAmount
    cursor  = segEnd
  }

  // Apply 30-min block rounding (minimum 30 min = ₹50)
  const blocks = Math.max(1, Math.ceil(totalMin / 30))
  const billableMin = blocks * 30
  // Re-scale amount to billable blocks
  const scaledAmount = totalMin > 0 ? (amount / totalMin) * billableMin : 50

  // Founders Club 15% discount
  if (membershipType === 'founders') return scaledAmount * 0.85

  return scaledAmount
}

export function buildUPILink(amount, description, upiId, upiName) {
  const enc = encodeURIComponent(description)
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${Math.ceil(amount)}&cu=INR&tn=${enc}`
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useSession(tableId) {
  const [session, setSession]         = useState(null)
  const [sessionPlayers, setSessionPlayers] = useState([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    if (!tableId) { setLoading(false); return }
    fetchActiveSession()
  }, [tableId])

  async function fetchActiveSession() {
    setLoading(true)
    const { data } = await supabase
      .from('sessions')
      .select(`*, session_players(*, players(*))`)
      .eq('table_id', tableId)
      .eq('status', 'active')
      .single()

    setSession(data || null)
    setSessionPlayers(data?.session_players || [])
    setLoading(false)
  }

  async function startSession(player, tableId) {
    // Mark table as occupied
    await supabase.from('tables').update({ status: 'occupied' }).eq('id', tableId)

    const { data: sess } = await supabase
      .from('sessions')
      .insert({ table_id: tableId, host_player_id: player.id, player_count: 1 })
      .select()
      .single()

    await addPlayerToSession(sess.id, player)

    // Record rate start event
    await supabase.from('session_rate_events').insert({
      session_id: sess.id,
      player_id: player.id,
      event_type: 'start',
      rate_type: resolveRateType(player, 1),
      player_count: 1,
    })

    setSession(sess)
    return sess
  }

  async function joinSession(sessionId, player) {
    // Check not already in session
    const { data: existing } = await supabase
      .from('session_players')
      .select('id')
      .eq('session_id', sessionId)
      .eq('player_id', player.id)
      .single()
    if (existing) throw new Error('Already in this session')

    // Get current active count
    const { data: current } = await supabase
      .from('session_players')
      .select('id')
      .eq('session_id', sessionId)
      .is('left_at', null)
    const newCount = (current?.length || 0) + 1

    await addPlayerToSession(sessionId, player)

    // Check table capacity
    const { data: sess } = await supabase
      .from('sessions')
      .select('table_id, tables(capacity)')
      .eq('id', sessionId)
      .single()
    if (newCount > sess.tables.capacity) throw new Error('Table is at full capacity')

    // Update session player count
    await supabase.from('sessions').update({ player_count: newCount }).eq('id', sessionId)

    // Record join event
    await supabase.from('session_rate_events').insert({
      session_id: sessionId,
      player_id: player.id,
      event_type: 'player_join',
      rate_type: resolveRateType(player, newCount),
      player_count: newCount,
    })

    // If this brings count to 5, switch all remaining players to group rate
    if (newCount === 5) {
      await supabase.from('session_rate_events').insert({
        session_id: sessionId,
        player_id: null,  // applies to all
        event_type: 'rate_change',
        rate_type: 'group',
        player_count: newCount,
      })
    }

    await fetchActiveSession()
  }

  async function leaveSession(sessionId, player) {
    const now = new Date().toISOString()

    // Fetch this player's session_player row
    const { data: sp } = await supabase
      .from('session_players')
      .select('*, players(membership_type)')
      .eq('session_id', sessionId)
      .eq('player_id', player.id)
      .single()

    // Fetch rate events for this session
    const { data: events } = await supabase
      .from('session_rate_events')
      .select('*')
      .eq('session_id', sessionId)
      .or(`player_id.eq.${player.id},player_id.is.null`)
      .order('occurred_at')

    const durationMin = Math.round((new Date(now) - new Date(sp.joined_at)) / 60000)
    const isCourtesy  = durationMin < 10
    const amount      = calculatePlayerBill(sp, events || [], player.membership_type)
    const stampEarned = durationMin >= 60 && player.membership_type !== 'monthly'

    // Update session_player record
    await supabase.from('session_players').update({
      left_at: now,
      duration_minutes: durationMin,
      individual_amount: amount,
      is_courtesy: isCourtesy,
      stamp_earned: stampEarned,
    }).eq('id', sp.id)

    // Get remaining active count
    const { data: remaining } = await supabase
      .from('session_players')
      .select('id')
      .eq('session_id', sessionId)
      .is('left_at', null)
    const remainingCount = (remaining?.length || 0) - 1  // subtract self

    // Record leave event
    await supabase.from('session_rate_events').insert({
      session_id: sessionId,
      player_id: player.id,
      event_type: 'player_leave',
      rate_type: sp.rate_type,
      player_count: remainingCount,
    })

    // If dropping below 5, switch remaining to walk-in rate
    if (remainingCount === 4) {
      await supabase.from('session_rate_events').insert({
        session_id: sessionId,
        player_id: null,
        event_type: 'rate_change',
        rate_type: 'walk-in',
        player_count: remainingCount,
      })
    }

    // Update session player count
    await supabase.from('sessions').update({ player_count: remainingCount }).eq('id', sessionId)

    // If last player left, move session to billing (staff must finalize)
    if (remainingCount === 0) {
      await supabase.from('sessions').update({ status: 'billing' }).eq('id', sessionId)
      await supabase.from('tables').update({ status: 'available' }).eq('id', sp.session.table_id)
    }

    // Award stamp if earned
    if (stampEarned) {
      await supabase
        .from('players')
        .update({ loyalty_stamps: player.loyalty_stamps + 1 })
        .eq('id', player.id)
    }

    // Log transaction
    if (!isCourtesy && amount > 0) {
      await supabase.from('transactions').insert({
        player_id: player.id,
        session_id: sessionId,
        type: 'session_charge',
        amount: -amount,
        description: `Gaming charge — ${durationMin} min`,
      })
    }

    await fetchActiveSession()
    return { amount, stampEarned, isCourtesy }
  }

  async function endSession(sessionId, { tip = 0, creditApplied = 0 } = {}) {
    const now = new Date().toISOString()

    // Finalize any players who haven't left
    const { data: activePlayers } = await supabase
      .from('session_players')
      .select('*, players(*)')
      .eq('session_id', sessionId)
      .is('left_at', null)

    for (const sp of activePlayers || []) {
      await leaveSession(sessionId, sp.players)
    }

    // Calculate totals
    const { data: allPlayers } = await supabase
      .from('session_players')
      .select('individual_amount, stamp_earned, is_courtesy')
      .eq('session_id', sessionId)

    const { data: allOrders } = await supabase
      .from('orders')
      .select('total')
      .eq('session_id', sessionId)
      .neq('status', 'cancelled')

    const gamingTotal = (allPlayers || []).reduce((s, p) => s + Number(p.individual_amount), 0)
    const foodTotal   = (allOrders  || []).reduce((s, o) => s + Number(o.total), 0)
    const totalAmount = Math.max(0, gamingTotal + foodTotal + tip - creditApplied)

    await supabase.from('sessions').update({
      status: 'completed',
      end_time: now,
      gaming_total: gamingTotal,
      food_total: foodTotal,
      tip_amount: tip,
      total_amount: totalAmount,
    }).eq('id', sessionId)

    // Free up table
    const { data: sess } = await supabase
      .from('sessions')
      .select('table_id')
      .eq('id', sessionId)
      .single()
    await supabase.from('tables').update({ status: 'available' }).eq('id', sess.table_id)

    return { gamingTotal, foodTotal, tip, totalAmount }
  }

  function resolveRateType(player, playerCount) {
    if (player.membership_type === 'monthly') return 'monthly'
    if (player.membership_type === 'founders') return 'founders'
    if (playerCount >= 5) return 'group'
    return 'walk-in'
  }

  async function addPlayerToSession(sessionId, player) {
    await supabase.from('session_players').insert({
      session_id: sessionId,
      player_id: player.id,
      rate_type: resolveRateType(player, 1),
    })

    // Update player visit count and last seen
    await supabase.from('players').update({
      visit_count: (player.visit_count || 0) + 1,
      last_seen_at: new Date().toISOString(),
    }).eq('id', player.id)
  }

  return {
    session,
    sessionPlayers,
    loading,
    startSession,
    joinSession,
    leaveSession,
    endSession,
    refresh: fetchActiveSession,
  }
}
