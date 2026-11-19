import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = () => {
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-badge">PRIVILEGE</span>
          <p>
            Complimentary Insured Worldwide Shipping on Orders Over $250 &bull; Use Code{' '}
            <strong>UNJELLIC10</strong> for 10% Off
          </p>
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            <div className="logo-sparkle-crest">
              <Sparkles size={18} className="gold-sparkle-icon" />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">THE UNJELLIC</span>
              <span className="logo-subtitle">FINE JEWELLERY &bull; ATELIER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <div className="nav-dropdown-wrapper">
              <NavLink
                to="/shop"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Shop <ChevronDown size={14} className="dropdown-chevron" />
              </NavLink>
              <div className="nav-dropdown-menu">
                <Link to="/shop?category=all" className="dropdown-item">All Fine Jewellery</Link>
                <Link to="/shop?category=rings" className="dropdown-item">Diamond & Gold Rings</Link>
                <Link to="/shop?category=necklaces" className="dropdown-item">Pendants & Necklaces</Link>
                <Link to="/shop?category=earrings" className="dropdown-item">Earrings & Studs</Link>
                <Link to="/shop?category=bracelets" className="dropdown-item">Tennis Bracelets & Cuffs</Link>
              </div>
            </div>
            <Link to="/shop?collection=featured" className="nav-link">
              Collections
            </Link>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            {/* Search Icon / Bar Toggle */}
            <button
              className="action-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search jewellery"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop?wishlist=true"
              className="action-icon-btn wishlist-btn"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="action-badge-count">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart Bag Icon with live count */}
            <button
              className="action-icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="View Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="action-badge-count gold-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Drawer */}
        {searchOpen && (
          <div className="search-expand-bar">
            <div className="container">
              <form onSubmit={handleSearchSubmit} className="search-expand-form">
                <Search size={20} className="search-input-icon" />
                <input
                  type="text"
                  placeholder="Search rings, 18K necklaces, diamond earrings, tennis bracelets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-sm btn-gold">
                  Search
                </button>
                <button
                  type="button"
                  className="close-search-btn"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-in Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo-text-group">
            <span className="logo-title">THE UNJELLIC</span>
            <span className="logo-subtitle">FINE JEWELLERY</span>
          </div>
          <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="mobile-drawer-content">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search jewels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <nav className="mobile-nav-links">
            <NavLink to="/" onClick={closeMobileMenu} className="mobile-nav-item">
              Home
            </NavLink>
            <NavLink to="/shop" onClick={closeMobileMenu} className="mobile-nav-item">
              Shop All Jewellery
            </NavLink>
            <div className="mobile-category-links">
              <Link to="/shop?category=rings" onClick={closeMobileMenu} className="mobile-sublink">
                &bull; Diamond Rings & Bands
              </Link>
              <Link to="/shop?category=necklaces" onClick={closeMobileMenu} className="mobile-sublink">
                &bull; Luxury Necklaces
              </Link>
              <Link to="/shop?category=earrings" onClick={closeMobileMenu} className="mobile-sublink">
                &bull; Fine Earrings & Studs
              </Link>
              <Link to="/shop?category=bracelets" onClick={closeMobileMenu} className="mobile-sublink">
                &bull; Tennis Bracelets & Cuffs
              </Link>
            </div>
            <NavLink to="/about" onClick={closeMobileMenu} className="mobile-nav-item">
              Our Story & Heritage
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu} className="mobile-nav-item">
              Contact & Concierge
            </NavLink>
            <NavLink to="/cart" onClick={closeMobileMenu} className="mobile-nav-item highlight-cart">
              Shopping Bag ({totalItems})
            </NavLink>
          </nav>

          <div className="mobile-drawer-footer">
            <p className="concierge-tag">Need personal assistance?</p>
            <p className="concierge-phone">+1 (800) 555-UNJELLIC</p>
            <p className="concierge-email">concierge@unjellic.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
