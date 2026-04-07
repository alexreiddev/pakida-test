import { useMenu } from '../../hooks/useMenu'

export default function InventoryTab() {
  const { items, updateStock } = useMenu()
  const tracked = items.filter(i => i.stock !== null)

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 16 }}>
        Only items with limited stock are shown here.
      </p>
      {tracked.length === 0
        ? <p style={{ color: 'var(--text-muted)' }}>No items with limited stock.</p>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tracked.map(item => (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.emoji} {item.name}</p>
                    <p style={{ fontSize: '0.8rem', color: item.stock === 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
                      {item.stock === 0 ? 'Sold out' : `${item.stock} remaining`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => updateStock(item.id, -1)}
                      style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--danger)', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-light)', borderRadius: 'var(--radius-sm)' }}
                    >−</button>
                    <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center', fontSize: '1rem' }}>{item.stock}</span>
                    <button
                      onClick={() => updateStock(item.id, +1)}
                      style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--success)', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-light)', borderRadius: 'var(--radius-sm)' }}
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
