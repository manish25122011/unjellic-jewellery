import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { Search, SlidersHorizontal, X, Sparkles, Heart } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  // Read URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialWishlist = searchParams.get('wishlist') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlist);

  // Sync state if query params change externally (e.g. from header nav click)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const searchParam = searchParams.get('search');
    if (searchParam !== null) {
      setSearchTerm(searchParam);
    }
    const wishlistParam = searchParams.get('wishlist');
    setWishlistOnly(wishlistParam === 'true');
  }, [searchParams]);

  // Update query params when category changes
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setWishlistOnly(false);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    newParams.delete('wishlist');
    setSearchParams(newParams);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('featured');
    setPriceRange('all');
    setWishlistOnly(false);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Wishlist filter
        if (wishlistOnly) {
          const inWishlist = wishlist.some((item) => item.id === p.id);
          if (!inWishlist) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(term);
          const matchDesc = p.description.toLowerCase().includes(term);
          const matchCat = p.category.toLowerCase().includes(term);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Price range filter
        if (priceRange === 'under1000' && p.price >= 1000) return false;
        if (priceRange === '1000to2000' && (p.price < 1000 || p.price > 2000)) return false;
        if (priceRange === 'above2000' && p.price <= 2000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
        return a.id - b.id; // Default featured order
      });
  }, [selectedCategory, searchTerm, sortBy, priceRange, wishlistOnly, wishlist]);

  return (
    <div className="shop-page">
      {/* Header Banner */}
      <section style={{ background: '#fcfbf9', borderBottom: '1px solid #eae6dc', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="subtitle">THE ATELIER BOUTIQUE</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', margin: '8px 0 14px' }}>
            {wishlistOnly ? 'Your Saved Wishlist' : 'Fine Jewellery Catalogue'}
          </h1>
          <div className="gold-divider" />
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#6b6860', fontSize: '1rem', fontWeight: 300 }}>
            {wishlistOnly
              ? 'Your private selection of admired gems, ready to be added to your shopping bag.'
              : 'Explore our complete handcrafted collection of certified conflict-free diamond rings, gold necklaces, luxury earrings, and tennis bracelets.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container section-padding">
        {/* Filter Controls Bar */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #eae6dc',
            borderRadius: '4px',
            padding: '20px 24px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Top row: Categories & Wishlist */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`btn btn-sm ${!wishlistOnly && selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: '20px', padding: '6px 16px' }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Wishlist toggle pill */}
            <button
              onClick={() => {
                setWishlistOnly(!wishlistOnly);
                const newParams = new URLSearchParams(searchParams);
                if (!wishlistOnly) {
                  newParams.set('wishlist', 'true');
                } else {
                  newParams.delete('wishlist');
                }
                setSearchParams(newParams);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: wishlistOnly ? '1px solid #b00020' : '1px solid #ddd',
                background: wishlistOnly ? '#fff0f2' : '#fff',
                color: wishlistOnly ? '#b00020' : '#1c1b18',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Heart size={16} fill={wishlistOnly ? '#b00020' : 'none'} color="#b00020" />
              Wishlist ({wishlist.length})
            </button>
          </div>

          {/* Bottom row: Search, Price filter & Sort */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #f2eee6',
              alignItems: 'center'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                color="#c5a059"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search jewellery..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value.trim()) {
                    newParams.set('search', e.target.value);
                  } else {
                    newParams.delete('search');
                  }
                  setSearchParams(newParams);
                }}
                className="form-input"
                style={{ paddingLeft: '38px', paddingRight: searchTerm ? '38px' : '16px', fontSize: '0.85rem' }}
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#999',
                    cursor: 'pointer',
                    display: 'flex'
                  }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Price Filter Presets */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.85rem' }}
                aria-label="Filter by Price"
              >
                <option value="all">All Price Ranges</option>
                <option value="under1000">Under $1,000</option>
                <option value="1000to2000">$1,000 &ndash; $2,000</option>
                <option value="above2000">Above $2,000</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.85rem' }}
                aria-label="Sort products by"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Results count & Clear */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#6b6860' }}>
                Showing <strong>{filteredProducts.length}</strong> creations
              </span>
              {(selectedCategory !== 'all' || searchTerm || priceRange !== 'all' || wishlistOnly) && (
                <button
                  onClick={resetAllFilters}
                  style={{ fontSize: '0.75rem', color: '#c5a059', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: '#fcfbf9',
              borderRadius: '4px',
              border: '1px solid #eae6dc'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(197, 160, 89, 0.15)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={28} color="#c5a059" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '10px' }}>
              {wishlistOnly ? 'Your Wishlist is Empty' : 'No Jewellery Found'}
            </h3>
            <p style={{ color: '#6b6860', maxWidth: '480px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
              {wishlistOnly
                ? 'Click the heart icon on any jewel to preserve it in your personal wishlist.'
                : 'No pieces match your current search and filter criteria. Try adjusting your parameters.'}
            </p>
            <button className="btn btn-primary" onClick={resetAllFilters}>
              Clear All Filters &amp; View All Jewels
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
