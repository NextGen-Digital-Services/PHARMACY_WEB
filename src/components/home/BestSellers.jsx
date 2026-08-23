import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductCard from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function BestSellers() {
  const { products } = useContext(AdminDataContext);

  // Filter out bestsellers
  const bestSellers = products
    .filter((p) => p.tags && p.tags.includes('Bestseller'))
    .slice(0, 4);

  return (
    <section className="section-wrapper bg-mist">
      <div className="container">
        {/* Section Header */}
        <div style={styles.header}>
          <div>
            <span className="text-mono" style={styles.eyebrow}>POPULAR FORMULAS</span>
            <h2 style={styles.title}>Prescription Bestsellers</h2>
            <p style={styles.subtitle}>
              Our most popular clinical dermatology and daily nutritional supplements.
            </p>
          </div>
          <Link to="/shop" className="btn btn-secondary btn-sm" style={styles.linkBtn}>
            <span>View Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Grid */}
        <div style={styles.grid}>
          {bestSellers.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              notchColor="var(--color-mist-50)"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '48px',
    flexWrap: 'wrap',
    gap: '24px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '8px'
  },
  title: {
    color: 'var(--color-ink)',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--color-charcoal)',
    maxWidth: '600px'
  },
  linkBtn: {
    alignSelf: 'flex-end'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '30px',
    width: '100%'
  }
};
