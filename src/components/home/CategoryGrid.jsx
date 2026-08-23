import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryGrid() {
  const { categories, products } = useContext(AdminDataContext);

  const getProductCount = (categorySlug) => {
    return products.filter(p => p.category === categorySlug).length;
  };

  return (
    <section className="section-wrapper bg-sage">
      <div className="container">
        {/* Section Header */}
        <div style={styles.header}>
          <div>
            <span className="text-mono" style={styles.eyebrow}>CATEGORIES</span>
            <h2 style={styles.title}>Shop by Health Category</h2>
            <p style={styles.subtitle}>
              Browse pharmacist-validated formulas categorised for specific dermatological and nutritional needs.
            </p>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm" style={styles.browseAllBtn}>
            <span>View All Products</span>
          </Link>
        </div>

        {/* Grid of 8 Tiles */}
        <div style={styles.grid}>
          {categories.map((cat) => {
            const count = getProductCount(cat.slug) || 20;
            return (
              <Link 
                key={cat.id} 
                to={`/shop/${cat.slug}`} 
                className="apothecary-card category-tile-card"
                style={{ ...styles.card, '--notch-bg': 'var(--color-sage-100)' }}
              >
                <div style={styles.imgWrapper}>
                  <img src={cat.image} alt={cat.name} style={styles.img} />
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.info}>
                    <span className="text-mono" style={styles.countText}>{count} Formulations</span>
                    <h3 style={styles.cardName}>{cat.name}</h3>
                  </div>
                  <div style={styles.arrowCircle}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
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
    color: 'var(--color-teal-700)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'uppercase',
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
  browseAllBtn: {
    alignSelf: 'flex-end'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '24px',
    width: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '240px',
    cursor: 'pointer',
    padding: '12px',
    backgroundColor: 'var(--color-white)'
  },
  imgWrapper: {
    width: '100%',
    height: '140px',
    overflow: 'hidden',
    borderRadius: '4px',
    border: '1px solid var(--color-border)'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '16px',
    flex: 1
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  countText: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'var(--font-weight-bold)'
  },
  cardName: {
    fontSize: '16px',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-body)'
  },
  arrowCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-teal-700)',
    backgroundColor: 'var(--color-mist-50)',
    flexShrink: 0
  }
};
