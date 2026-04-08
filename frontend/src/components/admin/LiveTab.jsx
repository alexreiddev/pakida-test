import LiveTablesView from '../staff/LiveTablesView'
import OrderQueue from '../staff/OrderQueue'
import EndRequestQueue from '../staff/EndRequestQueue'
import { usePendingEndRequests } from '../../hooks/useEndRequest'

export default function LiveTab() {
  const { requests, resolveRequest } = usePendingEndRequests()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>END REQUESTS</p>
        <EndRequestQueue staffName="Admin" requests={requests} resolveRequest={resolveRequest} />
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
