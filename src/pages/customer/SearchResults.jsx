import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductCard from '../../components/common/ProductCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useContext(AdminDataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Filter products by query matching name or description
  const results = products.filter(
    p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <Breadcrumbs paths={[{ name: 'Search Results', url: `/search?q=${query}` }]} />

      <div style={styles.header}>
        <span className="text-mono" style={styles.eyebrow}>SEARCH OUTPUT</span>
        <h1 style={styles.title}>
          Search Results for "{query}"
        </h1>
        <p style={styles.subtitle}>
          We found <strong className="text-mono" style={{ color: 'var(--color-teal-700)' }}>{results.length}</strong> formulation{results.length !== 1 && 's'} matching your query.
        </p>
      </div>

      {results.length > 0 ? (
        <div style={styles.grid}>
          {results.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              notchColor="var(--color-mist-50)"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No Formulations Match Search"
          message={`We couldn't find any products matching "${query}". Try searching for standard pharmacy ingredients like Retinol, Ceramide, Protein, or Vitamin.`}
          actionLink="/shop"
          actionText="Browse Full Catalog"
        />
      )}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '40px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px'
  }
};
