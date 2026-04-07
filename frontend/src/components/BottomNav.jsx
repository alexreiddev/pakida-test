const TABS = [
  { id: 'home',    label: 'Home',   icon: '🏠' },
  { id: 'menu',    label: 'Menu',   icon: '🍟' },
  { id: 'orders',  label: 'Orders', icon: '📋' },
  { id: 'stamps',  label: 'Stamps', icon: '⭐' },
  { id: 'profile', label: 'You',    icon: '👤' },
]

export default function BottomNav({ active, onChange, pendingOrders }) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 480,
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      paddingBottom: 'var(--safe-bottom)',
      zIndex: 40,
    }}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            padding: '10px 4px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{tab.icon}</span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: active === tab.id ? 700 : 400,
            color: active === tab.id ? 'var(--primary)' : 'var(--text-muted)',
          }}>
            {tab.label}
          </span>
          {tab.id === 'orders' && pendingOrders > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: '20%',
              background: 'var(--danger)', color: '#fff',
              borderRadius: '50%', width: 16, height: 16,
              fontSize: '0.65rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {pendingOrders}
            </span>
          )}
          {active === tab.id && (
            <span style={{
              position: 'absolute', top: 0, left: '25%', right: '25%',
              height: 2, background: 'var(--primary)', borderRadius: '0 0 2px 2px',
            }} />
          )}
        </button>
      ))}
    </nav>
  )
}
