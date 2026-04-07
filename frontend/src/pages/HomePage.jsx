import { useTables } from '../hooks/useTables'
import TableGrid from '../components/TableGrid'

const VALUE_MESSAGES = [
  '71 games available — from chess to Catan',
  'Free WiFi · Pakida_Guest / playandchill',
  '6 visits = 1 free hour via loyalty stamps',
  'Invite a friend — you both get ₹30 credit',
]

export default function HomePage({ player, onStartSession, onBook, onGames }) {
  const { tables, loading } = useTables()

  const isMonday = new Date().getDay() === 1

  return (
    <div style={{ padding: '0 0 100px' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
        padding: '48px 20px 32px',
        paddingTop: `calc(48px + var(--safe-top))`,
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
          Hey {player.name.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {isMonday ? 'We\'re closed today. See you tomorrow!' : 'Ready to play?'}
        </p>

        {/* Rotating value messages */}
        <div style={{
          marginTop: 16, padding: '10px 14px',
          background: 'var(--surface-light)', borderRadius: 'var(--radius)',
          fontSize: '0.85rem', color: 'var(--text-dim)',
          borderLeft: '3px solid var(--primary)',
        }}>
          {VALUE_MESSAGES[Math.floor(Date.now() / 30000) % VALUE_MESSAGES.length]}
        </div>
      </div>

      {/* Tables */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Tables</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {tables.filter(t => t.status === 'available').length} available
          </span>
        </div>

        {loading
          ? <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 24 }}>Loading…</p>
          : <TableGrid tables={tables} onSelect={!isMonday ? onStartSession : null} />
        }
      </div>

      {/* Membership tiers */}
      <div style={{ padding: '24px 20px 0' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Pricing</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Walk-in',       price: '₹100/hr',       note: 'per person' },
            { label: 'Group (5+)',    price: '₹85/hr',        note: 'per person', badge: 'Save 15%' },
            { label: 'Founders Club', price: '₹799/mo',       note: '15% off always', badge: 'Limited — 50 slots', gold: true },
            { label: 'Monthly Pass',  price: '₹999/mo',       note: 'Unlimited + free drink' },
          ].map(tier => (
            <div key={tier.label} className="card" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderColor: tier.gold ? 'var(--accent)44' : undefined,
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tier.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{tier.note}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: tier.gold ? 'var(--accent)' : 'var(--primary)' }}>
                  {tier.price}
                </div>
                {tier.badge && (
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem', marginTop: 4 }}>
                    {tier.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '24px 20px 0', display: 'flex', gap: 12 }}>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={onBook}>
          📅 Book Table
        </button>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={onGames}>
          🎲 Browse Games
        </button>
      </div>
    </div>
  )
}
