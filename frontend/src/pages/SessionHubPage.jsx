import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import SessionTimer from '../components/SessionTimer'
import MenuPage from './MenuPage'
import OrdersPage from './OrdersPage'
import LoyaltyPage from './LoyaltyPage'
import ProfilePage from './ProfilePage'
import { useEndRequest } from '../hooks/useEndRequest'

export default function SessionHubPage({ player, session, sessionPlayers, config, onLeave, onLogout }) {
  const [tab, setTab] = useState('home')
  const { request, submitRequest } = useEndRequest(session?.id, player?.id)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [requestSent, setRequestSent] = useState(false)

  const myPlayerEntry = sessionPlayers?.find(sp => sp.player_id === player?.id)
  const activePlayers = sessionPlayers?.filter(sp => !sp.left_at) || []
  const pendingOrders = 0 // could wire from useOrders

  async function handleEndRequest() {
    try {
      await submitRequest()
      setRequestSent(true)
    } catch (e) {
      alert(e.message || 'Failed to send request')
    }
  }

  async function handleLeave() {
    setLeaving(true)
    try {
      await onLeave(session.id, player)
    } finally {
      setLeaving(false)
      setShowLeaveConfirm(false)
    }
  }

  // Staff approved end session → billing handled by App.jsx via Realtime
  const isApproved = request?.status === 'approved'

  return (
    <div style={{ paddingTop: 0 }}>
      {/* Tab content */}
      {tab === 'home' && (
        <div style={{ padding: '24px 0 80px' }}>
          <div style={{ padding: '0 20px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', paddingTop: `calc(20px + var(--safe-top))` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>TABLE {session?.table_id}</p>
              <span className="badge badge-green">{activePlayers.length} playing</span>
            </div>
          </div>

          <div style={{ padding: '20px 0' }}>
            <SessionTimer
              startTime={session?.start_time}
              membershipType={player?.membership_type}
              playerCount={activePlayers.length}
            />
          </div>

          {/* Players at table */}
          <div style={{ padding: '0 20px 20px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600, letterSpacing: '0.04em' }}>AT THIS TABLE</p>
            {activePlayers.map(sp => (
              <div key={sp.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--surface-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', fontWeight: 700,
                }}>
                  {sp.players?.name?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: '0.9rem' }}>
                  {sp.players?.name}
                  {sp.player_id === player?.id && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}> (you)</span>}
                </span>
                <span className="badge badge-dim" style={{ marginLeft: 'auto' }}>
                  {sp.players?.membership_type === 'monthly' ? 'Monthly' :
                   sp.players?.membership_type === 'founders' ? 'Founder' : 'Walk-in'}
                </span>
              </div>
            ))}
          </div>

          {/* End game request */}
          <div style={{ padding: '0 20px' }}>
            {request?.status === 'pending' || requestSent ? (
              <div className="card" style={{ textAlign: 'center', borderColor: 'var(--warning)44' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>⏳</p>
                <p style={{ fontWeight: 600, color: 'var(--warning)' }}>Waiting for staff approval</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 4 }}>
                  A staff member will come to wrap up your session.
                </p>
              </div>
            ) : isApproved ? (
              <div className="card" style={{ textAlign: 'center', borderColor: 'var(--success)44' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>✅</p>
                <p style={{ fontWeight: 600, color: 'var(--success)' }}>Session ending — staff is on the way</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="btn-secondary" onClick={handleEndRequest}>
                  🏁 Request to End Game
                </button>
                {activePlayers.length > 1 && (
                  <button
                    className="btn-secondary"
                    onClick={() => setShowLeaveConfirm(true)}
                    style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}
                  >
                    I'm leaving early (rest continue)
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'menu'    && <MenuPage session={session} player={player} />}
      {tab === 'orders'  && <OrdersPage session={session} />}
      {tab === 'stamps'  && <LoyaltyPage player={player} />}
      {tab === 'profile' && <ProfilePage player={player} onLogout={onLogout} />}

      <BottomNav active={tab} onChange={setTab} pendingOrders={pendingOrders} />

      {/* Early leave confirm */}
      {showLeaveConfirm && (
        <div className="sheet-overlay" onClick={() => setShowLeaveConfirm(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Leaving early?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 24 }}>
              Your time will be billed up to now. The rest of the table continues.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn-primary" onClick={handleLeave} disabled={leaving}>
                {leaving ? 'Processing…' : 'Yes, I\'m leaving now'}
              </button>
              <button className="btn-secondary" onClick={() => setShowLeaveConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
