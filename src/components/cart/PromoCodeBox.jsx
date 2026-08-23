import React, { useState, useContext } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

export default function PromoCodeBox() {
  const { appliedPromo, applyPromoCode, removePromoCode, promoDiscount } = useContext(CartContext);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState({ success: null, message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    const res = applyPromoCode(code);
    setFeedback({
      success: res.success,
      message: res.message
    });

    if (res.success) {
      setCode('');
    }
  };

  const handleClearFeedback = () => {
    setFeedback({ success: null, message: '' });
  };

  return (
    <div className="promo-code-container" style={styles.container}>
      {appliedPromo ? (
        <div style={styles.appliedBox}>
          <div style={styles.appliedInfo}>
            <Tag size={16} color="var(--color-teal-700)" />
            <span className="text-mono" style={styles.appliedText}>
              {appliedPromo} ({promoDiscount}% OFF)
            </span>
          </div>
          <button 
            onClick={() => {
              removePromoCode();
              handleClearFeedback();
            }} 
            style={styles.removeBtn}
            title="Remove coupon"
            aria-label="Remove coupon"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="input-group" style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Promo Code (VITA10)"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (feedback.message) handleClearFeedback();
              }}
              style={styles.input}
              className="text-mono"
            />
            <button type="submit" className="btn btn-secondary btn-sm" style={styles.submitBtn}>
              Apply
            </button>
          </div>
        </form>
      )}

      {feedback.message && (
        <div 
          style={{
            ...styles.feedback,
            color: feedback.success ? 'var(--color-teal-700)' : 'var(--color-danger)',
            backgroundColor: feedback.success ? 'var(--color-sage-100)' : '#FADBD8'
          }}
        >
          {feedback.success ? <Check size={14} style={{ marginRight: '4px' }} /> : <X size={14} style={{ marginRight: '4px' }} />}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    margin: '16px 0',
    width: '100%'
  },
  appliedBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--color-sage-100)',
    border: '1px dashed var(--color-teal-700)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px'
  },
  appliedInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  appliedText: {
    fontSize: '13px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-teal-900)'
  },
  removeBtn: {
    color: 'var(--color-charcoal)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  form: {
    width: '100%'
  },
  inputGroup: {
    display: 'flex',
    gap: '8px',
    width: '100%'
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '13px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    backgroundColor: 'var(--color-white)',
    textTransform: 'uppercase'
  },
  submitBtn: {
    whiteSpace: 'nowrap',
    padding: '8px 16px',
    borderRadius: 'var(--radius-sm)'
  },
  feedback: {
    marginTop: '8px',
    fontSize: '12px',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'var(--font-weight-medium)'
  }
};
