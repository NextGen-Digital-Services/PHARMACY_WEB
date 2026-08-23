import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import PromoCodeBox from './PromoCodeBox';

export default function CartSummary({ showCheckoutBtn = true, onCheckoutClick }) {
  const navigate = useNavigate();
  const { 
    cartCount, 
    cartSubtotal, 
    discountAmount, 
    shippingCharge, 
    cartTotal,
    appliedPromo,
    setIsCartOpen
  } = useContext(CartContext);

  const handleProceed = () => {
    setIsCartOpen(false); // Close drawer if open
    if (onCheckoutClick) {
      onCheckoutClick();
    } else {
      navigate('/checkout');
    }
  };

  if (cartCount === 0) return null;

  return (
    <div className="cart-summary-card apothecary-card" style={styles.container}>
      <h3 style={styles.title}>Prescription Order Summary</h3>
      <div style={styles.divider} />
      
      <div style={styles.row}>
        <span style={styles.label}>Total Items:</span>
        <span className="text-mono" style={styles.val}>{cartCount}</span>
      </div>
      
      <div style={styles.row}>
        <span style={styles.label}>Subtotal:</span>
        <span className="text-mono" style={styles.val}>{formatCurrency(cartSubtotal)}</span>
      </div>

      {discountAmount > 0 && (
        <div style={{ ...styles.row, color: 'var(--color-teal-700)' }}>
          <span style={styles.label}>Coupon Discount ({appliedPromo}):</span>
          <span className="text-mono" style={styles.val}>-{formatCurrency(discountAmount)}</span>
        </div>
      )}

      <div style={styles.row}>
        <span style={styles.label}>Shipping & Handling:</span>
        <span className="text-mono" style={{ ...styles.val, color: shippingCharge === 0 ? 'var(--color-teal-700)' : 'var(--color-ink)' }}>
          {shippingCharge === 0 ? 'FREE' : formatCurrency(shippingCharge)}
        </span>
      </div>

      {shippingCharge > 0 && (
        <div style={styles.shippingTip}>
          Add <strong>{formatCurrency(999 - cartSubtotal)}</strong> more to get <strong>FREE SHIPPING</strong>!
        </div>
      )}

      <div style={styles.divider} />
      
      <div style={{ ...styles.row, ...styles.totalRow }}>
        <span style={styles.totalLabel}>Estimated Total:</span>
        <span className="price-mono" style={styles.totalVal}>{formatCurrency(cartTotal)}</span>
      </div>

      <PromoCodeBox />

      {showCheckoutBtn && (
        <button 
          onClick={handleProceed} 
          className="btn btn-primary"
          style={styles.checkoutBtn}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    backgroundColor: 'var(--color-white)'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)',
    marginBottom: '12px'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    padding: '6px 0',
    color: 'var(--color-charcoal)'
  },
  label: {
    fontWeight: 'var(--font-weight-medium)'
  },
  val: {
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  shippingTip: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    backgroundColor: 'var(--color-amber-100)',
    padding: '6px 10px',
    borderRadius: 'var(--radius-sm)',
    marginTop: '6px',
    textAlign: 'center'
  },
  totalRow: {
    fontSize: '16px',
    padding: '8px 0',
    color: 'var(--color-ink)'
  },
  totalLabel: {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-bold)'
  },
  totalVal: {
    fontSize: '20px'
  },
  checkoutBtn: {
    width: '100%',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }
};
