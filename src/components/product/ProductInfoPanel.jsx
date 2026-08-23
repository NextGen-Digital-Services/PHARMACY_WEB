import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Heart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import PriceTag from '../common/PriceTag';
import QuantitySelector from '../common/QuantitySelector';
import Badge from '../common/Badge';

export default function ProductInfoPanel({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    mrp,
    rating,
    reviewCount,
    shortDescription,
    inStock,
    dosage,
    sku,
    tags
  } = product;

  const formatCategoryName = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <div style={styles.container}>
      {/* Category + Stock Badge Row */}
      <div style={styles.badgeRow}>
        <span className="text-mono" style={styles.categoryLabel}>
          {formatCategoryName(category)}
        </span>
        <Badge 
          text={inStock ? "IN STOCK" : "OUT OF STOCK"} 
          type={inStock ? "success" : "danger"} 
        />
      </div>

      {/* Product Name */}
      <h1 style={styles.title}>{name}</h1>

      {/* Ratings and SKU Row */}
      <div style={styles.metaRow}>
        <div style={styles.ratingBox}>
          <Star size={16} fill="var(--color-amber-600)" stroke="var(--color-amber-600)" />
          <span className="text-mono" style={styles.ratingVal}>{rating}</span>
          <span style={styles.reviewCount}>({reviewCount} verified reviews)</span>
        </div>
        <span className="text-mono" style={styles.skuText}>SKU: {sku}</span>
      </div>

      {/* Price Block */}
      <div style={styles.priceSection}>
        <PriceTag price={price} mrp={mrp} />
        <span className="prescription-tag text-mono" style={styles.dosageBadge}>
          Dosage/Volume: {dosage}
        </span>
      </div>

      <div style={styles.divider} />

      {/* Description */}
      <p style={styles.description}>{shortDescription}</p>

      {/* Certifications Highlights */}
      <div style={styles.certStrip}>
        <div style={styles.certItem}>
          <ShieldCheck size={16} color="var(--color-teal-700)" />
          <span>Pharmacist Approved Formulation</span>
        </div>
        <div style={styles.certItem}>
          <Heart size={16} color="var(--color-teal-700)" />
          <span>Non-Comedogenic & Cruelty-Free</span>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Purchase Stepper & Actions */}
      {inStock ? (
        <div style={styles.actionBlock}>
          <div style={styles.qtyBlock}>
            <span style={styles.qtyLabel}>Select Quantity:</span>
            <QuantitySelector quantity={qty} onChange={setQty} max={10} />
          </div>

          <div style={styles.btnRow}>
            <button 
              onClick={handleAddToCart}
              className="btn btn-secondary"
              style={styles.actionBtn}
            >
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </button>
            <button 
              onClick={handleBuyNow}
              className="btn btn-primary"
              style={styles.actionBtn}
            >
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.outOfStockBox}>
          <h4 style={{ color: 'var(--color-danger)', marginBottom: '4px' }}>Temporarily Unavailable</h4>
          <p style={{ fontSize: '13px', color: 'var(--color-charcoal)' }}>
            This clinical formula is currently undergoing batch testing. Sign up for notifications on our homepage to get notified upon stock replenishment.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  },
  badgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: '12px'
  },
  categoryLabel: {
    fontSize: '12px',
    color: 'var(--color-teal-700)',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    color: 'var(--color-ink)',
    marginBottom: '12px',
    lineHeight: 1.25
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    marginBottom: '20px'
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  ratingVal: {
    fontWeight: 'bold',
    color: 'var(--color-amber-600)',
    fontSize: '14px'
  },
  reviewCount: {
    opacity: 0.8
  },
  skuText: {
    opacity: 0.6
  },
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  dosageBadge: {
    backgroundColor: 'var(--color-sage-100)',
    color: 'var(--color-teal-900)',
    borderColor: 'var(--color-border)',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    width: '100%',
    margin: '20px 0'
  },
  description: {
    fontSize: '15px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.6,
    marginBottom: '12px'
  },
  certStrip: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%'
  },
  certItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-teal-900)',
    fontWeight: 'var(--font-weight-medium)'
  },
  actionBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  qtyBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  qtyLabel: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-ink)'
  },
  btnRow: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    flexWrap: 'wrap'
  },
  actionBtn: {
    flex: '1 1 180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  outOfStockBox: {
    backgroundColor: '#FADBD8',
    border: '1px solid var(--color-danger)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px',
    width: '100%'
  }
};
