import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductCard from '../../components/common/ProductCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Layers } from 'lucide-react';

const PRODUCTS_PER_PAGE = 12;

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const { products, categories } = useContext(AdminDataContext);

  // Find Category info
  const categoryInfo = categories.find(c => c.slug === categorySlug);

  // Filters State
  const [priceRange, setPriceRange] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top on load/page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, categorySlug]);

  // Reset page when category or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, priceRange, minRating, inStockOnly, sortBy]);

  if (!categoryInfo) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <EmptyState
          icon={Layers}
          title="Category Not Found"
          message="The dermatology or nutrition category you requested does not exist in our apothecary records."
          actionLink="/shop"
          actionText="Back to Shop Catalog"
        />
      </div>
    );
  }

  // Filter products matching active category + filters
  const filteredProducts = products.filter((product) => {
    const categoryMatch = product.category === categorySlug;
    const priceMatch = product.price <= priceRange;
    const ratingMatch = product.rating >= minRating;
    const stockMatch = !inStockOnly || product.inStock;

    return categoryMatch && priceMatch && ratingMatch && stockMatch;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.reviewCount * b.rating) - (a.reviewCount * a.rating);
  });

  // Pagination Math
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleResetFilters = () => {
    setPriceRange(2500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
  };

  return (
    <div className="category-page" style={{ paddingBottom: '80px' }}>
      {/* Category Banner */}
      <div style={{ ...styles.banner, backgroundImage: `linear-gradient(rgba(11, 74, 63, 0.85), rgba(11, 74, 63, 0.95)), url(${categoryInfo.image})` }}>
        <div className="container" style={styles.bannerContainer}>
          <Breadcrumbs paths={[{ name: 'Shop', url: '/shop' }, { name: categoryInfo.name, url: `/shop/${categorySlug}` }]} />
          <span className="text-mono" style={styles.bannerEyebrow}>{categoryInfo.type.toUpperCase()} CLINICAL RANGE</span>
          <h1 style={styles.bannerTitle}>{categoryInfo.name}</h1>
          <p style={styles.bannerDesc}>{categoryInfo.description}</p>
          <div className="prescription-tag text-mono" style={styles.bannerBadge}>
            Total Formulas: {products.filter(p => p.category === categorySlug).length}
          </div>
        </div>
      </div>

      <div className="container" style={styles.layout}>
        {/* Sidebar Filters */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>
              <SlidersHorizontal size={18} />
              Filter Formulas
            </h3>
            <button onClick={handleResetFilters} style={styles.resetBtn}>
              <RefreshCw size={12} />
              <span>Clear</span>
            </button>
          </div>

          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>
              Max Price: <span className="text-mono" style={{ color: 'var(--color-amber-600)' }}>₹{priceRange}</span>
            </h4>
            <input
              type="range"
              min="149"
              max="2500"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              style={styles.rangeInput}
            />
            <div style={styles.rangeLabels}>
              <span className="text-mono">₹149</span>
              <span className="text-mono">₹2,500</span>
            </div>
          </div>

          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>Minimum Rating</h4>
            <div style={styles.radioList}>
              {[4.5, 4.0, 3.8].map((rating) => (
                <label key={rating} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    style={styles.radioInput}
                  />
                  <span>{rating}★ & above</span>
                </label>
              ))}
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="minRating"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                  style={styles.radioInput}
                />
                <span>Show All Ratings</span>
              </label>
            </div>
          </div>

          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>Availability</h4>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={styles.checkboxInput}
              />
              <span>In Stock Only</span>
            </label>
          </div>

          <div style={styles.otherRangesBlock}>
            <h4 style={styles.filterLabel}>Other Health Ranges</h4>
            <div style={styles.otherLinks}>
              {categories.filter(c => c.slug !== categorySlug).slice(0, 4).map(c => (
                <Link key={c.id} to={`/shop/${c.slug}`} style={styles.otherLink}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Panel */}
        <div style={styles.catalogPanel}>
          {/* Controls Bar */}
          <div style={styles.controlsBar}>
            <div style={styles.countInfo}>
              Showing <strong className="text-mono">{filteredProducts.length}</strong> formulations matching your filters
            </div>

            <div style={styles.sortBlock}>
              <ArrowUpDown size={16} color="var(--color-charcoal)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.sortSelect}
              >
                <option value="popular">Sort: Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating: Highest First</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {currentProducts.length > 0 ? (
            <>
              <div style={styles.grid}>
                {currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    notchColor="var(--color-mist-50)"
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          ) : (
            <div style={styles.noResultsBox}>
              <Layers size={48} style={{ color: 'var(--color-border)', marginBottom: '16px' }} />
              <h3>No Formulations Match Filters</h3>
              <p>Try resetting filters or adjusting sliders to view standard {categoryInfo.name} offerings.</p>
              <button onClick={handleResetFilters} className="btn btn-secondary" style={{ marginTop: '16px' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'var(--color-white)',
    padding: '60px 0',
    marginBottom: '40px'
  },
  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  bannerEyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    backgroundColor: 'var(--color-amber-100)',
    padding: '3px 8px',
    borderRadius: '2px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '16px'
  },
  bannerTitle: {
    color: 'var(--color-white)',
    fontSize: '38px',
    marginBottom: '12px'
  },
  bannerDesc: {
    color: 'var(--color-white)',
    opacity: 0.9,
    fontSize: '16px',
    maxWidth: '700px',
    lineHeight: 1.5,
    marginBottom: '20px'
  },
  bannerBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--color-white)',
    borderColor: 'rgba(255,255,255,0.2)'
  },
  layout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start'
  },
  sidebar: {
    width: '280px',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '24px',
    position: 'sticky',
    top: '100px',
    flexShrink: 0
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--color-border)'
  },
  sidebarTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--color-ink)'
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8,
    cursor: 'pointer'
  },
  filterSection: {
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--color-border)'
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)',
    marginBottom: '14px'
  },
  rangeInput: {
    width: '100%',
    accentColor: 'var(--color-teal-700)',
    cursor: 'pointer'
  },
  rangeLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    marginTop: '6px'
  },
  radioList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    cursor: 'pointer'
  },
  radioInput: {
    accentColor: 'var(--color-teal-700)'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    cursor: 'pointer'
  },
  checkboxInput: {
    accentColor: 'var(--color-teal-700)'
  },
  otherRangesBlock: {
    marginTop: '24px'
  },
  otherLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  otherLink: {
    fontSize: '13px',
    color: 'var(--color-teal-700)',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
    ':hover': {
      color: 'var(--color-teal-500)'
    }
  },
  catalogPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  controlsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 18px',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  countInfo: {
    fontSize: '14px',
    color: 'var(--color-charcoal)'
  },
  sortBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  sortSelect: {
    border: '1px solid var(--color-border)',
    backgroundColor: 'transparent',
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    color: 'var(--color-ink)',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px'
  },
  noResultsBox: {
    textAlign: 'center',
    padding: '60px 24px',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};
