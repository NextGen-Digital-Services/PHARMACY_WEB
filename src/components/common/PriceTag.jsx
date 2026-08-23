import React from 'react';
import formatCurrency from '../../utils/formatCurrency';

export default function PriceTag({ price, mrp, sku }) {
  return (
    <div className="prescription-tag price-tag-container">
      <span className="price-mono">{formatCurrency(price)}</span>
      {mrp > price && (
        <span className="price-mrp" style={{ fontSize: '12px', marginLeft: '6px' }}>
          {formatCurrency(mrp)}
        </span>
      )}
      {sku && (
        <>
          <span style={{ margin: '0 6px', color: 'var(--color-border)' }}>|</span>
          <span className="text-mono" style={{ fontSize: '11px', color: 'var(--color-charcoal)', opacity: 0.8 }}>
            {sku}
          </span>
        </>
      )}
    </div>
  );
}
