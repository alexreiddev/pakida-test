import { useState } from 'react'
import { useAllSessions } from '../../hooks/useAdmin'

export default function SessionsTab() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const { sessions, loading } = useAllSessions(date)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      {loading
        ? <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        : sessions.length === 0
        ? <p style={{ color: 'var(--text-muted)' }}>No sessions for this date.</p>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sessions.map(sess => (
              <div key={sess.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{sess.tables?.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {new Date(sess.start_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      {sess.end_time && ` → ${new Date(sess.end_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{Math.round(sess.total_amount)}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sess.status}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(sess.session_players || []).map(sp => (
                    <span key={sp.id} style={{ padding: '3px 8px', background: 'var(--surface-light)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {sp.players?.name} {sp.is_courtesy ? '(free)' : `₹${Math.round(sp.individual_amount)}`}
                    </span>
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
