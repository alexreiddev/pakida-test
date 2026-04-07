import { useState } from 'react'
import { useAllPlayers } from '../../hooks/useAdmin'

export default function PlayersTab() {
  const [search, setSearch] = useState('')
  const { players, loading, updatePlayer } = useAllPlayers(search)
  const [editing, setEditing] = useState(null)
  const [editStamps, setEditStamps] = useState('')

  return (
    <div>
      <input
        type="search"
        placeholder="Search by name or phone…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {loading
        ? <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {players.map(p => (
              <div key={p.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{p.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>+91 {p.phone}</p>
                  </div>
                  <span style={{
                    fontWeight: 700, fontSize: '0.75rem',
                    color: p.membership_type === 'founders' ? 'var(--accent)' : p.membership_type === 'monthly' ? 'var(--primary)' : 'var(--text-muted)',
                  }}>
                    {p.membership_type}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                  <span>👥 {p.visit_count} visits</span>
                  <span>💰 ₹{Math.round(p.total_spend)} spent</span>
                  <span>
                    {editing === p.id
                      ? (
                        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          Stamps:
                          <input
                            type="number"
                            value={editStamps}
                            onChange={e => setEditStamps(e.target.value)}
                            style={{ width: 50, padding: '2px 6px' }}
                          />
                          <button onClick={async () => {
                            await updatePlayer(p.id, { loyalty_stamps: parseInt(editStamps) })
                            setEditing(null)
                          }} style={{ color: 'var(--success)', fontWeight: 700, cursor: 'pointer' }}>✓</button>
                        </span>
                      )
                      : (
                        <button onClick={() => { setEditing(p.id); setEditStamps(p.loyalty_stamps) }} style={{ cursor: 'pointer', color: 'var(--accent)' }}>
                          ⭐ {p.loyalty_stamps} stamps
                        </button>
                      )
                    }
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  {p.membership_type !== 'founders' && (
                    <button
                      className="btn-secondary"
                      style={{ flex: 1, padding: '6px', fontSize: '0.75rem' }}
                      onClick={() => updatePlayer(p.id, { membership_type: 'founders', is_founders_club: true })}
                    >
                      → Founders
                    </button>
                  )}
                  {p.membership_type !== 'monthly' && (
                    <button
                      className="btn-secondary"
                      style={{ flex: 1, padding: '6px', fontSize: '0.75rem' }}
                      onClick={() => updatePlayer(p.id, { membership_type: 'monthly' })}
                    >
                      → Monthly
                    </button>
                  )}
                  {p.membership_type !== 'walk-in' && (
                    <button
                      className="btn-secondary"
                      style={{ flex: 1, padding: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}
                      onClick={() => updatePlayer(p.id, { membership_type: 'walk-in', is_founders_club: false })}
                    >
                      → Walk-in
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
