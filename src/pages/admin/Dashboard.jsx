import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import StatCard from '../../components/admin/StatCard';
import MiniChart from '../../components/admin/MiniChart';
import StatusBadge from '../../components/admin/StatusBadge';
import formatCurrency from '../../utils/formatCurrency';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  FileText, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { orders, customers, products } = useContext(AdminDataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute metrics
  const totalOrders = orders.length;
  
  // Calculate total revenue from PAID orders only
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.total, 0);

  const totalCustomers = customers.length;
  const totalProducts = products.length;

  // Get recent 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.placedDate) - new Date(a.placedDate))
    .slice(0, 5);

  return (
    <div style={styles.container}>
      {/* Welcome Banner */}
      <div className="apothecary-card" style={styles.welcomeCard}>
        <div style={styles.welcomeInfo}>
          <TrendingUp size={24} color="var(--color-amber-600)" />
          <div>
            <h3 style={styles.welcomeTitle}>Apothecary System Online</h3>
            <p style={styles.welcomeSub}>Batch processing queues and fulfillment routing are functioning normally.</p>
          </div>
        </div>
        <span className="text-mono" style={styles.systemBadge}>SERVER STATUS: CLIENT-SIDE DEMO</span>
      </div>

      {/* Metrics Row */}
      <div style={styles.metricsRow}>
        <StatCard
          title="Fulfillment Orders"
          value={totalOrders}
          icon={FileText}
          color="var(--color-teal-700)"
        />
        <StatCard
          title="Reconciled Revenue"
          value={totalRevenue}
          prefix="₹"
          icon={DollarSign}
          color="var(--color-amber-600)"
        />
        <StatCard
          title="Patient Database"
          value={totalCustomers}
          icon={Users}
          color="var(--color-teal-500)"
        />
        <StatCard
          title="Formulation Catalog"
          value={totalProducts}
          icon={ShoppingBag}
          color="var(--color-ink)"
        />
      </div>

      {/* Middle Row: Trend Chart + Quick Stats */}
      <div style={styles.middleRow}>
        <div style={styles.chartCol}>
          <MiniChart />
        </div>
        <div style={styles.quickCol}>
          <div className="apothecary-card" style={styles.summaryCard}>
            <h4 style={styles.summaryTitle}>Fulfillment Statuses</h4>
            <div style={styles.summaryDivider} />
            <div style={styles.summaryRow}>
              <span>Awaiting Packaging:</span>
              <strong className="text-mono" style={{ color: 'var(--color-amber-600)' }}>
                {orders.filter(o => o.orderStatus === 'Order Placed' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Packed').length}
              </strong>
            </div>
            <div style={styles.summaryRow}>
              <span>In Transit (Shipped/Out):</span>
              <strong className="text-mono" style={{ color: 'var(--color-teal-700)' }}>
                {orders.filter(o => o.orderStatus === 'Shipped' || o.orderStatus === 'Out for Delivery').length}
              </strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Completed Deliveries:</span>
              <strong className="text-mono" style={{ color: 'var(--color-teal-500)' }}>
                {orders.filter(o => o.orderStatus === 'Delivered').length}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="apothecary-card" style={styles.recentCard}>
        <div style={styles.recentHeader}>
          <h3 style={styles.recentTitle}>Recent Dispatch Orders</h3>
          <Link to="/admin/orders" style={styles.viewLink}>
            <span>View All Orders</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div style={styles.divider} />

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Placed Date</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Total Revenue</th>
                <th style={styles.th}>Payment</th>
                <th style={styles.th}>Order Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} style={styles.tr}>
                  <td style={styles.td} className="text-mono">
                    <Link to={`/admin/orders/${o.id}`} style={styles.orderLink}>
                      {o.id}
                    </Link>
                  </td>
                  <td style={styles.td}>
                    {new Date(o.placedDate).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td style={styles.td}>{o.customerName}</td>
                  <td style={styles.td} className="price-mono">
                    {formatCurrency(o.total)}
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={o.paymentStatus} />
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={o.orderStatus} />
                  </td>
                  <td style={styles.td}>
                    <Link to={`/admin/orders/${o.id}`} className="prescription-tag text-mono" style={styles.manageBtn}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%'
  },
  welcomeCard: {
    padding: '16px 24px',
    backgroundColor: 'var(--color-white)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    borderLeft: '4px solid var(--color-amber-600)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  welcomeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  welcomeTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  welcomeSub: {
    fontSize: '12px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  systemBadge: {
    fontSize: '10px',
    backgroundColor: 'var(--color-sage-100)',
    color: 'var(--color-teal-700)',
    padding: '4px 8px',
    border: '1px solid var(--color-teal-500)',
    borderRadius: '2px',
    fontWeight: 'bold'
  },
  metricsRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  middleRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  chartCol: {
    flex: '1 1 500px'
  },
  quickCol: {
    flex: '1 1 200px',
    maxWidth: '300px'
  },
  summaryCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    height: '270px',
    display: 'flex',
    flexDirection: 'column',
    '--notch-bg': 'var(--color-mist-50)'
  },
  summaryTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-mist-50)',
    color: 'var(--color-charcoal)',
    ':last-of-type': {
      borderBottom: 'none'
    }
  },
  recentCard: {
    padding: '28px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  recentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  recentTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  viewLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-teal-700)',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 20px'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13px'
  },
  th: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-ink)',
    fontWeight: 'bold',
    backgroundColor: 'var(--color-mist-50)'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-charcoal)',
    verticalAlign: 'middle'
  },
  tr: {
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.01)'
    }
  },
  orderLink: {
    fontWeight: 'bold',
    color: 'var(--color-teal-700)',
    textDecoration: 'none'
  },
  manageBtn: {
    cursor: 'pointer',
    padding: '4px 10px',
    fontSize: '11px',
    backgroundColor: 'var(--color-mist-50)',
    color: 'var(--color-teal-700)',
    border: '1px solid var(--color-border)',
    borderRadius: '2px',
    textDecoration: 'none'
  }
};
