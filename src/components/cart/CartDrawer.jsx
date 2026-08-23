import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import CartLineItem from './CartLineItem';
import CartSummary from './CartSummary';
import EmptyCartState from './EmptyCartState';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, cartCount } = useContext(CartContext);

  // Prevent background scroll when cart drawer is active
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={styles.overlay}
          />

          {/* Cart Panel Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={styles.drawer}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerTitle}>
                <ShoppingBag size={20} color="var(--color-teal-700)" />
                <h3 style={styles.titleText}>Prescription Cart ({cartCount})</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                style={styles.closeBtn}
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content Area */}
            <div style={styles.content}>
              {cart.length > 0 ? (
                <>
                  {/* Items Scrollable List */}
                  <div style={styles.itemsList}>
                    {cart.map((item) => (
                      <CartLineItem key={item.id} item={item} />
                    ))}
                  </div>

                  {/* Footer Summary (Fixed at bottom) */}
                  <div style={styles.footer}>
                    <CartSummary showCheckoutBtn={true} />
                    <div style={styles.trustStrip}>
                      <ShieldCheck size={14} color="var(--color-teal-700)" />
                      <span style={styles.trustText}>Pharmacist Verified · Safe Checkout</span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.emptyContainer}>
                  <EmptyCartState />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 33, 29, 0.5)',
    backdropFilter: 'blur(1px)',
    zIndex: 999
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '460px',
    height: '100%',
    backgroundColor: 'var(--color-mist-50)',
    boxShadow: '-10px 0 30px rgba(14, 33, 29, 0.15)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--color-white)'
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  titleText: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  closeBtn: {
    color: 'var(--color-ink)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  itemsList: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px'
  },
  emptyContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  },
  footer: {
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-white)',
    boxShadow: '0 -4px 20px rgba(14, 33, 29, 0.03)'
  },
  trustStrip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px',
    backgroundColor: 'var(--color-sage-100)',
    fontSize: '11px',
    color: 'var(--color-teal-900)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-medium)'
  },
  trustText: {
    letterSpacing: '0.2px'
  }
};
