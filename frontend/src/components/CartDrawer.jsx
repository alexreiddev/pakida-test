import { useState } from 'react'
import { useOrders } from '../hooks/useOrders'

export default function CartDrawer({ cart, session, player, onAdd, onRemove, onClose, onOrdered }) {
  const { placeOrder } = useOrders(session?.id)
  const [notes,   setNotes]   = useState('')
  const [loading, setLoading] = useState(false)

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  async function handleOrder() {
    if (!session?.id) return
    setLoading(true)
    try {
      await placeOrder({
        sessionId: session.id,
        tableId:   session.table_id,
        playerId:  player.id,
        cartItems: cart,
        notes,
      })
      onOrdered()
    } catch (e) {
      alert(e.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sheet-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="sheet-handle" />
        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>Your Order</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500 }}>{item.emoji} {item.name}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginLeft: 6 }}>× {item.quantity}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => onRemove(item.id)} style={{ color: 'var(--text-dim)', fontWeight: 700, cursor: 'pointer' }}>−</button>
                  <button onClick={() => onAdd(item)} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <textarea
          placeholder="Any notes? (spice level, no onions…)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
          style={{ marginBottom: 16, resize: 'none' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', marginBottom: 20 }}>
          <span>Total</span>
          <span style={{ color: 'var(--primary)' }}>₹{total}</span>
        </div>

        <button
          className="btn-primary"
          onClick={handleOrder}
          disabled={loading || cart.length === 0}
        >
          {loading ? 'Placing order…' : `Place Order · ₹${total}`}
        </button>
      </div>
    </div>
  )
}
