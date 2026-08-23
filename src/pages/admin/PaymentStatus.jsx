import React, { useContext, useEffect } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import StatusBadge from '../../components/admin/StatusBadge';
import formatCurrency from '../../utils/formatCurrency';
import { CreditCard, DollarSign } from 'lucide-react';

export default function PaymentStatus() {
  const { orders, updateOrderPaymentStatus } = useContext(AdminDataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header Info */}
      <div style={styles.headerInfo}>
        Reconcile online transaction settlements, cash collections, and credit limits.
      </div>

      {/* Table */}
      <div className="apothecary-card" style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Reconciliation Date</th>
                <th style={styles.th}>Customer Profile</th>
                <th style={styles.th}>Settlement Mode</th>
                <th style={styles.th}>Transaction Total</th>
                <th style={styles.th}>Payment Status</th>
                <th style={styles.th} style={{ textAlign: 'right' }}>Reconcile Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={styles.tr}>
                  <td style={styles.td} className="text-mono" style={{ fontWeight: 'bold' }}>
                    {o.id}
                  </td>
                  <td style={styles.td}>
                    {new Date(o.placedDate).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td style={styles.td}>
                    <strong>{o.customerName}</strong>
                  </td>
                  <td style={styles.td} className="text-mono" style={{ fontSize: '12px' }}>
                    {o.paymentMethod}
                  </td>
                  <td style={styles.td} className="price-mono">
                    {formatCurrency(o.total)}
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={o.paymentStatus} />
                  </td>
                  <td style={styles.td} style={{ textAlign: 'right' }}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => updateOrderPaymentStatus(o.id, 'Paid')}
                        disabled={o.paymentStatus === 'Paid'}
                        className="prescription-tag text-mono"
                        style={{
                          ...styles.actionBtn,
                          color: o.paymentStatus === 'Paid' ? 'var(--color-charcoal)' : 'var(--color-teal-700)',
                          borderColor: o.paymentStatus === 'Paid' ? 'var(--color-border)' : 'var(--color-teal-500)',
                          cursor: o.paymentStatus === 'Paid' ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Mark Paid
                      </button>
                      <button
                        onClick={() => updateOrderPaymentStatus(o.id, 'Failed')}
                        disabled={o.paymentStatus === 'Failed'}
                        className="prescription-tag text-mono"
                        style={{
                          ...styles.actionBtn,
                          color: o.paymentStatus === 'Failed' ? 'var(--color-charcoal)' : 'var(--color-danger)',
                          borderColor: o.paymentStatus === 'Failed' ? 'var(--color-border)' : 'var(--color-danger)',
                          cursor: o.paymentStatus === 'Failed' ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Mark Failed
                      </button>
                    </div>
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
    gap: '20px',
    width: '100%'
  },
  headerInfo: {
    fontSize: '14px',
    color: 'var(--color-charcoal)'
  },
  tableCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    textAlign: 'left'
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
  actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  actionBtn: {
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '2px',
    border: '1px solid',
    backgroundColor: 'var(--color-white)'
  }
};
