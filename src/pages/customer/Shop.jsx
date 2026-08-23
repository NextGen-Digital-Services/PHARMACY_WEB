import React, { useState, useEffect, useContext } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductCard from '../../components/common/ProductCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Pagination from '../../components/common/Pagination';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Layers } from 'lucide-react';

const PRODUCTS_PER_PAGE = 12;

export default function Shop() {
  const { products, categories } = useContext(AdminDataContext);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Scroll to top on load/page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedCategory]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, minRating, inStockOnly, sortBy]);

  // Filter and Sort logic
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    // Price match
    const priceMatch = product.price <= priceRange;
    // Rating match
    const ratingMatch = product.rating >= minRating;
    // Stock match
    const stockMatch = !inStockOnly || product.inStock;

    return categoryMatch && priceMatch && ratingMatch && stockMatch;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default/Popular: reviewCount count * rating
    return (b.reviewCount * b.rating) - (a.reviewCount * a.rating);
  });

  // Pagination Math
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(2500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
  };

  const formatCategoryName = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <Breadcrumbs paths={[{ name: 'Shop Catalogue', url: '/shop' }]} />

      <div style={styles.shopLayout}>
        {/* Sidebar Filters - Desktop */}
        <aside style={styles.sidebar} className={`shop-sidebar-desktop ${mobileFiltersOpen ? 'mobile-show' : ''}`}>
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>
              <SlidersHorizontal size={18} />
              Filter Catalogue
            </h3>
            <button onClick={handleResetFilters} style={styles.resetBtn} title="Reset filters">
              <RefreshCw size={14} />
              <span>Clear</span>
            </button>
          </div>

          <div style={styles.filterSection}>
            <h4 style={styles.filterLabel}>Medical Range</h4>
            <div style={styles.categoryList}>
              <button 
                onClick={() => setSelectedCategory('all')}
                style={{
                  ...styles.catBtn,
                  color: selectedCategory === 'all' ? 'var(--color-teal-700)' : 'var(--color-charcoal)',
                  fontWeight: selectedCategory === 'all' ? 'bold' : 'normal',
                  backgroundColor: selectedCategory === 'all' ? 'var(--color-sage-100)' : 'transparent'
                }}
              >
                All Formulas ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter(p => p.category === cat.slug).length;
                return (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    style={{
                      ...styles.catBtn,
                      color: selectedCategory === cat.slug ? 'var(--color-teal-700)' : 'var(--color-charcoal)',
                      fontWeight: selectedCategory === cat.slug ? 'bold' : 'normal',
                      backgroundColor: selectedCategory === cat.slug ? 'var(--color-sage-100)' : 'transparent'
                    }}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
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
            <h4 style={styles.filterLabel}>Stock Availability</h4>
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
        </aside>

        {/* Main Product Catalog Panel */}
        <div style={styles.catalogPanel}>
          {/* Controls Bar */}
          <div style={styles.controlsBar}>
            <div style={styles.countInfo}>
              Showing <strong className="text-mono">{filteredProducts.length}</strong> formulations
              {selectedCategory !== 'all' && ` in ${formatCategoryName(selectedCategory)}`}
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

          {/* Product Grid */}
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

              {/* Pagination */}
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
              <p>Try clearing your price sliders or selection filters to browse our standard catalog.</p>
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
  shopLayout: {
    display: 'flex',
    gap: '32px',
    marginTop: '16px',
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
    fontSize: '12px',
    color: 'var(--color-charcoal)',
    opacity: 0.8,
    cursor: 'pointer'
  },
  filterSection: {
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--color-border)',
    ':last-of-type': {
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0
    }
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)',
    marginBottom: '14px'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  catBtn: {
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: 'var(--radius-sm)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    width: '100%'
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
    accentColor: 'var(--color-teal-700)',
    width: '16px',
    height: '16px'
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
