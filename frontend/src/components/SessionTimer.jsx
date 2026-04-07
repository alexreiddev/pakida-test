import { useState, useEffect } from 'react'

const FUN_FACTS = [
  '30 min in — you\'re just getting started 🎲',
  '1 hour! You\'ve earned a loyalty stamp 🌟',
  '90 min — true gamers. Respect.',
  '2 hours in — legendary status unlocked 🏆',
]

function formatTime(ms) {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${m}:${String(sec).padStart(2, '0')}`
}

function getBillableAmount(ms, membershipType, playerCount) {
  if (membershipType === 'monthly') return 0
  const min = ms / 60000
  if (min < 10) return 0
  const blocks = Math.max(1, Math.ceil(min / 30))
  const rate = playerCount >= 5 ? 85 : 100
  const baseRate = membershipType === 'founders' ? rate * 0.85 : rate
  return Math.round((blocks * 30 / 60) * baseRate)
}

export default function SessionTimer({ startTime, membershipType, playerCount }) {
  const [elapsed, setElapsed] = useState(Date.now() - new Date(startTime))

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - new Date(startTime)), 1000)
    return () => clearInterval(id)
  }, [startTime])

  const minutes = elapsed / 60000
  const factIndex = Math.floor(minutes / 30)
  const showFact = factIndex > 0 && factIndex < FUN_FACTS.length && minutes % 30 < 1

  const currentAmount = getBillableAmount(elapsed, membershipType, playerCount)

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      margin: '0 20px',
      textAlign: 'center',
      border: '1px solid var(--border)',
    }}>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 500, letterSpacing: '0.05em' }}>
        SESSION TIME
      </p>
      <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
        {formatTime(elapsed)}
      </p>
      {membershipType !== 'monthly' && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginTop: 8 }}>
          Current charge: <strong style={{ color: 'var(--text)' }}>₹{currentAmount}</strong>
          {membershipType === 'founders' && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>· 15% off applied</span>}
          {playerCount >= 5 && <span style={{ color: 'var(--primary)', marginLeft: 4 }}>· Group rate</span>}
        </p>
      )}
      {membershipType === 'monthly' && (
        <p style={{ fontSize: '0.875rem', color: 'var(--primary)', marginTop: 8 }}>Monthly Pass — play as long as you like</p>
      )}
      {showFact && (
        <div style={{
          marginTop: 12, padding: '8px 12px', background: 'var(--surface-light)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-dim)',
        }}>
          {FUN_FACTS[factIndex - 1]}
        </div>
      )}
    </div>
  )
}
