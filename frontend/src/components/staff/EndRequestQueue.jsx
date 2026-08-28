export default function EndRequestQueue({ staffName, requests, resolveRequest }) {

  if (!requests.length) {
    return (
      <div style={{ padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>✅</p>
        <p style={{ color: 'var(--text-dim)' }}>No pending end-session requests</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {requests.map(req => (
        <div key={req.id} className="card" style={{ borderColor: 'var(--warning)44' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1rem' }}>
                {req.sessions?.tables?.name || `Table ${req.sessions?.table_id}`}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 2 }}>
                {req.sessions?.player_count} player{req.sessions?.player_count !== 1 ? 's' : ''} · Requested by <strong>{req.players?.name}</strong>
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {new Date(req.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <span style={{ background: 'var(--warning)22', color: 'var(--warning)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
              PENDING
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-primary"
              style={{ flex: 1, padding: '10px', fontSize: '0.875rem' }}
              onClick={() => resolveRequest(req.id, true, staffName)}
            >
              ✅ Approve
            </button>
            <button
              className="btn-secondary"
              style={{ flex: 1, padding: '10px', fontSize: '0.875rem', color: 'var(--danger)' }}
              onClick={() => resolveRequest(req.id, false, staffName)}
            >
              ✗ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
