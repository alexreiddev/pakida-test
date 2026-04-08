import { useState, useEffect } from 'react'
import { usePlayer } from './hooks/usePlayer'
import { useSession } from './hooks/useSession'
import { useAppConfig } from './hooks/useAdmin'
import { supabase } from './lib/supabase'

import PhoneEntryPage  from './pages/PhoneEntryPage'
import RegistrationPage from './pages/RegistrationPage'
import HomePage        from './pages/HomePage'
import SessionHubPage  from './pages/SessionHubPage'
import BookingPage     from './pages/BookingPage'
import GamesPage       from './pages/GamesPage'
import BillSheet       from './components/BillSheet'
import AdminPanel      from './pages/AdminPanel'
import StaffPortal     from './pages/StaffPortal'

export default function App() {
  const { player, loading: playerLoading, lookupByPhone, register, refreshPlayer, logout } = usePlayer()
  const { config, loading: configLoading } = useAppConfig()

  // Page routing
  const [page,     setPage]     = useState('home')
  const [newPhone, setNewPhone] = useState('')

  // Session state (tableId from NFC deep-link or user selection)
  const [selectedTableId, setSelectedTableId] = useState(null)
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [sessionPlayers,  setSessionPlayers]  = useState([])
  const [billingSession,  setBillingSession]  = useState(null)

  // Detect NFC deep-link: /?table=X
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const table  = params.get('table')
    if (table) setSelectedTableId(parseInt(table))
  }, [])

  // Listen for staff-login navigation event from PhoneEntryPage
  useEffect(() => {
    const handler = (e) => {
      if (e.detail === 'staff-login') setPage('staff')
    }
    window.addEventListener('goto', handler)
    return () => window.removeEventListener('goto', handler)
  }, [])

  // Watch for billing-status sessions (staff approved end request)
  useEffect(() => {
    if (!activeSessionId) return
    const channel = supabase
      .channel(`billing-watch-${activeSessionId}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'sessions',
          filter: `id=eq.${activeSessionId}` },
        async (payload) => {
          if (payload.new.status === 'billing') {
            // Fetch full session + players for bill sheet
            const { data } = await supabase
              .from('sessions')
              .select('*, session_players(*, players(*))')
              .eq('id', activeSessionId)
              .single()
            setBillingSession(data)
            setSessionPlayers(data?.session_players || [])
          }
        }
      )
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [activeSessionId])

  // ── Auth handlers ──────────────────────────────────────────

  async function handlePhoneFound(phone) {
    const existing = await lookupByPhone(phone)
    if (!existing) throw new Error('Not found')
    // Player found — if they have an active session, load it
    setPage('home')
  }

  function handlePhoneNew(phone) {
    setNewPhone(phone)
    setPage('register')
  }

  async function handleRegister(data) {
    await register(data)
    setPage('home')
  }

  // ── Session handlers ────────────────────────────────────────

  const { startSession, joinSession, leaveSession, endSession } = useSession(selectedTableId)

  async function handleTableSelect(table) {
    setSelectedTableId(table.id)
    // If table is occupied, attempt to join existing session
    if (table.status === 'occupied') {
      const { data: existing } = await supabase
        .from('sessions')
        .select('*, session_players(player_id)')
        .eq('table_id', table.id)
        .eq('status', 'active')
        .single()
      if (existing) {
        const alreadyIn = existing.session_players.some(sp => sp.player_id === player.id)
        if (alreadyIn) {
          setActiveSessionId(existing.id)
          setSessionPlayers(existing.session_players)
          setPage('session')
          return
        }
        if (confirm(`Join ${existing.session_players.length} players already at this table?`)) {
          await joinSession(existing.id, player)
          setActiveSessionId(existing.id)
          setPage('session')
          return
        }
        return
      }
    }
    // Start new session
    const sess = await startSession(player, table.id)
    setActiveSessionId(sess.id)
    setPage('session')
  }

  async function handleLeaveEarly(sessionId, leavePlayer) {
    await leaveSession(sessionId, leavePlayer)
    setActiveSessionId(null)
    setPage('home')
  }

  async function handleBillPaid({ tip, creditApplied }) {
    if (!billingSession) return
    await endSession(billingSession.id, { tip, creditApplied })
    setBillingSession(null)
    setActiveSessionId(null)
    setSelectedTableId(null)
    await refreshPlayer()
    setPage('home')
  }

  // ── Render ──────────────────────────────────────────────────

  if (playerLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: '2rem' }}>🎲</div>
        <p style={{ color: 'var(--text-dim)' }}>Loading…</p>
      </div>
    )
  }

  // Admin panel
  if (page === 'admin') {
    return <AdminPanel config={config} onBack={() => setPage('home')} />
  }

  // Staff portal
  if (page === 'staff') {
    return <StaffPortal config={config} configLoading={configLoading} onBack={() => setPage('home')} />
  }

  // Not logged in
  if (!player) {
    if (page === 'register') {
      return <RegistrationPage phone={newPhone} onRegister={handleRegister} />
    }
    return <PhoneEntryPage onFound={handlePhoneFound} onNew={handlePhoneNew} />
  }

  // Active session
  if (page === 'session' && activeSessionId) {
    return (
      <>
        <SessionHubPage
          player={player}
          session={{ id: activeSessionId, table_id: selectedTableId, start_time: new Date().toISOString() }}
          sessionPlayers={sessionPlayers}
          config={config}
          onLeave={handleLeaveEarly}
          onLogout={() => { logout(); setPage('home') }}
        />
        {/* Bill sheet when session moves to billing (staff approved) */}
        {billingSession && (
          <BillSheet
            session={billingSession}
            sessionPlayers={sessionPlayers}
            player={player}
            config={config}
            onPaid={handleBillPaid}
          />
        )}
      </>
    )
  }

  // Games page
  if (page === 'games') {
    return <GamesPage onBack={() => setPage('home')} />
  }

  // Booking page
  if (page === 'booking') {
    return <BookingPage player={player} config={config} onBack={() => setPage('home')} />
  }

  // Home
  return (
    <>
      <HomePage
        player={player}
        onStartSession={handleTableSelect}
        onBook={() => setPage('booking')}
        onGames={() => setPage('games')}
      />

      {/* Admin access button — hidden at bottom of profile area */}
      <div style={{
        position: 'fixed', bottom: 8, right: 8,
        paddingBottom: 'var(--safe-bottom)', zIndex: 5,
      }}>
        <button
          onClick={() => setPage('admin')}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-full)', padding: '6px 12px',
            fontSize: '0.7rem', color: 'var(--text-muted)', cursor: 'pointer',
          }}
        >
          Admin
        </button>
      </div>
    </>
  )
}
