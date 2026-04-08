import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAdminKPIs(date) {
  const [kpis, setKpis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchKPIs() }, [date])

  async function fetchKPIs() {
    setLoading(true)
    const targetDate = date || new Date().toISOString().slice(0, 10)
    const start = `${targetDate}T00:00:00`
    const end   = `${targetDate}T23:59:59`

    const [sessRes, orderRes, playerRes, bookRes] = await Promise.all([
      supabase
        .from('sessions')
        .select('total_amount, gaming_total, food_total, player_count, status')
        .gte('created_at', start)
        .lte('created_at', end),
      supabase
        .from('orders')
        .select('total, status')
        .gte('created_at', start)
        .lte('created_at', end),
      supabase
        .from('players')
        .select('id')
        .gte('created_at', start)
        .lte('created_at', end),
      supabase
        .from('bookings')
        .select('status')
        .eq('booking_date', targetDate),
    ])

    const sessions  = sessRes.data  || []
    const orders    = orderRes.data || []
    const players   = playerRes.data || []
    const bookings  = bookRes.data  || []

    const completed = sessions.filter(s => s.status === 'completed')
    const revenue   = completed.reduce((s, sess) => s + Number(sess.total_amount), 0)
    const gaming    = completed.reduce((s, sess) => s + Number(sess.gaming_total),  0)
    const food      = completed.reduce((s, sess) => s + Number(sess.food_total),    0)

    setKpis({
      revenue,
      sessions:    sessions.length,
      gaming,
      food,
      newPlayers:  players.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    })
    setLoading(false)
  }

  return { kpis, loading, refresh: fetchKPIs }
}

export function useAllPlayers(search) {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => fetchPlayers(), 300)
    return () => clearTimeout(timer)
  }, [search])

  async function fetchPlayers() {
    setLoading(true)
    let query = supabase
      .from('players')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data } = await query
    setPlayers(data || [])
    setLoading(false)
  }

  async function updatePlayer(id, updates) {
    const { data } = await supabase
      .from('players')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    setPlayers(prev => prev.map(p => p.id === id ? data : p))
  }

  return { players, loading, updatePlayer, refresh: fetchPlayers }
}

export function useAllSessions(date) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => { fetchAll() }, [date])

  async function fetchAll() {
    setLoading(true)
    let query = supabase
      .from('sessions')
      .select(`
        *,
        tables(name),
        session_players(*, players(name, phone, membership_type))
      `)
      .order('created_at', { ascending: false })
      .limit(100)

    if (date) {
      const start = `${date}T00:00:00`
      const end   = `${date}T23:59:59`
      query = query.gte('created_at', start).lte('created_at', end)
    }

    const { data } = await query
    setSessions(data || [])
    setLoading(false)
  }

  return { sessions, loading, refresh: fetchAll }
}

export function useAppConfig() {
  const [config, setConfig] = useState(null)

  useEffect(() => { fetchConfig() }, [])

  async function fetchConfig() {
    const { data } = await supabase
      .from('app_config')
      .select('*')
      .single()
    setConfig(data)
  }

  async function updateConfig(updates) {
    const { data } = await supabase
      .from('app_config')
      .update(updates)
      .eq('id', 1)
      .select()
      .single()
    setConfig(data)
  }

  return { config, updateConfig, refresh: fetchConfig }
}
