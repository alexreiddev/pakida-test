export default function LoyaltyPage({ player }) {
  const stamps  = player?.loyalty_stamps || 0
  const filled  = stamps % 6
  const freeHoursEarned = Math.floor(stamps / 6)

  const referralCode = player?.referral_code || '—'
  const shareText    = `Use my code ${referralCode} at Pakida Board Game Café and we both get ₹30 off! 🎲`

  function share() {
    if (navigator.share) {
      navigator.share({ text: shareText }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div style={{ padding: '24px 20px 80px' }}>
      {/* Stamps */}
      <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Loyalty Stamps</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 20 }}>
          {6 - filled} more {filled === 5 ? 'stamp' : 'stamps'} for a free hour
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1',
              borderRadius: '50%',
              background: i < filled ? 'var(--accent)' : 'var(--surface-light)',
              border: '2px solid ' + (i < filled ? 'var(--accent)' : 'var(--border)'),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
            }}>
              {i < filled ? '⭐' : ''}
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Stamps earned on sessions of 1 hour or more
        </p>

        {freeHoursEarned > 0 && (
          <div style={{ marginTop: 16, padding: '10px', background: 'rgba(212,168,67,0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent)33' }}>
            <p style={{ color: 'var(--accent)', fontWeight: 700 }}>
              🎉 You have {freeHoursEarned} free hour{freeHoursEarned > 1 ? 's' : ''} ready to use!
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 4 }}>Ask staff to apply at checkout.</p>
          </div>
        )}
      </div>

      {/* Referral */}
      <div className="card">
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Refer a Friend</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 16 }}>
          Share your code — you both get ₹30 credit when they join.
        </p>

        <div style={{
          background: 'var(--surface-light)', borderRadius: 'var(--radius)',
          padding: '16px', textAlign: 'center', marginBottom: 16,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Your referral code</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--accent)' }}>
            {referralCode}
          </p>
        </div>

        <button className="btn-primary" onClick={share}>
          Share with Friends
        </button>

        {(player?.credit_balance || 0) > 0 && (
          <div style={{ marginTop: 12, padding: '10px', background: 'rgba(122,158,126,0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary)33' }}>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
              💰 ₹{player.credit_balance} credit available (ask at checkout)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
