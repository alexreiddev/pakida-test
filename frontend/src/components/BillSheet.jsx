import { useState } from 'react'
import { buildUPILink } from '../hooks/useSession'

const TIP_PRESETS = [0, 20, 50, 100]

export default function BillSheet({ session, sessionPlayers, player, config, onPaid }) {
  const [tip,     setTip]     = useState(0)
  const [customTip, setCustomTip] = useState('')
  const [creditUsed, setCreditUsed] = useState(0)

  const gamingTotal = (sessionPlayers || [])
    .filter(sp => !sp.is_courtesy)
    .reduce((s, sp) => s + Number(sp.individual_amount), 0)

  const foodTotal = Number(session?.food_total || 0)
  const activeTip = customTip ? parseInt(customTip) || 0 : tip
  const total     = Math.max(0, gamingTotal + foodTotal + activeTip - creditUsed)

  const myAmount  = sessionPlayers?.find(sp => sp.player_id === player?.id)?.individual_amount || 0
  const stampEarned = sessionPlayers?.find(sp => sp.player_id === player?.id)?.stamp_earned || false

  const upiLink = buildUPILink(
    total,
    `Pakida Café — Table ${session?.table_id}`,
    config?.upi_id || 'ashinaustrin740@fbl',
    config?.upi_name || 'ASHIN AND ASTRIN ENTERTAINMENTS LLP B'
  )

  function handlePaid() {
    onPaid({ tip: activeTip, creditApplied: creditUsed })
  }

  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-handle" />
        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>Your Bill</h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', marginBottom: 20 }}>
          Table {session?.table_id} · {(sessionPlayers || []).length} player{sessionPlayers?.length !== 1 ? 's' : ''}
        </p>

        {/* Per-player breakdown */}
        {(sessionPlayers || []).length > 1 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, letterSpacing: '0.04em' }}>PER PLAYER</p>
            {(sessionPlayers || []).map(sp => (
              <div key={sp.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                <div>
                  <span style={{ fontWeight: sp.player_id === player?.id ? 700 : 400 }}>
                    {sp.players?.name}{sp.player_id === player?.id ? ' (you)' : ''}
                  </span>
                  {sp.is_courtesy && <span style={{ color: 'var(--success)', fontSize: '0.75rem', marginLeft: 6 }}>Free</span>}
                  {sp.stamp_earned && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginLeft: 6 }}>⭐ Stamp</span>}
                </div>
                <span style={{ fontWeight: sp.player_id === player?.id ? 700 : 400 }}>
                  {sp.is_courtesy ? '₹0' : `₹${Math.ceil(sp.individual_amount)}`}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="divider" />

        {/* Bill summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Gaming</span>
            <span>₹{Math.ceil(gamingTotal)}</span>
          </div>
          {foodTotal > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Food & Drinks</span>
              <span>₹{foodTotal}</span>
            </div>
          )}
          {creditUsed > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--success)' }}>Credit Applied</span>
              <span style={{ color: 'var(--success)' }}>−₹{creditUsed}</span>
            </div>
          )}
        </div>

        {/* Tip */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, letterSpacing: '0.04em' }}>ADD A TIP?</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {TIP_PRESETS.map(t => (
              <button
                key={t}
                onClick={() => { setTip(t); setCustomTip('') }}
                style={{
                  flex: 1, padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600, fontSize: '0.85rem',
                  background: tip === t && !customTip ? 'var(--primary)' : 'var(--surface-light)',
                  color: tip === t && !customTip ? '#fff' : 'var(--text-dim)',
                  border: '1px solid var(--border)', cursor: 'pointer',
                }}
              >
                {t === 0 ? 'None' : `₹${t}`}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Custom tip amount"
            value={customTip}
            onChange={e => { setCustomTip(e.target.value); setTip(0) }}
            style={{ fontSize: '0.9rem' }}
          />
        </div>

        <div className="divider" />

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', marginBottom: 20 }}>
          <span>Total</span>
          <span style={{ color: 'var(--primary)' }}>₹{total}</span>
        </div>

        {/* Value stack */}
        {stampEarned && (
          <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(212,168,67,0.1)', borderRadius: 'var(--radius)', border: '1px solid var(--accent)33' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
              ⭐ Loyalty stamp earned! {player?.loyalty_stamps || 0}/6 towards a free hour.
            </p>
          </div>
        )}

        <a
          href={upiLink}
          className="btn-primary"
          style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}
        >
          Pay ₹{total} via UPI
        </a>

        <button className="btn-secondary" onClick={handlePaid} style={{ fontSize: '0.9rem' }}>
          Mark as paid (cash / already done)
        </button>
      </div>
    </div>
  )
}
