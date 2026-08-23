import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 10, disabled = false }) {
  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="prescription-tag quantity-selector" style={styles.container}>
      <button 
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min || disabled}
        style={{ ...styles.btn, opacity: quantity <= min || disabled ? 0.4 : 1 }}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="text-mono" style={styles.val}>{quantity}</span>
      <button 
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max || disabled}
        style={{ ...styles.btn, opacity: quantity >= max || disabled ? 0.4 : 1 }}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 12px',
    userSelect: 'none'
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-ink)',
    padding: '2px',
    transition: 'opacity 0.15s ease'
  },
  val: {
    fontWeight: 'var(--font-weight-bold)',
    fontSize: '14px',
    minWidth: '18px',
    textAlign: 'center'
  }
};
