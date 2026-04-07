import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useOrders(sessionId) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!sessionId) return
    fetchOrders()

    const channel = supabase
      .channel(`orders-${sessionId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders', filter: `session_id=eq.${sessionId}` },
        () => fetchOrders()
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          setOrders(prev => prev.map(o => o.id === payload.new.id ? { ...o, ...payload.new } : o))
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [sessionId])

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*, menu_items(name, emoji, price))')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
    setOrders(data || [])
  }

  async function placeOrder({ sessionId, tableId, playerId, cartItems, notes }) {
    const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

    const { data: order } = await supabase
      .from('orders')
      .insert({ session_id: sessionId, table_id: tableId, player_id: playerId, total, notes })
      .select()
      .single()

    const lineItems = cartItems.map(i => ({
      order_id: order.id,
      item_id: i.id,
      quantity: i.quantity,
      unit_price: i.price,
      subtotal: i.price * i.quantity,
    }))
    await supabase.from('order_items').insert(lineItems)

    // Deduct stock for limited items
    for (const item of cartItems) {
      if (item.stock !== null && item.stock > 0) {
        await supabase
          .from('menu_items')
          .update({ stock: Math.max(0, item.stock - item.quantity) })
          .eq('id', item.id)
      }
    }

    await fetchOrders()
    return order
  }

  async function updateOrderStatus(orderId, status) {
    await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
  }

  return { orders, placeOrder, updateOrderStatus, refresh: fetchOrders }
}

// Admin: all orders across all sessions
export function useAllOrders(date) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchAll() }, [date])

  async function fetchAll() {
    setLoading(true)
    let query = supabase
      .from('orders')
      .select('*, order_items(*, menu_items(name)), tables(name), players(name, phone)')
      .order('created_at', { ascending: false })
      .limit(200)

    if (date) {
      const start = new Date(date); start.setHours(0, 0, 0, 0)
      const end   = new Date(date); end.setHours(23, 59, 59, 999)
      query = query.gte('created_at', start.toISOString()).lte('created_at', end.toISOString())
    }

    const { data } = await query
    setOrders(data || [])
    setLoading(false)
  }

  return { orders, loading, refresh: fetchAll }
}
