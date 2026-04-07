import { supabase } from '../lib/supabase'

export function useLoyalty() {

  async function redeemFreeHour(playerId, sessionId) {
    const { data: player } = await supabase
      .from('players')
      .select('loyalty_stamps')
      .eq('id', playerId)
      .single()

    if (!player || player.loyalty_stamps < 6) throw new Error('Not enough stamps')

    // Deduct 6 stamps
    await supabase
      .from('players')
      .update({ loyalty_stamps: player.loyalty_stamps - 6 })
      .eq('id', playerId)

    // Record as a credit transaction (one hour at ₹100)
    await supabase.from('transactions').insert({
      player_id: playerId,
      session_id: sessionId,
      type: 'loyalty_redeem',
      amount: 100,
      description: 'Loyalty reward: 1 free hour',
    })

    return true
  }

  async function getReferralStats(playerId) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    const { data } = await supabase
      .from('transactions')
      .select('amount, created_at')
      .eq('player_id', playerId)
      .eq('type', 'referral_credit')
      .gte('created_at', thirtyDaysAgo)

    const available = (data || []).reduce((s, t) => s + Number(t.amount), 0)
    return { available, count: data?.length || 0 }
  }

  return { redeemFreeHour, getReferralStats }
}
