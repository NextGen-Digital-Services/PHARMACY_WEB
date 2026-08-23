import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import OrderTrackingTimeline from '../../components/account/OrderTrackingTimeline';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import formatCurrency from '../../utils/formatCurrency';
import EmptyState from '../../components/common/EmptyState';
import { PackageOpen, ArrowLeft, ClipboardList } from 'lucide-react';

export default function OrderTracking() {
  const { orderId } = useParams();
  const { orders } = useContext(AdminDataContext);

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <EmptyState
          icon={PackageOpen}
          title="Order Reference Not Found"
          message="We couldn't locate any transaction matching this tracking reference. Check your order reference and try again."
          actionLink="/account/orders"
          actionText="Back to Order History"
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <Breadcrumbs 
        paths={[
          { name: 'Account Dashboard', url: '/account' },
          { name: 'Order History', url: '/account/orders' },
          { name: `Track ${orderId}`, url: `/account/orders/${orderId}/track` }
        ]} 
      />

      <div style={styles.header}>
        <Link to="/account/orders" style={styles.backLink}>
          <ArrowLeft size={14} />
          <span>Back to History</span>
        </Link>
        <div style={styles.titleBlock}>
          <h1 style={styles.title}>Track Formulation: <span className="text-mono" style={styles.orderId}>{orderId}</span></h1>
          <span className="prescription-tag text-mono" style={styles.trackingNo}>
            TRACKING NO: {order.trackingNumber || 'Pending Confirmation'}
          </span>
        </div>
        <p style={styles.subtitle}>
          Placed on <strong>{new Date(order.placedDate).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</strong>
        </p>
      </div>

      {/* Stepper Timeline Card */}
      <div className="apothecary-card" style={styles.timelineCard}>
        <h3 style={styles.sectionTitle}>Real-time Dispatch Progress</h3>
        <div style={styles.divider} />
        <OrderTrackingTimeline currentStatus={order.orderStatus} />
      </div>

      <div style={styles.detailsGrid}>
        {/* Items List */}
        <div className="apothecary-card" style={{ ...styles.card, flex: '1 1 500px' }}>
          <h3 style={styles.sectionTitle}>Formulated Prescriptions</h3>
          <div style={styles.divider} />
          
          <div style={styles.itemsList}>
            {order.items.map((item, idx) => (
              <div key={idx} style={styles.itemRow}>
                <img src={item.image} alt={item.name} style={styles.itemImg} />
                <div style={styles.itemInfo}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span className="text-mono" style={styles.itemDosage}>
                    {item.dosage} · Quantity: {item.quantity}
                  </span>
                </div>
                <span className="price-mono" style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={styles.calcBlock}>
            <div style={styles.calcRow}>
              <span>Subtotal Cost:</span>
              <span className="text-mono">{formatCurrency(order.total - (order.paymentMethod === 'COD' ? 40 : 0))}</span>
            </div>
            {order.paymentMethod === 'COD' && (
              <div style={styles.calcRow}>
                <span>COD Handling Surcharge:</span>
                <span className="text-mono">{formatCurrency(40)}</span>
              </div>
            )}
            <div style={{ ...styles.calcRow, fontWeight: 'bold', borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '8px' }}>
              <span>Grand Total Paid:</span>
              <span className="price-mono" style={{ fontSize: '16px' }}>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping details */}
        <div className="apothecary-card" style={{ ...styles.card, flex: '1 1 300px' }}>
          <h3 style={styles.sectionTitle}>Delivery Destination</h3>
          <div style={styles.divider} />
          
          <p style={styles.shippingText}>
            <strong>Recipient:</strong> {order.customerName}<br />
            <strong>Street:</strong> {order.shippingAddress.street}<br />
            <strong>City/State:</strong> {order.shippingAddress.city}, {order.shippingAddress.state}<br />
            <strong>Pincode:</strong> <span className="text-mono">{order.shippingAddress.pincode}</span><br />
            <strong>Phone Contact:</strong> <span className="text-mono">{order.shippingAddress.phone}</span>
          </p>

          <div style={styles.divider} />

          <h3 style={styles.sectionTitle}>Payment Details</h3>
          <div style={styles.divider} />

          <p style={styles.shippingText}>
            <strong>Gateway Mode:</strong> {order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : order.paymentMethod}<br />
            <strong>Reconciliation Status:</strong> {order.paymentStatus === 'Paid' ? 'Paid / Settled' : (order.paymentStatus === 'Failed' ? 'Failed' : 'Payment Pending')}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '32px',
    marginTop: '16px'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    textDecoration: 'none',
    marginBottom: '16px',
    fontWeight: 'var(--font-weight-medium)'
  },
  titleBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '30px',
    color: 'var(--color-ink)'
  },
  orderId: {
    color: 'var(--color-teal-700)'
  },
  trackingNo: {
    backgroundColor: 'var(--color-amber-100)',
    borderColor: 'var(--color-amber-600)',
    color: 'var(--color-amber-600)',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    marginTop: '8px'
  },
  timelineCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    marginBottom: '32px',
    '--notch-bg': 'var(--color-mist-50)'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 16px'
  },
  detailsGrid: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  card: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
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
  shippingText: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.5
  }
};
