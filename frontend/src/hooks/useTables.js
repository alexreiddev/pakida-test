import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useTables() {
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTables()

    const channel = supabase
      .channel('tables-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tables' }, (payload) => {
        setTables(prev => prev.map(t => t.id === payload.new.id ? { ...t, ...payload.new } : t))
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchTables() {
    setLoading(true)
    const { data } = await supabase
      .from('tables')
      .select('*')
      .order('id')
    setTables(data || [])
    setLoading(false)
  }

  return { tables, loading, refresh: fetchTables }
}

export function useActiveSessions() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetchSessions()

    const channel = supabase
      .channel('active-sessions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, fetchSessions)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'session_players' }, fetchSessions)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchSessions() {
    const { data } = await supabase
      .from('sessions')
      .select(`
        *,
        tables(id, name, capacity),
        session_players(*, players(id, name, phone, membership_type, loyalty_stamps))
      `)
      .in('status', ['active', 'billing'])
      .order('created_at')
    setSessions(data || [])
  }

  return { sessions, refresh: fetchSessions }
}
