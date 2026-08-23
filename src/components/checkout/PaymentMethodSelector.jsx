import React, { useState } from 'react';
import { CreditCard, Smartphone, Truck, ChevronLeft } from 'lucide-react';
import Button from '../common/Button';

export default function PaymentMethodSelector({ paymentMethod, setPaymentMethod, onNext, onBack }) {
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'Card') {
      if (cardData.number.length >= 16 && cardData.expiry.length >= 4 && cardData.cvv.length >= 3) {
        onNext();
      } else {
        alert("Please enter a valid credit card profile.");
      }
    } else if (paymentMethod === 'UPI') {
      if (upiId.includes('@')) {
        onNext();
      } else {
        alert("Please enter a valid UPI ID (e.g. user@bank).");
      }
    } else {
      // COD
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="apothecary-card" style={styles.card}>
      <h3 style={styles.title}>2. Secure Payment Gateway Selector</h3>
      <div style={styles.divider} />

      {/* Methods Radio Selector */}
      <div style={styles.selectorGroup}>
        {/* Card */}
        <label 
          style={{
            ...styles.labelBlock,
            borderColor: paymentMethod === 'Card' ? 'var(--color-teal-700)' : 'var(--color-border)',
            backgroundColor: paymentMethod === 'Card' ? 'var(--color-sage-100)' : 'transparent'
          }}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'Card'}
            onChange={() => setPaymentMethod('Card')}
            style={styles.radio}
          />
          <CreditCard size={18} color="var(--color-teal-700)" />
          <div style={styles.labelInfo}>
            <span style={styles.labelText}>Credit / Debit Card</span>
            <span style={styles.labelSub}>Pay securely via Visa, Mastercard, RuPay</span>
          </div>
        </label>

        {/* UPI */}
        <label 
          style={{
            ...styles.labelBlock,
            borderColor: paymentMethod === 'UPI' ? 'var(--color-teal-700)' : 'var(--color-border)',
            backgroundColor: paymentMethod === 'UPI' ? 'var(--color-sage-100)' : 'transparent'
          }}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'UPI'}
            onChange={() => setPaymentMethod('UPI')}
            style={styles.radio}
          />
          <Smartphone size={18} color="var(--color-teal-700)" />
          <div style={styles.labelInfo}>
            <span style={styles.labelText}>Instant UPI Payment</span>
            <span style={styles.labelSub}>Pay via GooglePay, PhonePe, Paytm QR</span>
          </div>
        </label>

        {/* COD */}
        <label 
          style={{
            ...styles.labelBlock,
            borderColor: paymentMethod === 'COD' ? 'var(--color-teal-700)' : 'var(--color-border)',
            backgroundColor: paymentMethod === 'COD' ? 'var(--color-sage-100)' : 'transparent'
          }}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'COD'}
            onChange={() => setPaymentMethod('COD')}
            style={styles.radio}
          />
          <Truck size={18} color="var(--color-teal-700)" />
          <div style={styles.labelInfo}>
            <span style={styles.labelText}>Cash on Delivery (COD)</span>
            <span style={styles.labelSub}>Pay with cash/digital scan upon delivery (+₹40 charge)</span>
          </div>
        </label>
      </div>

      {/* Conditional Inputs */}
      {paymentMethod === 'Card' && (
        <div style={styles.fieldsBlock}>
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              placeholder="4532 7182 9901 2345"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              className="form-input text-mono"
              maxLength="19"
              required
            />
          </div>
          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                className="form-input text-mono"
                maxLength="5"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">CVV Code</label>
              <input
                type="password"
                placeholder="***"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                className="form-input text-mono"
                maxLength="4"
                required
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'UPI' && (
        <div style={styles.fieldsBlock}>
          <div className="form-group">
            <label className="form-label">UPI ID / VPA</label>
            <input
              type="text"
              placeholder="username@ybl"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="form-input text-mono"
              required
            />
          </div>
        </div>
      )}

      {paymentMethod === 'COD' && (
        <div style={styles.codBox}>
          <p>Please note: Cash on Delivery orders carry a processing charge of ₹40. Total order values are rounded to the nearest integer. Ensure you have cash or a dynamic QR scanner ready at delivery.</p>
        </div>
      )}

      {/* Navigation actions */}
      <div style={styles.btnRow}>
        <button type="button" onClick={onBack} style={styles.backBtn}>
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
        <Button type="submit" variant="secondary" style={styles.nextBtn}>
          Continue to Final Review
        </Button>
      </div>
    </form>
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
    margin: '12px 0 24px'
  },
  selectorGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '24px'
  },
  labelBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 20px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  radio: {
    accentColor: 'var(--color-teal-700)'
  },
  labelInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  labelText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  labelSub: {
    fontSize: '12px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  fieldsBlock: {
    padding: '20px',
    backgroundColor: 'var(--color-mist-50)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    marginBottom: '24px'
  },
  row: {
    display: 'flex',
    gap: '16px'
  },
  codBox: {
    backgroundColor: 'var(--color-amber-100)',
    borderLeft: '4px solid var(--color-amber-600)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    marginBottom: '24px',
    lineHeight: 1.5
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
  nextBtn: {
    width: '100%',
    maxWidth: '220px'
  }
};
