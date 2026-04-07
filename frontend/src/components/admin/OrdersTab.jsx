import { useState } from 'react'
import { useAllOrders } from '../../hooks/useOrders'

const STATUS_OPTIONS = ['pending', 'preparing', 'ready', 'delivered', 'cancelled']
const STATUS_COLOR = {
  pending:   'var(--text-dim)',
  preparing: 'var(--warning)',
  ready:     'var(--success)',
  delivered: 'var(--text-muted)',
  cancelled: 'var(--danger)',
}

export default function OrdersTab() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const { orders, loading, refresh } = useAllOrders(date)

  async function setStatus(order, status) {
    const { supabase } = await import('../../lib/supabase')
    await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', order.id)
    refresh()
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      {loading
        ? <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        : orders.length === 0
        ? <p style={{ color: 'var(--text-muted)' }}>No orders for this date.</p>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {orders.map(order => (
              <div key={order.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{order.tables?.name} · #{order.id.slice(-4).toUpperCase()}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(order.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · {order.players?.name}
                    </p>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: STATUS_COLOR[order.status] }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  {(order.order_items || []).map(oi => (
                    <p key={oi.id} style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 2 }}>
                      {oi.menu_items?.name} × {oi.quantity} — ₹{oi.subtotal}
                    </p>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {STATUS_OPTIONS.filter(s => s !== order.status).map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(order, s)}
                      style={{
                        padding: '4px 10px', borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem', fontWeight: 600,
                        background: 'var(--surface-light)', color: STATUS_COLOR[s] || 'var(--text-dim)',
                        border: '1px solid var(--border)', cursor: 'pointer',
                      }}
                    >→ {s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
