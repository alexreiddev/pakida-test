import { useState, useEffect } from 'react'
import { useAppConfig } from '../../hooks/useAdmin'

export default function SettingsTab() {
  const { config, updateConfig } = useAppConfig()
  const [wifi,      setWifi]     = useState({ name: '', password: '' })
  const [staffPin,  setStaffPin] = useState('')
  const [saving,    setSaving]   = useState(false)
  const [saved,     setSaved]    = useState(false)

  useEffect(() => {
    if (config) {
      setWifi({ name: config.wifi_name, password: config.wifi_password })
      setStaffPin(config.staff_pin || '1234')
    }
  }, [config])

  async function saveWifi() {
    setSaving(true)
    await updateConfig({ wifi_name: wifi.name, wifi_password: wifi.password })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function saveStaffPin() {
    if (staffPin.length < 4) return alert('PIN must be at least 4 digits')
    setSaving(true)
    await updateConfig({ staff_pin: staffPin })
    setSaving(false)
    alert('Staff PIN updated.')
  }

  async function toggleMonday() {
    await updateConfig({ monday_open: !config?.monday_open })
  }

  if (!config) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Monday toggle */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: 600 }}>Monday Opening</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 2 }}>Override the Monday closure</p>
          </div>
          <div
            onClick={toggleMonday}
            style={{
              width: 48, height: 26, borderRadius: 13,
              background: config.monday_open ? 'var(--success)' : 'var(--surface-light)',
              position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute', top: 3,
              left: config.monday_open ? 25 : 3,
              width: 20, height: 20, borderRadius: '50%', background: '#fff',
              transition: 'left 0.2s',
            }} />
          </div>
        </div>
      </div>

      {/* WiFi settings */}
      <div className="card">
        <p style={{ fontWeight: 600, marginBottom: 12 }}>WiFi Credentials</p>
        <input
          value={wifi.name}
          onChange={e => setWifi(w => ({ ...w, name: e.target.value }))}
          placeholder="Network name"
          style={{ marginBottom: 10 }}
        />
        <input
          value={wifi.password}
          onChange={e => setWifi(w => ({ ...w, password: e.target.value }))}
          placeholder="Password"
          style={{ marginBottom: 12 }}
        />
        <button className="btn-primary" onClick={saveWifi} disabled={saving} style={{ fontSize: '0.9rem' }}>
          {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save WiFi'}
        </button>
      </div>

      {/* Staff PIN */}
      <div className="card">
        <p style={{ fontWeight: 600, marginBottom: 12 }}>Staff PIN</p>
        <input
          type="password"
          value={staffPin}
          onChange={e => setStaffPin(e.target.value)}
          placeholder="New staff PIN"
          maxLength={8}
          style={{ marginBottom: 12 }}
        />
        <button className="btn-secondary" onClick={saveStaffPin} disabled={saving}>
          Update Staff PIN
        </button>
      </div>

      {/* Founders slots */}
      <div className="card">
        <p style={{ fontWeight: 600, marginBottom: 4 }}>Founders Club</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
          {config.founders_slots_used} / {config.founders_slots_total} slots used
        </p>
        <div style={{ marginTop: 8, height: 6, background: 'var(--surface-light)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(config.founders_slots_used / config.founders_slots_total) * 100}%`,
            background: 'var(--accent)', borderRadius: 3,
          }} />
        </div>
      </div>
    </div>
  )
}
