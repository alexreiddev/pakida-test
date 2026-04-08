import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const STORAGE_KEY = 'pakida_player_id'

export function usePlayer() {
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY)
    if (savedId) {
      fetchPlayer(savedId)
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchPlayer(id) {
    setLoading(true)
    const { data } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single()
    if (data) {
      setPlayer(data)
      localStorage.setItem(STORAGE_KEY, data.id)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setLoading(false)
  }

  async function lookupByPhone(phone) {
    const { data } = await supabase
      .from('players')
      .select('*')
      .eq('phone', phone)
      .single()
    return data
  }

  async function register({ phone, name, referredBy, birthdayMonth }) {
    const referralCode = 'PK' + phone.slice(-6)

    // Check if referred-by code is valid and within 30 days
    let referrerId = null
    if (referredBy) {
      const { data: referrer } = await supabase
        .from('players')
        .select('id')
        .eq('referral_code', referredBy.toUpperCase())
        .single()
      if (referrer) referrerId = referrer.id
    }

    const { data, error } = await supabase
      .from('players')
      .insert({
        phone,
        name,
        referral_code: referralCode,
        birthday_month: birthdayMonth || null,
      })
      .select()
      .single()

    if (error) throw error

    // Grant referral credit to both parties
    if (referrerId) {
      await supabase.from('transactions').insert([
        { player_id: data.id,    type: 'referral_credit', amount: 30, description: 'Referral welcome credit' },
        { player_id: referrerId, type: 'referral_credit', amount: 30, description: `Referral credit — ${name} joined` },
      ])
      // Update credit balances
      await supabase.rpc('increment_credit', { player_id: data.id,    amount: 30 })
      await supabase.rpc('increment_credit', { player_id: referrerId, amount: 30 })
    }

    setPlayer(data)
    localStorage.setItem(STORAGE_KEY, data.id)
    return data
  }

  async function refreshPlayer() {
    if (player?.id) await fetchPlayer(player.id)
  }

  function logout() {
    setPlayer(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Get available referral credit (within 30 days)
  async function getAvailableCredit(playerId) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { data } = await supabase
      .from('transactions')
      .select('amount')
      .eq('player_id', playerId)
      .eq('type', 'referral_credit')
      .gte('created_at', thirtyDaysAgo)
    const earned = (data || []).reduce((s, t) => s + Number(t.amount), 0)

    // Subtract already redeemed
    const { data: redeemed } = await supabase
      .from('transactions')
      .select('amount')
      .eq('player_id', playerId)
      .eq('type', 'loyalty_redeem')
    const used = (redeemed || []).reduce((s, t) => s + Math.abs(Number(t.amount)), 0)

    return Math.max(0, earned - used)
  }

  return { player, loading, lookupByPhone, register, refreshPlayer, logout, getAvailableCredit }
}
