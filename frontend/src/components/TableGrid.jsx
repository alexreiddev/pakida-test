const STATUS_COLOR = {
  available:   'var(--primary)',
  occupied:    'var(--danger)',
  reserved:    'var(--accent)',
  maintenance: 'var(--text-muted)',
}

const STATUS_LABEL = {
  available:   'Open',
  occupied:    'In Use',
  reserved:    'Reserved',
  maintenance: 'Closed',
}

export default function TableGrid({ tables, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 10,
    }}>
      {tables.map(table => {
        const available = table.status === 'available'
        return (
          <button
            key={table.id}
            onClick={() => available && onSelect && onSelect(table)}
            disabled={!available || !onSelect}
            style={{
              background: 'var(--surface)',
              border: `2px solid ${available ? STATUS_COLOR[table.status] + '66' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              padding: '14px 12px',
              textAlign: 'left',
              opacity: available ? 1 : 0.7,
              cursor: available && onSelect ? 'pointer' : 'default',
              transition: 'border-color 0.2s, transform 0.1s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{table.name}</span>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: STATUS_COLOR[table.status],
                marginTop: 4, flexShrink: 0,
              }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Up to {table.capacity} players
            </div>
            <div style={{
              marginTop: 6, fontSize: '0.75rem', fontWeight: 600,
              color: STATUS_COLOR[table.status],
            }}>
              {STATUS_LABEL[table.status]}
            </div>
          </button>
        )
      })}
    </div>
  )
}
