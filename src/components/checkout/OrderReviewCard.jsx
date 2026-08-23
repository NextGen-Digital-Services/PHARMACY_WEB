import React, { useContext } from 'react';
import { ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import Button from '../common/Button';

export default function OrderReviewCard({ address, paymentMethod, onSubmit, onBack, loading }) {
  const { cart, cartSubtotal, discountAmount, shippingCharge, cartTotal, appliedPromo } = useContext(CartContext);

  // If Cash on delivery, add ₹40 cod fee
  const codCharge = paymentMethod === 'COD' ? 40 : 0;
  const finalTotal = cartTotal + codCharge;

  return (
    <div className="apothecary-card" style={styles.card}>
      <h3 style={styles.title}>3. Final Prescription Order Review</h3>
      <div style={styles.divider} />

      {/* Review Summaries */}
      <div style={styles.summariesGrid}>
        {/* Shipping summary */}
        <div style={styles.summaryBox}>
          <div style={styles.boxHeader}>
            <Truck size={16} color="var(--color-teal-700)" />
            <h4 style={styles.boxTitle}>Shipping Address</h4>
          </div>
          <p style={styles.boxText}>
            <strong>{address.name}</strong><br />
            {address.street}<br />
            {address.city}, {address.state} - <span className="text-mono">{address.pincode}</span><br />
            Phone: <span className="text-mono">{address.phone}</span>
          </p>
        </div>

        {/* Payment summary */}
        <div style={styles.summaryBox}>
          <div style={styles.boxHeader}>
            <CreditCard size={16} color="var(--color-teal-700)" />
            <h4 style={styles.boxTitle}>Payment Mode</h4>
          </div>
          <p style={styles.boxText}>
            Method: <strong>{paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod}</strong><br />
            {paymentMethod === 'Card' && 'Charged securely via Credit/Debit card.'}
            {paymentMethod === 'UPI' && 'Settled via Instant UPI Virtual ID.'}
            {paymentMethod === 'COD' && 'Pay cash/UPI code upon delivery to the pharmacist courier.'}
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Item summary */}
      <h4 style={styles.sectionTitle}>Formulations in Queue ({cart.length})</h4>
      <div style={styles.itemsList}>
        {cart.map((item) => (
          <div key={item.id} style={styles.itemRow}>
            <div style={styles.itemLeft}>
              <img src={item.image} alt={item.name} style={styles.itemImg} />
              <div>
                <span style={styles.itemName}>{item.name}</span>
                <span className="text-mono" style={styles.itemDosage}>{item.dosage} × {item.quantity}</span>
              </div>
            </div>
            <span className="price-mono" style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div style={styles.divider} />

      {/* Cost summary table */}
      <div style={styles.calcBlock}>
        <div style={styles.calcRow}>
          <span>Cart Subtotal:</span>
          <span className="text-mono">{formatCurrency(cartSubtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div style={{ ...styles.calcRow, color: 'var(--color-teal-700)' }}>
            <span>Coupon Discount ({appliedPromo}):</span>
            <span className="text-mono">-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div style={styles.calcRow}>
          <span>Shipping Charges:</span>
          <span className="text-mono">{shippingCharge === 0 ? 'FREE' : formatCurrency(shippingCharge)}</span>
        </div>
        {codCharge > 0 && (
          <div style={styles.calcRow}>
            <span>Cash on Delivery handling charge:</span>
            <span className="text-mono">{formatCurrency(codCharge)}</span>
          </div>
        )}
        <div style={styles.totalDivider} />
        <div style={{ ...styles.calcRow, ...styles.totalRow }}>
          <span>Grand Total Payable:</span>
          <span className="price-mono" style={styles.totalPrice}>{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      <div style={styles.trustDisclaimer}>
        <ShieldCheck size={16} color="var(--color-teal-700)" />
        <span>By placing this order, you authorize the formulation of these prescriptions under certified care.</span>
      </div>

      {/* Button Row */}
      <div style={styles.btnRow}>
        <button type="button" onClick={onBack} disabled={loading} style={styles.backBtn}>
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
        <Button 
          onClick={() => onSubmit(finalTotal)}
          loading={loading}
          variant="primary"
          style={styles.payBtn}
        >
          {paymentMethod === 'COD' ? 'Confirm Order' : 'Authorize & Pay Now'}
        </Button>
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
  summariesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '8px'
  },
  summaryBox: {
    backgroundColor: 'var(--color-mist-50)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px'
  },
  boxHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  boxTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  boxText: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.4
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    marginBottom: '12px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    overflow: 'hidden'
  },
  itemImg: {
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  itemName: {
    fontSize: '13px',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-ink)',
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '350px'
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
    fontSize: '13px',
    color: 'var(--color-charcoal)'
  },
  calcRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0'
  },
  totalDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '8px 0'
  },
  totalRow: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    padding: '4px 0'
  },
  totalPrice: {
    fontSize: '18px'
  },
  trustDisclaimer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-sage-100)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '12px',
    color: 'var(--color-teal-900)',
    margin: '20px 0',
    lineHeight: 1.4
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    cursor: 'pointer',
    fontWeight: 'var(--font-weight-medium)'
  },
  payBtn: {
    width: '100%',
    maxWidth: '220px'
  }
};
