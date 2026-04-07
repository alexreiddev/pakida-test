import { useState } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function RegistrationPage({ phone, onRegister }) {
  const [name,         setName]         = useState('')
  const [referredBy,   setReferredBy]   = useState('')
  const [birthMonth,   setBirthMonth]   = useState('')
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name'); return }
    setLoading(true)
    setError('')
    try {
      await onRegister({
        phone,
        name: name.trim(),
        referredBy: referredBy.trim().toUpperCase() || null,
        birthdayMonth: birthMonth ? parseInt(birthMonth) : null,
      })
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '32px 20px', minHeight: '100dvh', overflowY: 'auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Welcome to Pakida!</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Quick setup — takes 10 seconds.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 500 }}>
            Your name *
          </label>
          <input
            type="text"
            placeholder="e.g. Arjun"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            autoFocus
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 500 }}>
            Referral code <span style={{ color: 'var(--text-muted)' }}>(optional — you both get ₹30)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. PK543210"
            value={referredBy}
            onChange={e => setReferredBy(e.target.value)}
            maxLength={8}
            style={{ textTransform: 'uppercase' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 500 }}>
            Birth month <span style={{ color: 'var(--text-muted)' }}>(optional — free hour on your birthday!)</span>
          </label>
          <select
            value={birthMonth}
            onChange={e => setBirthMonth(e.target.value)}
            style={{ background: 'var(--surface-light)' }}
          >
            <option value="">Select month</option>
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </div>

        {/* Membership info */}
        <div className="card" style={{ borderColor: 'var(--primary)33' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Founders Club — ₹799/mo</span><br />
            15% off every visit. Only 50 spots total.{' '}
            <span style={{ color: 'var(--primary)' }}>Ask at counter to join.</span>
          </p>
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating account…' : 'Start Playing →'}
        </button>
      </form>
    </div>
  )
}
