import { useState } from 'react'
import { useBooking, getDepositAmount } from '../hooks/useBooking'
import { buildUPILink } from '../hooks/useSession'

function getNext7Days() {
  const days = []
  for (let i = 1; i <= 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    if (d.getDay() !== 1) { // skip Mondays
      days.push(d.toISOString().slice(0, 10))
    }
  }
  return days
}

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => `${String(14 + i).padStart(2, '0')}:00`)

export default function BookingPage({ player, config, onBack }) {
  const { createBooking } = useBooking()
  const [step,       setStep]       = useState(1)
  const [date,       setDate]       = useState('')
  const [time,       setTime]       = useState('')
  const [partySize,  setPartySize]  = useState(2)
  const [tableId,    setTableId]    = useState(null)
  const [isCorp,     setIsCorp]     = useState(false)
  const [company,    setCompany]    = useState('')
  const [notes,      setNotes]      = useState('')
  const [booking,    setBooking]    = useState(null)
  const [loading,    setLoading]    = useState(false)
  const [slots,      setSlots]      = useState([])

  const { getAvailableSlots } = useBooking()
  const deposit = getDepositAmount(partySize)
  const days = getNext7Days()

  async function handleDateSelect(d) {
    setDate(d)
    const s = await getAvailableSlots(d, partySize)
    setSlots(s)
    setStep(2)
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const b = await createBooking({
        playerId: player.id,
        tableId,
        date,
        timeSlot: time,
        partySize,
        isCorporate: isCorp,
        companyName: company,
        notes,
      })
      setBooking(b)
      setStep(4)
    } catch (e) {
      alert(e.message || 'Booking failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const upiLink = booking
    ? buildUPILink(
        deposit,
        `Pakida Booking Deposit — ${date} ${time}`,
        config?.upi_id || 'ashinaustrin740@fbl',
        config?.upi_name || 'ASHIN AND ASTRIN ENTERTAINMENTS LLP B'
      )
    : ''

  return (
    <div style={{ minHeight: '100dvh', padding: '0 0 40px' }}>
      <div style={{ padding: '20px 20px 16px', paddingTop: `calc(20px + var(--safe-top))`, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ color: 'var(--text-dim)', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
          <h2 style={{ fontWeight: 700, fontSize: '1.15rem' }}>Book a Table</h2>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: step >= s ? 'var(--primary)' : 'var(--border)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {step === 1 && (
          <>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                Party size
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[2,3,4,5,6,7,8].map(n => (
                  <button key={n} onClick={() => setPartySize(n)} style={{
                    width: 40, height: 40, borderRadius: '50%',
                    fontWeight: 700, fontSize: '0.9rem',
                    background: partySize === n ? 'var(--primary)' : 'var(--surface-light)',
                    color: partySize === n ? '#fff' : 'var(--text)',
                    border: '2px solid ' + (partySize === n ? 'var(--primary)' : 'var(--border)'),
                    cursor: 'pointer',
                  }}>{n}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 10, fontWeight: 500 }}>Pick a date</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {days.map(d => {
                  const dateObj = new Date(d + 'T00:00:00')
                  const label   = dateObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
                  return (
                    <button key={d} onClick={() => handleDateSelect(d)} className="btn-secondary" style={{ textAlign: 'left', padding: '12px 16px' }}>
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 12, fontWeight: 500 }}>Select time</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
              {slots.map(slot => {
                const available = slot.availableTables.length > 0
                return (
                  <button
                    key={slot.time}
                    disabled={!available}
                    onClick={() => { setTime(slot.time); setTableId(slot.availableTables[0]?.id); setStep(3) }}
                    style={{
                      padding: '12px 8px', borderRadius: 'var(--radius)',
                      fontWeight: 600, fontSize: '0.9rem',
                      background: time === slot.time ? 'var(--primary)' : available ? 'var(--surface)' : 'var(--surface-light)',
                      color: time === slot.time ? '#fff' : available ? 'var(--text)' : 'var(--text-muted)',
                      border: '1px solid ' + (time === slot.time ? 'var(--primary)' : 'var(--border)'),
                      cursor: available ? 'pointer' : 'not-allowed',
                      opacity: available ? 1 : 0.5,
                    }}
                  >
                    {slot.time}
                  </button>
                )
              })}
            </div>
            <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="card" style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>Booking Summary</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                {new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} at {time}
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{partySize} people</p>
              <p style={{ color: 'var(--accent)', fontWeight: 700, marginTop: 8 }}>Deposit: ₹{deposit}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>
                Free cancel if 4+ hours before your slot.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                <input type="checkbox" checked={isCorp} onChange={e => setIsCorp(e.target.checked)} style={{ width: 'auto' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Corporate / team booking</span>
              </label>
              {isCorp && (
                <input placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} style={{ marginBottom: 12 }} />
              )}
              <textarea placeholder="Special requests (optional)" value={notes} onChange={e => setNotes(e.target.value)} rows={2} style={{ resize: 'none' }} />
            </div>

            <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ marginBottom: 10 }}>
              {loading ? 'Booking…' : `Confirm Booking`}
            </button>
            <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
          </>
        )}

        {step === 4 && booking && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</p>
            <h3 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 8 }}>Booking Confirmed!</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>
              {new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} at {time}
            </p>
            <div className="card" style={{ marginBottom: 20, textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 8 }}>
                Pay the ₹{deposit} deposit to confirm your spot:
              </p>
              <a href={upiLink} className="btn-accent" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Pay ₹{deposit} Deposit via UPI
              </a>
            </div>
            <button className="btn-secondary" onClick={onBack}>Back to Home</button>
          </div>
        )}
      </div>
    </div>
  )
}
