import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const NEXT_STATUS = {
  pending:   'preparing',
  preparing: 'ready',
  ready:     'delivered',
}

const STATUS_LABEL = {
  pending:   { label: 'Received',   color: 'var(--text-dim)' },
  preparing: { label: 'Preparing',  color: 'var(--warning)'  },
  ready:     { label: 'Ready',      color: 'var(--success)'  },
  delivered: { label: 'Delivered',  color: 'var(--text-muted)' },
}

export default function OrderQueue() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()

    const channel = supabase
      .channel('staff-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*, menu_items(name, emoji)), tables(name)')
      .in('status', ['pending', 'preparing', 'ready'])
      .order('created_at')
    setOrders(data || [])
  }

  async function advance(order) {
    const next = NEXT_STATUS[order.status]
    if (!next) return
    await supabase
      .from('orders')
      .update({ status: next, updated_at: new Date().toISOString() })
      .eq('id', order.id)
  }

  async function cancel(orderId) {
    await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId)
  }

  if (!orders.length) {
    return (
      <div style={{ padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>🍟</p>
        <p style={{ color: 'var(--text-dim)' }}>No active orders</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {orders.map(order => {
        const cfg  = STATUS_LABEL[order.status]
        const next = NEXT_STATUS[order.status]
        return (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <p style={{ fontWeight: 700 }}>{order.tables?.name} · #{order.id.slice(-4).toUpperCase()}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {new Date(order.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span style={{ color: cfg.color, fontWeight: 700, fontSize: '0.85rem' }}>{cfg.label}</span>
            </div>

            <div style={{ marginBottom: 12 }}>
              {(order.order_items || []).map(oi => (
                <p key={oi.id} style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 4 }}>
                  {oi.menu_items?.emoji} {oi.menu_items?.name} × {oi.quantity}
                </p>
              ))}
            </div>

            {order.notes && (
              <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: 10, fontStyle: 'italic' }}>
                Note: {order.notes}
              </p>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              {next && (
                <button
                  className="btn-primary"
                  style={{ flex: 2, padding: '10px', fontSize: '0.85rem' }}
                  onClick={() => advance(order)}
                >
                  Mark as {next === 'preparing' ? 'Preparing' : next === 'ready' ? 'Ready' : 'Delivered'}
                </button>
              )}
              <button
                className="btn-secondary"
                style={{ flex: 1, padding: '10px', fontSize: '0.85rem', color: 'var(--danger)' }}
                onClick={() => cancel(order.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
