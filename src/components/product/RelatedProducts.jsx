import React, { useContext } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductCard from '../common/ProductCard';

export default function RelatedProducts({ currentProductId, categorySlug }) {
  const { products } = useContext(AdminDataContext);

  // Filter products by category, excluding current product
  const related = products
    .filter(p => p.category === categorySlug && p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span className="text-mono" style={styles.eyebrow}>CLINICALLY ALIGNED</span>
        <h2 style={styles.title}>Related Formulations</h2>
        <div style={styles.line} />
      </div>

      <div style={styles.grid}>
        {related.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            notchColor="var(--color-mist-50)"
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '64px',
    width: '100%'
  },
  header: {
    marginBottom: '32px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '6px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    color: 'var(--color-ink)',
    marginBottom: '12px'
  },
  line: {
    height: '2px',
    backgroundColor: 'var(--color-border)',
    width: '80px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px'
  }
};
