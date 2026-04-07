export default function ProfilePage({ player, onLogout }) {
  const membershipBadge = {
    'walk-in':  { label: 'Walk-in',       color: 'var(--text-dim)' },
    'founders': { label: 'Founders Club', color: 'var(--accent)'   },
    'monthly':  { label: 'Monthly Pass',  color: 'var(--primary)'  },
  }[player?.membership_type] || { label: 'Walk-in', color: 'var(--text-dim)' }

  return (
    <div style={{ padding: '24px 20px 80px' }}>
      {/* Player card */}
      <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--surface-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', margin: '0 auto 12px',
        }}>
          {player?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{player?.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 8 }}>+91 {player?.phone}</p>
        <span style={{ fontWeight: 700, color: membershipBadge.color, fontSize: '0.85rem' }}>
          {membershipBadge.label}
        </span>
        {player?.is_founders_club && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>
            Slot #{player.founders_slot} · 15% off every visit
          </p>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Visits',    value: player?.visit_count || 0 },
          { label: 'Stamps',    value: player?.loyalty_stamps || 0 },
          { label: 'Total Spend', value: `₹${Math.round(player?.total_spend || 0)}` },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--primary)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* WiFi info */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>📶 WiFi</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
          Network: <strong style={{ color: 'var(--text)' }}>Pakida_Guest</strong>
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: 4 }}>
          Password: <strong style={{ color: 'var(--text)' }}>playandchill</strong>
        </p>
      </div>

      <button
        className="btn-secondary"
        onClick={onLogout}
        style={{ color: 'var(--danger)', borderColor: 'var(--danger)33' }}
      >
        Log Out
      </button>
    </div>
  )
}
