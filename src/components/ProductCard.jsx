import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Safe luxury fallback placeholder in case an image fails to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useCart();
  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, null, null, 1, true);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Product Image & Overlays */}
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} aria-label={`View details of ${product.name}`}>
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
            style={{
              opacity: imgLoaded ? 1 : 0.8,
              transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </Link>

        {/* Badge Tag */}
        {product.badge && (
          <div className="product-badge-tag">
            <span className={`badge ${product.badge === 'Bestseller' ? 'badge-gold' : 'badge-dark'}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className={`product-wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={16} fill={isFavorite ? '#b00020' : 'none'} />
        </button>

        {/* Hover Action Overlay */}
        <div className="product-overlay-actions">
          <button
            className="btn btn-sm btn-outline"
            style={{ flex: 1, background: 'rgba(255,255,255,0.95)', border: '1px solid #c5a059' }}
            onClick={handleQuickViewClick}
            title="Quick view"
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            className="btn btn-sm btn-primary"
            style={{ flex: 1 }}
            onClick={handleQuickAdd}
            title="Add to bag"
          >
            <ShoppingBag size={14} /> Add to Bag
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <span className="product-category-name">{product.category}</span>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars-row" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating) ? '#d4af37' : 'none'}
                stroke="#d4af37"
              />
            ))}
          </div>
          <span>({product.reviewsCount})</span>
        </div>

        {/* Pricing */}
        <div className="product-price-row">
          <span className="product-price">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="product-original-price">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

