import { useState } from 'react'
import EndRequestQueue from '../components/staff/EndRequestQueue'
import OrderQueue from '../components/staff/OrderQueue'
import LiveTablesView from '../components/staff/LiveTablesView'
import { usePendingEndRequests } from '../hooks/useEndRequest'

const STAFF_TABS = [
  { id: 'requests', label: 'Requests', icon: '🏁' },
  { id: 'orders',   label: 'Orders',   icon: '🍟' },
  { id: 'tables',   label: 'Tables',   icon: '🪑' },
]

function StaffLoginGate({ onLogin }) {
  const [pin,   setPin]   = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(pin, (ok) => {
      if (!ok) { setError('Wrong PIN'); setPin('') }
    })
  }

  return (
    <div style={{ padding: '48px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: '2rem', marginBottom: 16 }}>🔒</p>
      <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24 }}>Staff Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 240, margin: '0 auto' }}>
        <input
          type="password"
          inputMode="numeric"
          placeholder="Staff PIN"
          value={pin}
          onChange={e => { setPin(e.target.value); setError('') }}
          autoFocus
          style={{ marginBottom: 12, textAlign: 'center', letterSpacing: '0.2em' }}
        />
        {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: 8 }}>{error}</p>}
        <button type="submit" className="btn-primary">Enter</button>
      </form>
    </div>
  )
}

export default function StaffPortal({ config, onBack }) {
  const [authed,     setAuthed]     = useState(false)
  const [staffName,  setStaffName]  = useState('Staff')
  const [tab,        setTab]        = useState('requests')
  const { requests } = usePendingEndRequests()

  function handleLogin(pin, callback) {
    const correctPin = config?.staff_pin || '1234'
    if (pin === correctPin) {
      setAuthed(true)
      callback(true)
    } else {
      callback(false)
    }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
        <div style={{ padding: '20px', paddingTop: `calc(20px + var(--safe-top))` }}>
          <button onClick={onBack} style={{ color: 'var(--text-dim)', cursor: 'pointer' }}>← Back</button>
        </div>
        <StaffLoginGate onLogin={handleLogin} />
      </div>
    )
  }

  const pendingCount = requests.length

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        padding: '16px 20px', paddingTop: `calc(16px + var(--safe-top))`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: '1rem' }}>Staff Portal</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pakida · {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
        </div>
        <button onClick={() => setAuthed(false)} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}>Lock</button>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        {STAFF_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '12px 4px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              borderBottom: `2px solid ${tab === t.id ? 'var(--primary)' : 'transparent'}`,
              cursor: 'pointer', position: 'relative',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: tab === t.id ? 'var(--primary)' : 'var(--text-muted)' }}>
              {t.label}
            </span>
            {t.id === 'requests' && pendingCount > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: '20%',
                background: 'var(--danger)', color: '#fff',
                borderRadius: '50%', width: 18, height: 18,
                fontSize: '0.7rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px', paddingBottom: `calc(16px + var(--safe-bottom))` }}>
        {tab === 'requests' && <EndRequestQueue staffName={staffName} />}
        {tab === 'orders'   && <OrderQueue />}
        {tab === 'tables'   && <LiveTablesView />}
      </div>
    </div>
  )
}
