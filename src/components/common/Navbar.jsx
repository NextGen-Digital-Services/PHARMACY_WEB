import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Activity, Sparkles } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { AdminDataContext } from '../../context/AdminDataContext';
import useDebounce from '../../hooks/useDebounce';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useContext(CartContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { products } = useContext(AdminDataContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const searchRef = useRef(null);

  // Filter products for live search dropdown
  const filteredSearchProducts = debouncedSearch
    ? products.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSearchItemClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowSearchResults(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Mobile Hamburger */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">+</span>
          <span className="logo-text">VitaDerm</span>
        </Link>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-item mega-dropdown-trigger" 
               onMouseEnter={() => setMegaMenuOpen(true)}
               onMouseLeave={() => setMegaMenuOpen(false)}>
            <button className="nav-link-btn">
              Categories <ChevronDown size={14} className="chevron-icon" />
            </button>
            
            {/* Mega Menu */}
            <div className={`mega-menu ${megaMenuOpen ? 'open' : ''}`}>
              <div className="mega-menu-content">
                <div className="mega-column">
                  <h4 className="mega-column-title">
                    <Sparkles size={16} className="column-icon derma" />
                    Dermatology (Skincare)
                  </h4>
                  <ul className="mega-column-links">
                    <li><Link to="/shop/face-cleansers" onClick={() => setMegaMenuOpen(false)}>Face Cleansers</Link></li>
                    <li><Link to="/shop/moisturizers-creams" onClick={() => setMegaMenuOpen(false)}>Moisturizers & Creams</Link></li>
                    <li><Link to="/shop/sunscreens" onClick={() => setMegaMenuOpen(false)}>Sunscreens</Link></li>
                    <li><Link to="/shop/serums-actives" onClick={() => setMegaMenuOpen(false)}>Serums & Actives</Link></li>
                    <li><Link to="/shop/acne-blemish-care" onClick={() => setMegaMenuOpen(false)}>Acne & Blemish Care</Link></li>
                  </ul>
                </div>
                <div className="mega-column">
                  <h4 className="mega-column-title">
                    <Activity size={16} className="column-icon nutrition" />
                    Nutrition & Wellness
                  </h4>
                  <ul className="mega-column-links">
                    <li><Link to="/shop/vitamins-minerals" onClick={() => setMegaMenuOpen(false)}>Vitamins & Minerals</Link></li>
                    <li><Link to="/shop/protein-fitness" onClick={() => setMegaMenuOpen(false)}>Protein & Fitness</Link></li>
                    <li><Link to="/shop/wellness-herbal" onClick={() => setMegaMenuOpen(false)}>Wellness & Herbal</Link></li>
                  </ul>
                </div>
                <div className="mega-column promo-column">
                  <div className="mega-promo-card">
                    <span className="promo-tag text-mono">10% OFF</span>
                    <h5>Dermatologist Trusted Formulas</h5>
                    <p>Use coupon code <strong className="text-mono">VITA10</strong> at checkout for 10% discount on orders.</p>
                    <Link to="/shop" className="btn btn-primary btn-sm" onClick={() => setMegaMenuOpen(false)}>Shop All</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Browse All</Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>

          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="nav-link admin-indicator-link" onClick={() => setMobileMenuOpen(false)}>
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Search Bar */}
        <div className="navbar-search-wrapper" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="navbar-search-form">
            <input
              type="text"
              placeholder="Search dermatology & wellness..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-submit" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {/* Live Search Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="live-search-dropdown">
              {filteredSearchProducts.length > 0 ? (
                <>
                  <div className="search-dropdown-header">Products found ({filteredSearchProducts.length})</div>
                  {filteredSearchProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchItemClick(product.id)}
                      className="search-dropdown-item"
                    >
                      <img src={product.image} alt={product.name} className="search-item-img" />
                      <div className="search-item-info">
                        <div className="search-item-name">{product.name}</div>
                        <div className="search-item-meta">
                          <span className="search-item-dosage text-mono">{product.dosage}</span>
                          <span className="search-item-price text-mono">₹{product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={handleSearchSubmit}
                    className="search-dropdown-footer"
                  >
                    View all results for "{searchQuery}"
                  </div>
                </>
              ) : (
                <div className="search-dropdown-no-results">No products found matching "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="navbar-actions">
          {user?.role === 'admin' ? (
            <Link to="/admin/dashboard" className="navbar-action-btn admin" title="Admin Dashboard">
              <User size={20} />
              <span className="admin-badge">Admin</span>
            </Link>
          ) : (
            <Link to={isAuthenticated ? "/account" : "/login"} className="navbar-action-btn" title="My Account">
              <User size={20} />
            </Link>
          )}

          <button 
            className="navbar-action-btn cart-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
