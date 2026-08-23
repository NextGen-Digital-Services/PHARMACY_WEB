import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import QuantitySelector from '../common/QuantitySelector';

export default function StickyAddToCartBar({ product }) {
  const { addToCart } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 500px
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product || !product.inStock) return null;

  const handleAdd = () => {
    addToCart(product, qty);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={styles.container}
        >
          <div className="container" style={styles.inner}>
            {/* Thumbnail + Title */}
            <div style={styles.productBlock}>
              <img src={product.image} alt={product.name} style={styles.img} />
              <div style={styles.info}>
                <h4 style={styles.name}>{product.name}</h4>
                <span className="text-mono" style={styles.dosage}>{product.dosage}</span>
              </div>
            </div>

            {/* Actions Block */}
            <div style={styles.actions}>
              <div style={styles.priceBlock}>
                <span className="price-mono" style={styles.price}>{formatCurrency(product.price * qty)}</span>
              </div>

              <QuantitySelector quantity={qty} onChange={setQty} max={10} />

              <button onClick={handleAdd} className="btn btn-secondary" style={styles.btn}>
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80px',
    backgroundColor: 'var(--color-white)',
    borderTop: '1px solid var(--color-border)',
    boxShadow: '0 -10px 30px rgba(14, 33, 29, 0.1)',
    zIndex: 900,
    display: 'flex',
    alignItems: 'center'
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '24px'
  },
  productBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    overflow: 'hidden'
  },
  img: {
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    flexShrink: 0
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  name: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px'
  },
  dosage: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px'
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  price: {
    fontSize: '18px'
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 20px',
    whiteSpace: 'nowrap'
  }
};
