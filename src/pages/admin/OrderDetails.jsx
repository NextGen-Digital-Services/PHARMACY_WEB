import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import { ORDER_STAGES } from '../../utils/statusStages';
import StatusBadge from '../../components/admin/StatusBadge';
import formatCurrency from '../../utils/formatCurrency';
import { ArrowLeft, User, Truck, CreditCard, ClipboardList } from 'lucide-react';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { orders, updateOrderStatus, updateOrderPaymentStatus } = useContext(AdminDataContext);

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div style={styles.notFound}>
        <h3>Order Reference Not Found</h3>
        <p>The order ID {orderId} was not found in our database logs.</p>
        <Link to="/admin/orders" className="btn btn-secondary">
          Back to Order List
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header Back button */}
      <div>
        <Link to="/admin/orders" style={styles.backBtn}>
          <ArrowLeft size={14} />
          <span>Back to Order Database</span>
        </Link>
      </div>

      <div style={styles.layout}>
        {/* Left Column: Order content details */}
        <div style={styles.mainCol}>
          {/* Order Header info */}
          <div className="apothecary-card" style={styles.headerCard}>
            <div style={styles.headerRow}>
              <div>
                <span className="text-mono" style={styles.monoLabel}>Fulfillment Record</span>
                <h3 style={styles.orderIdTitle}>{order.id}</h3>
              </div>
              <div style={styles.headerBadges}>
                <StatusBadge status={order.orderStatus} />
                <StatusBadge status={order.paymentStatus} />
              </div>
            </div>
            <div style={styles.divider} />
            <span style={styles.placedDate}>
              Placed on {new Date(order.placedDate).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          {/* Formulations list */}
          <div className="apothecary-card" style={styles.card}>
            <h4 style={styles.sectionTitle}>Prescription Formulations</h4>
            <div style={styles.divider} />

            <div style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <div key={idx} style={styles.itemRow}>
                  <img src={item.image} alt={item.name} style={styles.itemImg} />
                  <div style={styles.itemInfo}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span className="text-mono" style={styles.itemDosage}>
                      {item.dosage} · Qty: {item.quantity} · Unit Price: {formatCurrency(item.price)}
                    </span>
                  </div>
                  <span className="price-mono" style={styles.itemPrice}>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.divider} />

            <div style={styles.calcBlock}>
              <div style={styles.calcRow}>
                <span>Subtotal:</span>
                <span className="text-mono">{formatCurrency(order.total - (order.paymentMethod === 'COD' ? 40 : 0))}</span>
              </div>
              {order.paymentMethod === 'COD' && (
                <div style={styles.calcRow}>
                  <span>COD Handling Charge:</span>
                  <span className="text-mono">{formatCurrency(40)}</span>
                </div>
              )}
              <div style={{ ...styles.calcRow, fontWeight: 'bold', borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '8px' }}>
                <span>Grand Total:</span>
                <span className="price-mono" style={{ fontSize: '16px' }}>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Address, Quick controls */}
        <div style={styles.sidebarCol}>
          {/* Quick controls */}
          <div className="apothecary-card" style={styles.card}>
            <h4 style={styles.sectionTitle}>Fulfillment Action Controls</h4>
            <div style={styles.divider} />

            <div style={styles.controlGroup}>
              <label className="form-label">Set Order Status</label>
              <select
                value={order.orderStatus}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="form-select"
                style={{ marginBottom: '16px' }}
              >
                {ORDER_STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
                <option value="Cancelled">Cancelled</option>
              </select>

              <label className="form-label">Set Payment Status</label>
              <select
                value={order.paymentStatus}
                onChange={(e) => updateOrderPaymentStatus(order.id, e.target.value)}
                className="form-select"
              >
                <option value="Paid">Paid / Reconciled</option>
                <option value="Pending">Payment Pending</option>
                <option value="Failed">Failed / Declined</option>
              </select>
            </div>
            
            <div style={styles.trackingStrip}>
              <span className="text-mono" style={styles.trackLabel}>SHIPMENT LOG:</span>
              <span className="text-mono" style={styles.trackVal}>{order.trackingNumber || 'Pending'}</span>
            </div>
          </div>

          {/* Delivery coordinates */}
          <div className="apothecary-card" style={styles.card}>
            <h4 style={styles.sectionTitle}>Delivery Coordinates</h4>
            <div style={styles.divider} />

            <div style={styles.infoRow}>
              <User size={16} color="var(--color-teal-700)" />
              <div>
                <strong>{order.customerName}</strong>
                <span style={styles.emailSub}>{order.customerEmail}</span>
              </div>
            </div>

            <div style={{ ...styles.infoRow, marginTop: '16px' }}>
              <Truck size={16} color="var(--color-teal-700)" />
              <p style={styles.sidebarText}>
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                Pincode: <span className="text-mono">{order.shippingAddress.pincode}</span><br />
                Phone: <span className="text-mono">{order.shippingAddress.phone}</span>
              </p>
            </div>

            <div style={{ ...styles.infoRow, marginTop: '16px' }}>
              <CreditCard size={16} color="var(--color-teal-700)" />
              <p style={styles.sidebarText}>
                Payment Mode: <strong>{order.paymentMethod}</strong>
              </p>
            </div>
          </div>
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
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    textDecoration: 'none',
    fontWeight: 'var(--font-weight-medium)'
  },
  layout: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  mainCol: {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sidebarCol: {
    flex: '1 1 300px',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  headerCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    borderLeft: '4px solid var(--color-teal-700)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  monoLabel: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.7,
    display: 'block'
  },
  orderIdTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '22px',
    color: 'var(--color-teal-900)'
  },
  headerBadges: {
    display: 'flex',
    gap: '8px'
  },
  placedDate: {
    fontSize: '13px',
    color: 'var(--color-charcoal)'
  },
  card: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 16px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px'
  },
  itemImg: {
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    flexShrink: 0
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  itemName: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  itemDosage: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  itemPrice: {
    fontSize: '14px'
  },
  calcBlock: {
    backgroundColor: 'var(--color-mist-50)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    padding: '16px',
    fontSize: '13px'
  },
  calcRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    color: 'var(--color-charcoal)'
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  trackingStrip: {
    marginTop: '20px',
    backgroundColor: 'var(--color-sage-100)',
    border: '1px solid var(--color-border)',
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px'
  },
  trackLabel: {
    fontWeight: 'bold',
    color: 'var(--color-teal-900)'
  },
  trackVal: {
    color: 'var(--color-amber-600)',
    fontWeight: 'bold'
  },
  infoRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start'
  },
  emailSub: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8,
    marginTop: '2px'
  },
  sidebarText: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.4
  },
  notFound: {
    padding: '48px',
    textAlign: 'center',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)'
  }
};
