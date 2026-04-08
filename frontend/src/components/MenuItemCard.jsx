export default function MenuItemCard({ item, quantity, isNew, upsell, onAdd, onRemove, onUpsell }) {
  const soldOut = !item.is_available || (item.stock !== null && item.stock === 0)

  return (
    <div className="card" style={{ opacity: soldOut ? 0.6 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          {/* Badges row */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: item.is_veg ? 'var(--success)' : 'var(--danger)',
              flexShrink: 0, marginTop: 2,
              border: '1.5px solid ' + (item.is_veg ? 'var(--success)' : 'var(--danger)'),
            }} />
            {item.is_daily_special && <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>⭐ Today's Special</span>}
            {item.is_seasonal && <span className="badge badge-dim" style={{ fontSize: '0.7rem' }}>Seasonal</span>}
            {isNew && <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>New!</span>}
            {soldOut && <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>Sold Out</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            {item.emoji && <span>{item.emoji}</span>}
            <span style={{ fontWeight: 600 }}>{item.name}</span>
          </div>

          {item.description && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 4, lineHeight: 1.4 }}>
              {item.description}
            </p>
          )}

          {item.combo_contents && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
              {item.combo_contents}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>₹{item.price}</span>
            {item.savings_amount && (
              <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Save ₹{item.savings_amount}</span>
            )}
          </div>
        </div>

        {/* Quantity controls */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, flexShrink: 0 }}>
          {quantity > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface-light)', borderRadius: 'var(--radius-full)', padding: '4px 10px' }}>
              <button
                onClick={onRemove}
                style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dim)', cursor: 'pointer', lineHeight: 1 }}
              >−</button>
              <span style={{ fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={onAdd}
                disabled={soldOut}
                style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)', cursor: 'pointer', lineHeight: 1 }}
              >+</button>
            </div>
          ) : (
            <button
              className="btn-primary"
              onClick={onAdd}
              disabled={soldOut}
              style={{ padding: '8px 20px', fontSize: '0.875rem', width: 'auto' }}
            >
              {soldOut ? 'Out' : 'Add'}
            </button>
          )}
        </div>
      </div>

      {/* Upsell suggestion */}
      {upsell && quantity > 0 && (
        <div style={{
          marginTop: 10, padding: '8px 12px',
          background: 'var(--surface-light)', borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem', color: 'var(--text-dim)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Make it <strong style={{ color: 'var(--accent)' }}>{upsell.name}</strong> for ₹{upsell.price - item.price} more?</span>
          <button
            onClick={() => onUpsell(upsell)}
            style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}
          >
            Upgrade
          </button>
        </div>
      )}
    </div>
  )
}
