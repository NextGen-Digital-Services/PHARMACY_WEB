import React, { useContext, useEffect, useState } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import { ORDER_STAGES } from '../../utils/statusStages';
import StatusBadge from '../../components/admin/StatusBadge';
import { Truck, Info, RefreshCw } from 'lucide-react';

export default function TrackingManagement() {
  const { orders, updateOrderTracking } = useContext(AdminDataContext);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editForm, setEditForm] = useState({ stage: '', trackingNo: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter orders: show active ones first (i.e. non-delivered, non-cancelled)
  const activeOrders = orders.filter(o => 
    o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled'
  );

  const handleStartEdit = (o) => {
    setEditingOrderId(o.id);
    setEditForm({
      stage: o.orderStatus,
      trackingNo: o.trackingNumber === 'Pending' ? '' : o.trackingNumber
    });
  };

  const handleSaveEdit = (id) => {
    const finalTracking = editForm.trackingNo.trim() || 'Pending';
    updateOrderTracking(id, editForm.stage, finalTracking);
    setEditingOrderId(null);
  };

  return (
    <div style={styles.container}>
      {/* Header Info */}
      <div style={styles.headerInfo}>
        Manage molecular formulation batches, packaging pipelines, and delivery dispatches.
      </div>

      {/* Active Orders List */}
      <div className="apothecary-card" style={styles.tableCard}>
        <div style={styles.header}>
          <h3 style={styles.title}>Active Fulfillment Queue ({activeOrders.length} orders)</h3>
        </div>
        <div style={styles.divider} />

        <div style={styles.tableWrapper}>
          {activeOrders.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Fulfillment Stage</th>
                  <th style={styles.th}>Tracking Code</th>
                  <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeOrders.map((o) => {
                  const isEditing = editingOrderId === o.id;

                  return (
                    <tr key={o.id} style={styles.tr}>
                      <td style={styles.td} className="text-mono" style={{ fontWeight: 'bold' }}>
                        {o.id}
                      </td>
                      <td style={styles.td}>
                        <strong>{o.customerName}</strong>
                      </td>
                      <td style={styles.td}>
                        {isEditing ? (
                          <select
                            value={editForm.stage}
                            onChange={(e) => setEditForm({ ...editForm, stage: e.target.value })}
                            className="form-select"
                            style={styles.inlineSelect}
                          >
                            {ORDER_STAGES.map(stage => (
                              <option key={stage} value={stage}>{stage}</option>
                            ))}
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <StatusBadge status={o.orderStatus} />
                        )}
                      </td>
                      <td style={styles.td}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.trackingNo}
                            onChange={(e) => setEditForm({ ...editForm, trackingNo: e.target.value })}
                            placeholder="TRK-VD-#####"
                            className="form-input text-mono"
                            style={styles.inlineInput}
                          />
                        ) : (
                          <span className="text-mono" style={styles.trackCode}>
                            {o.trackingNumber}
                          </span>
                        )}
                      </td>
                      <td style={styles.td} style={{ textAlign: 'right' }}>
                        {isEditing ? (
                          <div style={styles.actions}>
                            <button
                              onClick={() => handleSaveEdit(o.id)}
                              className="prescription-tag text-mono"
                              style={{ ...styles.actionBtn, color: 'var(--color-teal-700)', borderColor: 'var(--color-teal-700)' }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingOrderId(null)}
                              className="prescription-tag text-mono"
                              style={{ ...styles.actionBtn, color: 'var(--color-charcoal)', borderColor: 'var(--color-border)' }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(o)}
                            className="prescription-tag text-mono"
                            style={{ ...styles.actionBtn, color: 'var(--color-teal-700)', borderColor: 'var(--color-teal-500)' }}
                          >
                            Update Progress
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={styles.empty}>
              <Info size={36} color="var(--color-border)" style={{ marginBottom: '12px' }} />
              <h4>All dispatches fully delivered</h4>
              <p>Fulfillment queue is empty. Return to the dashboard to monitor orders.</p>
            </div>
          )}
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
  title: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
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
  trackCode: {
    fontSize: '12px',
    color: 'var(--color-charcoal)'
  },
  inlineSelect: {
    padding: '6px',
    fontSize: '12px',
    borderRadius: '2px',
    border: '1px solid var(--color-border)',
    outline: 'none',
    backgroundColor: 'var(--color-white)'
  },
  inlineInput: {
    padding: '6px 10px',
    fontSize: '12px',
    width: '140px',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  actions: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'flex-end'
  },
  actionBtn: {
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    backgroundColor: 'var(--color-white)'
  },
  empty: {
    padding: '48px',
    textAlign: 'center',
    color: 'var(--color-charcoal)'
  }
};
