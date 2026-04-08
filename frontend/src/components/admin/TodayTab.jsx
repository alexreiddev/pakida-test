import { useAdminKPIs } from '../../hooks/useAdmin'
import { useActiveSessions } from '../../hooks/useTables'

export default function TodayTab() {
  const { kpis, loading } = useAdminKPIs()
  const { sessions }      = useActiveSessions()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI Grid */}
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>TODAY</p>
        {loading
          ? <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
          : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { label: 'Revenue',        value: `₹${Math.round(kpis?.revenue || 0)}`,    color: 'var(--primary)' },
                { label: 'Sessions',       value: kpis?.sessions || 0,                      color: 'var(--text)' },
                { label: 'Gaming',         value: `₹${Math.round(kpis?.gaming || 0)}`,     color: 'var(--text)' },
                { label: 'Food & Drinks',  value: `₹${Math.round(kpis?.food || 0)}`,       color: 'var(--text)' },
                { label: 'New Players',    value: kpis?.newPlayers || 0,                    color: 'var(--accent)' },
                { label: 'Bookings',       value: kpis?.confirmedBookings || 0,             color: 'var(--text)' },
              ].map(k => (
                <div key={k.label} className="card" style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: '1.4rem', color: k.color }}>{k.value}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{k.label}</p>
                </div>
              ))}
            </div>
          )
        }
      </div>

      {/* Active tables */}
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>
          ACTIVE ({sessions.length})
        </p>
        {sessions.length === 0
          ? <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No active sessions</p>
          : sessions.map(sess => (
            <div key={sess.id} className="card" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{sess.tables?.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {sess.session_players?.filter(sp => !sp.left_at).length} player{sess.session_players?.filter(sp => !sp.left_at).length !== 1 ? 's' : ''}
                    {' · '}
                    {Math.floor((Date.now() - new Date(sess.start_time)) / 60000)} min
                  </p>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.8rem', color: sess.status === 'billing' ? 'var(--warning)' : 'var(--success)' }}>
                  {sess.status === 'billing' ? 'BILLING' : 'ACTIVE'}
                </span>
              </div>
            </div>
          ))
        }
      </div>

      {/* Pending orders */}
      {kpis?.pendingOrders > 0 && (
        <div className="card" style={{ borderColor: 'var(--warning)44', textAlign: 'center' }}>
          <p style={{ color: 'var(--warning)', fontWeight: 700 }}>
            ⚠ {kpis.pendingOrders} pending order{kpis.pendingOrders !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}
