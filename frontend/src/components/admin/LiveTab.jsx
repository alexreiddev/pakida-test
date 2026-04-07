import LiveTablesView from '../staff/LiveTablesView'
import OrderQueue from '../staff/OrderQueue'
import EndRequestQueue from '../staff/EndRequestQueue'

export default function LiveTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>END REQUESTS</p>
        <EndRequestQueue staffName="Admin" />
      </div>
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>LIVE TABLES</p>
        <LiveTablesView />
      </div>
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>ACTIVE ORDERS</p>
        <OrderQueue />
      </div>
    </div>
  )
}
