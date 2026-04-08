import { useState } from 'react'

export default function PhoneEntryPage({ onFound, onNew }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const clean = phone.replace(/\D/g, '')
    if (clean.length !== 10) { setError('Enter a valid 10-digit number'); return }
    setLoading(true)
    setError('')
    try {
      await onFound(clean)
    } catch {
      onNew(clean)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '32px 20px', minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎲</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Pakida</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Board Game Café · Trivandrum</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 500 }}>
          Your mobile number
        </label>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <span style={{
            display: 'flex', alignItems: 'center', padding: '12px 14px',
            background: 'var(--surface-light)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text-dim)', fontWeight: 600, whiteSpace: 'nowrap'
          }}>+91</span>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="98765 43210"
            value={phone}
            onChange={e => { setPhone(e.target.value); setError('') }}
            maxLength={10}
            style={{ flex: 1 }}
            autoFocus
          />
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginBottom: 12 }}>{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Looking up…' : 'Continue'}
        </button>
      </form>

      <p style={{ marginTop: 20, textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        By continuing you agree to our house rules.
      </p>

      <div style={{ marginTop: 'auto', paddingTop: 32 }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('goto', { detail: 'staff-login' }))}
          style={{
            width: '100%', padding: '12px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 500,
          }}
        >
          🔒 Staff Login
        </button>
      </div>
    </div>
  )
}
