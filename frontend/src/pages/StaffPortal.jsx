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

const DIGITS = ['1','2','3','4','5','6','7','8','9','','0','⌫']

function StaffLoginGate({ onLogin, configLoading }) {
  const [name,  setName]  = useState('')
  const [pin,   setPin]   = useState('')
  const [error, setError] = useState('')
  const [step,  setStep]  = useState('name') // 'name' | 'pin'

  function handleNameSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name'); return }
    setError('')
    setStep('pin')
  }

  function handleDigit(d) {
    if (d === '⌫') { setPin(p => p.slice(0, -1)); setError(''); return }
    if (d === '')   return
    if (pin.length >= 8) return
    const next = pin + d
    setPin(next)
    setError('')
    // Auto-submit once PIN reaches expected length (4–8 digits)
    if (next.length >= 4) {
      // Small delay so last dot animates before validation
      setTimeout(() => {
        onLogin(name.trim(), next, (ok) => {
          if (!ok) { setError('Wrong PIN'); setPin('') }
        })
      }, 120)
    }
  }

  if (step === 'name') {
    return (
      <div style={{ padding: '48px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>👤</div>
        <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 6 }}>Staff Login</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', marginBottom: 28 }}>Who's on shift?</p>
        <form onSubmit={handleNameSubmit} style={{ maxWidth: 280, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            autoFocus
            style={{ marginBottom: 12, textAlign: 'center' }}
          />
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: 8 }}>{error}</p>}
          <button type="submit" className="btn-primary" disabled={!name.trim()}>
            Continue →
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>👋 {name}</div>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', marginBottom: 28 }}>Enter your staff PIN</p>

      {/* PIN dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 8 }}>
        {Array.from({ length: Math.max(4, pin.length) }).map((_, i) => (
          <div key={i} style={{
            width: 14, height: 14, borderRadius: '50%',
            background: i < pin.length ? 'var(--primary)' : 'var(--surface-light)',
            border: '2px solid ' + (i < pin.length ? 'var(--primary)' : 'var(--border)'),
            transition: 'background 0.15s, border-color 0.15s',
          }} />
        ))}
      </div>

      {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: 12, minHeight: 20 }}>{error}</p>}
      {!error && <div style={{ minHeight: 32 }} />}

      {/* Numpad */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 240, margin: '0 auto 20px' }}>
        {DIGITS.map((d, i) => (
          <button
            key={i}
            onClick={() => handleDigit(d)}
            disabled={d === '' || configLoading}
            style={{
              padding: '18px 0',
              borderRadius: 'var(--radius)',
              fontWeight: 700, fontSize: d === '⌫' ? '1.1rem' : '1.3rem',
              background: d === '' ? 'transparent' : 'var(--surface)',
              color: 'var(--text)',
              border: d === '' ? 'none' : '1px solid var(--border)',
              cursor: d === '' ? 'default' : 'pointer',
              transition: 'background 0.1s',
            }}
          >{d}</button>
        ))}
      </div>

      <button
        onClick={() => { setStep('name'); setPin(''); setError('') }}
        style={{ fontSize: '0.82rem', color: 'var(--text-muted)', cursor: 'pointer' }}
      >
        ← Not {name}?
      </button>
    </div>
  )
}

export default function StaffPortal({ config, configLoading, onBack }) {
  const [authed,    setAuthed]    = useState(false)
  const [staffName, setStaffName] = useState('')
  const [tab,       setTab]       = useState('requests')
  const { requests } = usePendingEndRequests()

  function handleLogin(name, pin, callback) {
    const correctPin = config?.staff_pin || '1234'
    if (pin === correctPin) {
      setStaffName(name)
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
        <StaffLoginGate onLogin={handleLogin} configLoading={configLoading} />
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
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {staffName} · {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
          </p>
        </div>
        <button onClick={() => { setAuthed(false); setStaffName('') }} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}>Lock</button>
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
