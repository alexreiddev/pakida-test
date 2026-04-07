import { useState } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { MENU_CATEGORIES } from '../../data/menu'

export default function MenuTab() {
  const { items, updateItem } = useMenu()
  const [cat, setCat] = useState('Combos')
  const [editing, setEditing] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const catItems = items.filter(i => i.category === cat)

  async function savePrice(id) {
    const price = parseFloat(editPrice)
    if (isNaN(price) || price <= 0) return
    await updateItem(id, { price })
    setEditing(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, scrollbarWidth: 'none' }}>
        {MENU_CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              flexShrink: 0, padding: '6px 12px',
              borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600,
              background: cat === c ? 'var(--primary)' : 'var(--surface-light)',
              color: cat === c ? '#fff' : 'var(--text-dim)',
              border: '1px solid var(--border)', cursor: 'pointer',
            }}
          >{c}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {catItems.map(item => (
          <div key={item.id} className="card" style={{ opacity: item.is_available ? 1 : 0.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>
                  {item.emoji} {item.name}
                </p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {editing === item.id
                    ? (
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <span>₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          style={{ width: 70, padding: '4px 8px' }}
                          autoFocus
                        />
                        <button onClick={() => savePrice(item.id)} style={{ color: 'var(--success)', fontWeight: 700, cursor: 'pointer' }}>✓</button>
                        <button onClick={() => setEditing(null)} style={{ color: 'var(--danger)', cursor: 'pointer' }}>✗</button>
                      </div>
                    )
                    : (
                      <button
                        onClick={() => { setEditing(item.id); setEditPrice(item.price) }}
                        style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                      >
                        ₹{item.price}
                      </button>
                    )
                  }
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
                {/* Available toggle */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {item.is_available ? 'Available' : 'Sold out'}
                  </span>
                  <div
                    onClick={() => updateItem(item.id, { is_available: !item.is_available })}
                    style={{
                      width: 36, height: 20, borderRadius: 10,
                      background: item.is_available ? 'var(--success)' : 'var(--surface-light)',
                      position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 2, left: item.is_available ? 18 : 2,
                      width: 16, height: 16, borderRadius: '50%', background: '#fff',
                      transition: 'left 0.2s',
                    }} />
                  </div>
                </label>

                {/* Daily special toggle */}
                <button
                  onClick={() => updateItem(item.id, { is_daily_special: !item.is_daily_special })}
                  style={{
                    fontSize: '0.7rem', padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: item.is_daily_special ? 'rgba(212,168,67,0.2)' : 'var(--surface-light)',
                    color: item.is_daily_special ? 'var(--accent)' : 'var(--text-muted)',
                    border: '1px solid var(--border)', cursor: 'pointer',
                  }}
                >
                  {item.is_daily_special ? '⭐ Special' : 'Set Special'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
