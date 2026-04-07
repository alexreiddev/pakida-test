import { useState } from 'react'
import { useAdminKPIs } from '../../hooks/useAdmin'

export default function OverviewTab() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const { kpis, loading } = useAdminKPIs(date)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
        />
      </div>

      {loading
        ? <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        : kpis && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Total Revenue',   value: `₹${Math.round(kpis.revenue)}`,  note: `Gaming ₹${Math.round(kpis.gaming)} + Food ₹${Math.round(kpis.food)}` },
              { label: 'Sessions',        value: kpis.sessions,                    note: 'Completed sessions' },
              { label: 'New Players',     value: kpis.newPlayers,                  note: 'Registered today' },
              { label: 'Bookings',        value: kpis.confirmedBookings,            note: 'Confirmed for this day' },
            ].map(k => (
              <div key={k.label} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{k.label}</p>
                  {k.note && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{k.note}</p>}
                </div>
                <p style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--primary)' }}>{k.value}</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
