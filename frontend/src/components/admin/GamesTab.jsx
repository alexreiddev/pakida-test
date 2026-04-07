import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { GAMES_DATA } from '../../data/games'

export default function GamesTab() {
  const [games,   setGames]   = useState([])
  const [json,    setJson]    = useState('')
  const [saving,  setSaving]  = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.from('games').select('*').order('name').then(({ data }) => setGames(data || []))
  }, [])

  async function handleImport() {
    let parsed
    try {
      parsed = JSON.parse(json)
      if (!Array.isArray(parsed)) throw new Error('Must be an array')
    } catch (e) {
      setMessage('Invalid JSON: ' + e.message)
      return
    }
    setSaving(true)
    const rows = parsed.map(g => ({
      name: g.name,
      category: g.category,
      min_players: g.min || g.min_players,
      max_players: g.max || g.max_players,
      time_estimate: g.time || g.time_estimate,
      description: g.desc || g.description || '',
      is_available: true,
    }))
    const { error } = await supabase.from('games').upsert(rows, { onConflict: 'name' })
    if (error) setMessage('Error: ' + error.message)
    else { setMessage(`Imported ${rows.length} games!`); setJson('') }
    setSaving(false)
  }

  async function resetToDefault() {
    if (!confirm('Reset games to the default 71 games from spec?')) return
    setSaving(true)
    await supabase.from('games').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    const rows = GAMES_DATA.map(g => ({
      name: g.name, category: g.category,
      min_players: g.min, max_players: g.max,
      time_estimate: g.time, description: g.desc, is_available: true,
    }))
    await supabase.from('games').insert(rows)
    setMessage('Reset to default games.')
    setSaving(false)
  }

  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 12 }}>
        {games.length} games in library
      </p>

      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>Bulk Import (JSON)</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>
          Paste an array of game objects. Keys: name, category, min, max, time, desc.
        </p>
        <textarea
          value={json}
          onChange={e => setJson(e.target.value)}
          placeholder='[{"name":"Catan","category":"Strategy","min":3,"max":4,"time":"60-90","desc":"..."}]'
          rows={5}
          style={{ marginBottom: 10, resize: 'vertical', fontSize: '0.8rem' }}
        />
        {message && <p style={{ color: message.startsWith('Error') ? 'var(--danger)' : 'var(--success)', fontSize: '0.85rem', marginBottom: 8 }}>{message}</p>}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" onClick={handleImport} disabled={saving || !json.trim()} style={{ flex: 2 }}>
            {saving ? 'Importing…' : 'Import Games'}
          </button>
          <button className="btn-secondary" onClick={resetToDefault} disabled={saving} style={{ flex: 1 }}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {games.slice(0, 30).map(g => (
          <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{g.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{g.category} · {g.min_players}–{g.max_players}P</p>
            </div>
            <button
              onClick={() => supabase.from('games').update({ is_available: !g.is_available }).eq('id', g.id).then(() =>
                setGames(prev => prev.map(x => x.id === g.id ? { ...x, is_available: !x.is_available } : x))
              )}
              style={{ fontSize: '0.75rem', color: g.is_available ? 'var(--success)' : 'var(--text-muted)', cursor: 'pointer' }}
            >
              {g.is_available ? '✓ In' : '✗ Out'}
            </button>
          </div>
        ))}
        {games.length > 30 && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: 8 }}>+{games.length - 30} more</p>}
      </div>
    </div>
  )
}
