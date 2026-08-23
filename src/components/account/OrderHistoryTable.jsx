import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Truck } from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency';
import Badge from '../common/Badge';

export default function OrderHistoryTable({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No orders registered to this customer account yet.</p>
        <Link to="/shop" className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>
          Browse Formulations
        </Link>
      </div>
    );
  }

  const getStatusType = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'amber';
    }
  };

  return (
    <div className="apothecary-card" style={styles.card}>
      <h3 style={styles.title}>Your Order History</h3>
      <div style={styles.divider} />

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Placed Date</th>
              <th style={styles.th}>Items Count</th>
              <th style={styles.th}>Grand Total</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Order Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={styles.tr}>
                <td style={styles.td} className="text-mono">
                  <Link to={`/account/orders/${o.id}/track`} style={styles.orderIdLink}>
                    {o.id}
                  </Link>
                </td>
                <td style={styles.td}>
                  {new Date(o.placedDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td style={styles.td} className="text-mono">
                  {o.items.reduce((sum, item) => sum + item.quantity, 0)} items
                </td>
                <td style={styles.td} className="price-mono">
                  {formatCurrency(o.total)}
                </td>
                <td style={styles.td}>
                  <Badge 
                    text={o.paymentStatus} 
                    type={o.paymentStatus === 'Paid' ? 'success' : (o.paymentStatus === 'Failed' ? 'danger' : 'amber')} 
                  />
                </td>
                <td style={styles.td}>
                  <Badge 
                    text={o.orderStatus} 
                    type={getStatusType(o.orderStatus)} 
                  />
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <Link 
                      to={`/account/orders/${o.id}/track`} 
                      style={styles.actionBtn}
                      title="Track shipment and items"
                    >
                      <Truck size={14} />
                      <span>Track</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '28px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 20px'
  },
  empty: {
    padding: '30px',
    textAlign: 'center',
    color: 'var(--color-charcoal)',
    border: '1px dashed var(--color-border)',
    borderRadius: 'var(--radius-sm)'
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
    padding: '12px',
    borderBottom: '1px solid var(--color-border)',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-mist-50)'
  },
  td: {
    padding: '14px 12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-charcoal)',
    verticalAlign: 'middle'
  },
  tr: {
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.01)'
    }
  },
  orderIdLink: {
    fontWeight: 'bold',
    color: 'var(--color-teal-700)',
    textDecoration: 'none'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--color-teal-700)',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};
