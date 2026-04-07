import { useState } from 'react'
import TodayTab     from '../components/admin/TodayTab'
import LiveTab      from '../components/admin/LiveTab'
import MenuTab      from '../components/admin/MenuTab'
import InventoryTab from '../components/admin/InventoryTab'
import GamesTab     from '../components/admin/GamesTab'
import SettingsTab  from '../components/admin/SettingsTab'
import OverviewTab  from '../components/admin/OverviewTab'
import BookingsTab  from '../components/admin/BookingsTab'
import PlayersTab   from '../components/admin/PlayersTab'
import SessionsTab  from '../components/admin/SessionsTab'
import OrdersTab    from '../components/admin/OrdersTab'

const TABS = [
  { id: 'today',     label: 'Today' },
  { id: 'live',      label: 'Live' },
  { id: 'menu',      label: 'Menu' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'games',     label: 'Games' },
  { id: 'settings',  label: 'Settings' },
  { id: 'overview',  label: 'Overview' },
  { id: 'bookings',  label: 'Bookings' },
  { id: 'players',   label: 'Players' },
  { id: 'sessions',  label: 'Sessions' },
  { id: 'orders',    label: 'Orders' },
]

function AdminLoginGate({ onLogin }) {
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')

  function submit(e) {
    e.preventDefault()
    if (onLogin(pin)) return
    setErr('Wrong PIN'); setPin('')
  }

  return (
    <div style={{ padding: '48px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: '2rem', marginBottom: 16 }}>🔐</p>
      <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24 }}>Admin Login</h2>
      <form onSubmit={submit} style={{ maxWidth: 240, margin: '0 auto' }}>
        <input
          type="password"
          inputMode="numeric"
          placeholder="Admin PIN"
          value={pin}
          onChange={e => { setPin(e.target.value); setErr('') }}
          autoFocus
          style={{ marginBottom: 12, textAlign: 'center', letterSpacing: '0.2em' }}
        />
        {err && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: 8 }}>{err}</p>}
        <button type="submit" className="btn-primary">Enter</button>
      </form>
    </div>
  )
}

export default function AdminPanel({ config, onBack }) {
  const [authed, setAuthed] = useState(false)
  const [tab,    setTab]    = useState('today')

  function handleLogin(pin) {
    const correct = config?.admin_pin || '7364'
    if (pin === correct) { setAuthed(true); return true }
    return false
  }

  const TAB_CONTENT = {
    today:     <TodayTab />,
    live:      <LiveTab />,
    menu:      <MenuTab />,
    inventory: <InventoryTab />,
    games:     <GamesTab />,
    settings:  <SettingsTab />,
    overview:  <OverviewTab />,
    bookings:  <BookingsTab />,
    players:   <PlayersTab />,
    sessions:  <SessionsTab />,
    orders:    <OrdersTab />,
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
        <div style={{ padding: '20px', paddingTop: `calc(20px + var(--safe-top))` }}>
          <button onClick={onBack} style={{ color: 'var(--text-dim)', cursor: 'pointer' }}>← Back</button>
        </div>
        <AdminLoginGate onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        padding: '14px 20px', paddingTop: `calc(14px + var(--safe-top))`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <p style={{ fontWeight: 700 }}>Admin</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setAuthed(false)} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}>Lock</button>
          <button onClick={onBack} style={{ color: 'var(--text-dim)', fontSize: '0.85rem', cursor: 'pointer' }}>← Exit</button>
        </div>
      </div>

      {/* Horizontal tab nav */}
      <div style={{
        display: 'flex', overflowX: 'auto', gap: 0,
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        scrollbarWidth: 'none',
        position: 'sticky', top: 53, zIndex: 19,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flexShrink: 0,
              padding: '10px 14px',
              fontSize: '0.82rem',
              fontWeight: tab === t.id ? 700 : 400,
              color: tab === t.id ? 'var(--primary)' : 'var(--text-dim)',
              borderBottom: `2px solid ${tab === t.id ? 'var(--primary)' : 'transparent'}`,
              background: 'none', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: '20px', paddingBottom: `calc(20px + var(--safe-bottom))` }}>
        {TAB_CONTENT[tab]}
      </div>
    </div>
  )
}
