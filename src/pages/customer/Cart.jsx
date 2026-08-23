import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartLineItem from '../../components/cart/CartLineItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyCartState from '../../components/cart/EmptyCartState';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function Cart() {
  const { cart, cartCount } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <Breadcrumbs paths={[{ name: 'Shopping Cart', url: '/cart' }]} />

      <div style={styles.header}>
        <span className="text-mono" style={styles.eyebrow}>YOUR BAG</span>
        <h1 style={styles.title}>Prescription Cart</h1>
        {cartCount > 0 && (
          <p style={styles.subtitle}>
            You have <strong className="text-mono" style={{ color: 'var(--color-teal-700)' }}>{cartCount}</strong> item{cartCount !== 1 && 's'} in your checkout queue.
          </p>
        )}
      </div>

      {cart.length > 0 ? (
        <div style={styles.layout}>
          {/* List panel */}
          <div style={styles.listCol}>
            {cart.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}

            <div style={styles.continueShoppingBlock}>
              <Link to="/shop" style={styles.continueLink}>
                ← Continue Browsing Formulations
              </Link>
            </div>
          </div>

          {/* Summary Panel */}
          <div style={styles.summaryCol}>
            <CartSummary showCheckoutBtn={true} />
          </div>
        </div>
      ) : (
        <EmptyCartState />
      )}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '32px',
    marginTop: '16px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    display: 'block',
    marginBottom: '8px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    color: 'var(--color-ink)',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--color-charcoal)'
  },
  layout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  listCol: {
    flex: '1 1 600px'
  },
  summaryCol: {
    flex: '1 1 350px',
    position: 'sticky',
    top: '100px'
  },
  continueShoppingBlock: {
    marginTop: '24px',
    padding: '0 8px'
  },
  continueLink: {
    fontSize: '14px',
    color: 'var(--color-teal-700)',
    fontWeight: 'var(--font-weight-semibold)',
    transition: 'color 0.15s ease'
  }
};
