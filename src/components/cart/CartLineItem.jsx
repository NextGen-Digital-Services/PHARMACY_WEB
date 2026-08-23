import React, { useContext } from 'react';
import { Trash2 } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import QuantitySelector from '../common/QuantitySelector';

export default function CartLineItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  if (!item) return null;

  return (
    <div className="cart-line-item apothecary-card" style={styles.container}>
      <img src={item.image} alt={item.name} style={styles.image} />
      
      <div style={styles.info}>
        <span className="text-mono" style={styles.dosage}>{item.dosage}</span>
        <h4 style={styles.name}>{item.name}</h4>
        
        <div style={styles.bottomRow}>
          <div style={styles.quantityBlock}>
            <QuantitySelector
              quantity={item.quantity}
              onChange={(newQty) => updateQuantity(item.id, newQty)}
              max={10}
            />
          </div>
          <div style={styles.priceBlock}>
            <span className="price-mono">{formatCurrency(item.price * item.quantity)}</span>
            {item.quantity > 1 && (
              <span className="text-mono" style={styles.unitPrice}>
                ({formatCurrency(item.price)} each)
              </span>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={() => removeFromCart(item.id)} 
        style={styles.removeBtn}
        title="Remove item"
        aria-label="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    marginBottom: '16px',
    position: 'relative',
    alignItems: 'center'
  },
  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)'
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  dosage: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  name: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)',
    lineHeight: 1.3,
    paddingRight: '20px'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  quantityBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  priceBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  unitPrice: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.6
  },
  removeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: 'var(--color-danger)',
    opacity: 0.8,
    transition: 'opacity 0.15s ease',
    padding: '4px'
  }
};
