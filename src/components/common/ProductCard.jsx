import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ShieldAlert } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';

export default function ProductCard({ product, notchColor = 'var(--color-mist-50)' }) {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    mrp,
    rating,
    reviewCount,
    image,
    inStock,
    dosage,
    tags
  } = product;

  // Pretty category name helper
  const formatCategoryName = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Determine top badge/ribbon (e.g. Bestseller, New, or Category)
  const displayRibbon = tags?.includes('Bestseller') 
    ? 'Bestseller' 
    : (tags?.includes('New') ? 'New' : formatCategoryName(category));

  return (
    <div 
      className="apothecary-card product-card-container" 
      style={{ '--notch-bg': notchColor }}
    >
      {/* Amber corner ribbon */}
      <span className="apothecary-ribbon">{displayRibbon}</span>

      {/* Product Image Link */}
      <Link to={`/product/${id}`} className="product-card-img-link">
        <img src={image} alt={name} className="product-card-img" />
        {!inStock && (
          <div className="product-card-out-of-stock-overlay">
            <span className="out-of-stock-badge">
              <ShieldAlert size={14} /> OUT OF STOCK
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="product-card-info">
        {/* Rating and Dosage Row */}
        <div className="product-card-meta-row">
          <div className="product-card-rating">
            <Star size={12} fill="var(--color-amber-600)" stroke="var(--color-amber-600)" />
            <span className="rating-num text-mono">{rating}</span>
            <span className="rating-count">({reviewCount})</span>
          </div>
          <span className="prescription-tag dosage-label">{dosage}</span>
        </div>

        {/* Product Title */}
        <h3 className="product-card-title">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>

        {/* Footer Row: Price + Add Button */}
        <div className="product-card-footer">
          <div className="product-card-price-block">
            <span className="price-mono">{formatCurrency(price)}</span>
            {mrp > price && (
              <span className="price-mrp">{formatCurrency(mrp)}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!inStock}
            className={`btn btn-secondary btn-sm product-card-add-btn ${!inStock ? 'btn-disabled' : ''}`}
            aria-label="Add to cart"
            title={inStock ? "Add to Cart" : "Out of stock"}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
