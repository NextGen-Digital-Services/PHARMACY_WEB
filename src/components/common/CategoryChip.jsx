import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryChip({ category, active = false, onClick, notchColor = 'var(--color-mist-50)' }) {
  if (!category) return null;

  const { name, slug } = category;

  const content = (
    <span 
      className={`apothecary-card category-chip ${active ? 'active' : ''}`}
      style={{ '--notch-bg': notchColor }}
    >
      <span className="chip-text text-mono">{name}</span>
    </span>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="category-chip-btn">
        {content}
      </button>
    );
  }

  return (
    <Link to={`/shop/${slug}`} className="category-chip-link">
      {content}
    </Link>
  );
}
