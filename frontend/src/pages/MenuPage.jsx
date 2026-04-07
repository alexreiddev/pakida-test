import { useState } from 'react'
import { useMenu } from '../hooks/useMenu'
import MenuItemCard from '../components/MenuItemCard'
import CartDrawer from '../components/CartDrawer'
import { MENU_CATEGORIES } from '../data/menu'

export default function MenuPage({ session, player, onOrderPlaced }) {
  const { items, loading, getUpsell } = useMenu()
  const [activeCategory, setActiveCategory] = useState('Combos')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  function removeFromCart(itemId) {
    setCart(prev => {
      const existing = prev.find(c => c.id === itemId)
      if (!existing) return prev
      if (existing.quantity === 1) return prev.filter(c => c.id !== itemId)
      return prev.map(c => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c)
    })
  }

  const cartCount  = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal  = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const catItems   = items.filter(i => i.category === activeCategory)
  const isNewItem  = (item) => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return new Date(item.added_at) > sevenDaysAgo
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Category tabs */}
      <div style={{
        display: 'flex', overflowX: 'auto', gap: 8, padding: '16px 20px',
        scrollbarWidth: 'none', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10,
        borderBottom: '1px solid var(--border)',
      }}>
        {MENU_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0,
              padding: '7px 14px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.85rem',
              background: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
              color: activeCategory === cat ? '#fff' : 'var(--text-dim)',
              border: '1px solid ' + (activeCategory === cat ? 'var(--primary)' : 'var(--border)'),
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {loading
          ? <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 24 }}>Loading menu…</p>
          : catItems.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={cart.find(c => c.id === item.id)?.quantity || 0}
                isNew={isNewItem(item)}
                upsell={getUpsell(item.name)}
                onAdd={() => addToCart(item)}
                onRemove={() => removeFromCart(item.id)}
                onUpsell={upsellItem => addToCart(upsellItem)}
              />
            ))
        }
      </div>

      {/* Cart button */}
      {cartCount > 0 && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: 440, zIndex: 30 }}>
          <button
            className="btn-primary"
            onClick={() => setShowCart(true)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' }}
          >
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>{cartCount}</span>
            <span>View Cart</span>
            <span style={{ fontWeight: 700 }}>₹{cartTotal}</span>
          </button>
        </div>
      )}

      {showCart && (
        <CartDrawer
          cart={cart}
          session={session}
          player={player}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClose={() => setShowCart(false)}
          onOrdered={() => { setCart([]); setShowCart(false); onOrderPlaced?.() }}
        />
      )}
    </div>
  )
}
