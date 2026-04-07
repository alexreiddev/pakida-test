import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { GAME_CATEGORIES } from '../data/games'

export default function GamesPage({ onBack }) {
  const [games,    setGames]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [cat,      setCat]      = useState('All')
  const [search,   setSearch]   = useState('')
  const [players,  setPlayers]  = useState(0)

  useEffect(() => {
    supabase.from('games').select('*').order('name').then(({ data }) => {
      setGames(data || [])
      setLoading(false)
    })
  }, [])

  const filtered = games.filter(g => {
    if (cat !== 'All' && g.category !== cat) return false
    if (players > 0 && (g.min_players > players || g.max_players < players)) return false
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ minHeight: '100dvh', paddingBottom: 40 }}>
      <div style={{ padding: '20px 20px 0', paddingTop: `calc(20px + var(--safe-top))`, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{ color: 'var(--text-dim)', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
          <h2 style={{ fontWeight: 700, fontSize: '1.15rem' }}>Game Library</h2>
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{filtered.length} games</span>
        </div>
        <input
          type="search"
          placeholder="Search games…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {['All', ...GAME_CATEGORIES].map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                flexShrink: 0, padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem', fontWeight: 600,
                background: cat === c ? 'var(--primary)' : 'var(--surface-light)',
                color: cat === c ? '#fff' : 'var(--text-dim)',
                border: '1px solid ' + (cat === c ? 'var(--primary)' : 'var(--border)'),
                cursor: 'pointer',
              }}
            >{c}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, paddingBottom: 12 }}>
          {[0,2,3,4,5,6].map(n => (
            <button key={n} onClick={() => setPlayers(n === players ? 0 : n)} style={{
              flexShrink: 0, padding: '6px 10px',
              borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600,
              background: players === n ? 'var(--accent)' : 'var(--surface-light)',
              color: players === n ? '#1b1f17' : 'var(--text-dim)',
              border: '1px solid var(--border)', cursor: 'pointer',
            }}>{n === 0 ? 'Any' : `${n}P`}</button>
          ))}
        </div>
      </div>

      {loading
        ? <p style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</p>
        : (
          <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(g => (
              <div key={g.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700 }}>{g.name}</span>
                  <span className="badge badge-dim" style={{ flexShrink: 0, marginLeft: 8 }}>{g.category}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 8, lineHeight: 1.4 }}>{g.description}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>👥 {g.min_players}–{g.max_players} players</span>
                  <span>⏱ {g.time_estimate} min</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>No games match your filters.</p>
            )}
          </div>
        )
      }
    </div>
  )
}
