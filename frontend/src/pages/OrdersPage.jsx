import { useOrders } from '../hooks/useOrders'

const STATUS_CONFIG = {
  pending:    { label: 'Received',   color: 'var(--text-dim)',  progress: 25 },
  preparing:  { label: 'Preparing',  color: 'var(--warning)',   progress: 60 },
  ready:      { label: 'Ready! 🔔',  color: 'var(--success)',   progress: 90 },
  delivered:  { label: 'Delivered',  color: 'var(--text-muted)', progress: 100 },
  cancelled:  { label: 'Cancelled',  color: 'var(--danger)',    progress: 0 },
}

export default function OrdersPage({ session }) {
  const { orders } = useOrders(session?.id)

  if (!orders.length) {
    return (
      <div style={{ padding: '48px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '2rem', marginBottom: 12 }}>🍟</p>
        <p style={{ color: 'var(--text-dim)' }}>No orders yet.</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6 }}>Head to the Menu tab to order food.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 20px 80px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {orders.map(order => {
        const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
        return (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                Order #{order.id.slice(-4).toUpperCase()}
              </span>
              <span style={{
                fontWeight: 700, fontSize: '0.8rem',
                color: cfg.color,
              }}>
                {cfg.label}
              </span>
            </div>

            {/* Progress bar */}
            {order.status !== 'cancelled' && (
              <div style={{ height: 4, background: 'var(--surface-light)', borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${cfg.progress}%`,
                  background: cfg.color, borderRadius: 2,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            )}

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(order.order_items || []).map(oi => (
                <div key={oi.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-dim)' }}>
                    {oi.menu_items?.emoji} {oi.menu_items?.name} × {oi.quantity}
                  </span>
                  <span style={{ fontWeight: 500 }}>₹{oi.subtotal}</span>
                </div>
              ))}
            </div>

            <div className="divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>₹{order.total}</span>
            </div>

            {order.notes && (
              <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                "{order.notes}"
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
