import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { AdminDataContext } from '../../context/AdminDataContext';
import formatCurrency from '../../utils/formatCurrency';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useContext(AdminDataContext);

  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ padding: '80px 24px', maxWidth: '650px', textAlign: 'center' }}>
      <div className="apothecary-card" style={styles.card}>
        {/* Success Icon */}
        <div style={styles.iconWrapper}>
          <CheckCircle size={44} color="var(--color-teal-700)" />
        </div>

        <span className="text-mono" style={styles.eyebrow}>DISPENSARY CONFIRMED</span>
        <h1 style={styles.title}>Your Formulation Order is Placed!</h1>
        
        <p style={styles.desc}>
          Thank you for choosing VitaDerm. Your order has been registered in our database and passed to our certified laboratory team for packing.
        </p>

        {/* Order Details Panel */}
        <div style={styles.detailsPanel}>
          <div style={styles.detailRow}>
            <span>Order Reference ID:</span>
            <span className="text-mono" style={styles.orderId}>{orderId}</span>
          </div>
          <div style={styles.detailRow}>
            <span>Estimated Dispatch:</span>
            <span style={styles.bold}>Within 24 Hours</span>
          </div>
          <div style={styles.detailRow}>
            <span>Estimated Delivery:</span>
            <span style={styles.bold}>2 - 3 Business Days</span>
          </div>
          {order && (
            <div style={styles.detailRow}>
              <span>Prescription Cost:</span>
              <span className="price-mono">{formatCurrency(order.total)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={styles.btnRow}>
          <Link to={`/account/orders/${orderId}/track`} className="btn btn-secondary" style={styles.btn}>
            <Truck size={16} />
            <span>Track Order Status</span>
          </Link>
          <Link to="/shop" className="btn btn-outline" style={styles.btn}>
            <ShoppingBag size={16} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '48px 32px',
    backgroundColor: 'var(--color-white)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '--notch-bg': 'var(--color-mist-50)'
  },
  iconWrapper: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    marginBottom: '8px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    color: 'var(--color-ink)',
    marginBottom: '16px',
    lineHeight: 1.2
  },
  desc: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.5,
    marginBottom: '32px',
    maxWidth: '500px'
  },
  detailsPanel: {
    backgroundColor: 'var(--color-mist-50)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '36px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    alignItems: 'center'
  },
  orderId: {
    fontWeight: 'bold',
    color: 'var(--color-teal-700)',
    fontSize: '14px'
  },
  bold: {
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  btnRow: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    flexWrap: 'wrap'
  },
  btn: {
    flex: '1 1 200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }
};
