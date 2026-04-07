import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Used by customers: submit and watch their own end request
export function useEndRequest(sessionId, playerId) {
  const [request, setRequest] = useState(null)

  useEffect(() => {
    if (!sessionId) return
    fetchPending()

    const channel = supabase
      .channel(`end-req-${sessionId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'session_end_requests',
          filter: `session_id=eq.${sessionId}` },
        (payload) => {
          setRequest(payload.new)
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [sessionId])

  async function fetchPending() {
    const { data } = await supabase
      .from('session_end_requests')
      .select('*')
      .eq('session_id', sessionId)
      .eq('status', 'pending')
      .single()
    setRequest(data || null)
  }

  async function submitRequest() {
    // Only one pending request allowed at a time
    if (request?.status === 'pending') return request

    const { data } = await supabase
      .from('session_end_requests')
      .insert({ session_id: sessionId, requested_by: playerId })
      .select()
      .single()
    setRequest(data)
    return data
  }

  return { request, submitRequest }
}

// Used by staff portal: see all pending requests across sessions
export function usePendingEndRequests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchRequests()

    const channel = supabase
      .channel('staff-end-requests')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'session_end_requests' },
        fetchRequests
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchRequests() {
    const { data } = await supabase
      .from('session_end_requests')
      .select(`
        *,
        sessions(table_id, player_count, tables(name)),
        players(name, phone)
      `)
      .eq('status', 'pending')
      .order('created_at')
    setRequests(data || [])
  }

  async function resolveRequest(requestId, approved, staffName) {
    const now = new Date().toISOString()
    const { data: req } = await supabase
      .from('session_end_requests')
      .update({
        status: approved ? 'approved' : 'rejected',
        resolved_at: now,
        resolved_by: staffName || 'Staff',
      })
      .eq('id', requestId)
      .select('session_id')
      .single()

    // If approved, move session to billing status
    if (approved && req?.session_id) {
      await supabase
        .from('sessions')
        .update({ status: 'billing' })
        .eq('id', req.session_id)
    }

    await fetchRequests()
  }

  return { requests, resolveRequest }
}
