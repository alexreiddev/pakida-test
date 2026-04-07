import { useState } from 'react'
import { useAllBookings } from '../../hooks/useBooking'

const STATUS_COLOR = {
  pending:   'var(--text-dim)',
  confirmed: 'var(--success)',
  cancelled: 'var(--danger)',
  'no-show': 'var(--warning)',
  completed: 'var(--text-muted)',
}

export default function BookingsTab() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const { bookings, loading, updateStatus } = useAllBookings(date)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      {loading
        ? <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        : bookings.length === 0
        ? <p style={{ color: 'var(--text-muted)' }}>No bookings for this date.</p>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {bookings.map(b => (
              <div key={b.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{b.players?.name} · {String(b.time_slot).slice(0,5)}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {b.tables?.name} · {b.party_size} people
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      +91 {b.players?.phone} · Deposit ₹{b.deposit_amount}{b.deposit_paid ? ' ✓' : ''}
                    </p>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: STATUS_COLOR[b.status] }}>
                    {b.status.toUpperCase()}
                  </span>
                </div>

                {b.is_corporate && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: 8 }}>
                    🏢 Corporate — {b.company_name}
                  </p>
                )}

                {(b.status === 'pending' || b.status === 'confirmed') && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {b.status === 'pending' && (
                      <button
                        className="btn-primary"
                        style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                        onClick={() => updateStatus(b.id, 'confirmed')}
                      >Confirm</button>
                    )}
                    <button
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px', fontSize: '0.8rem', color: 'var(--danger)' }}
                      onClick={() => updateStatus(b.id, 'no-show')}
                    >No-show</button>
                    <button
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                      onClick={() => updateStatus(b.id, 'completed')}
                    >Done</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
