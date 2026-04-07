import { useActiveSessions } from '../../hooks/useTables'

function formatElapsed(startTime) {
  const ms = Date.now() - new Date(startTime)
  const m  = Math.floor(ms / 60000)
  const h  = Math.floor(m / 60)
  if (h > 0) return `${h}h ${m % 60}m`
  return `${m}m`
}

export default function LiveTablesView() {
  const { sessions } = useActiveSessions()

  return (
    <div>
      {sessions.length === 0 && (
        <div style={{ padding: '32px 0', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>🪑</p>
          <p style={{ color: 'var(--text-dim)' }}>All tables are free</p>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sessions.map(sess => (
          <div key={sess.id} className="card" style={{ borderColor: sess.status === 'billing' ? 'var(--warning)44' : 'var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <p style={{ fontWeight: 700 }}>{sess.tables?.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {sess.session_players?.filter(sp => !sp.left_at).length} player{sess.session_players?.filter(sp => !sp.left_at).length !== 1 ? 's' : ''}
                  {' · '}{formatElapsed(sess.start_time)}
                </p>
              </div>
              <span style={{
                fontWeight: 700, fontSize: '0.8rem',
                color: sess.status === 'billing' ? 'var(--warning)' : 'var(--success)',
              }}>
                {sess.status === 'billing' ? '⚠ BILLING' : '● ACTIVE'}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(sess.session_players || [])
                .filter(sp => !sp.left_at)
                .map(sp => (
                  <span key={sp.id} style={{
                    padding: '4px 10px', background: 'var(--surface-light)',
                    borderRadius: 'var(--radius-full)', fontSize: '0.78rem', color: 'var(--text-dim)',
                  }}>
                    {sp.players?.name}
                    {sp.players?.membership_type === 'founders' && ' ⭐'}
                    {sp.players?.membership_type === 'monthly' && ' ∞'}
                  </span>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
