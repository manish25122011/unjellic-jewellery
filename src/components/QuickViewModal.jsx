import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : '');
      setSelectedMaterial(quickViewProduct.materials ? quickViewProduct.materials[0] : '');
      setQuantity(1);
      setActiveImage(quickViewProduct.image);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorite = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedMaterial, quantity, true);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#ffffff',
            borderRadius: '50%',
            padding: '8px',
            border: '1px solid #eae6dc',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left: Product Images */}
          <div style={{ background: '#f8f7f4', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', height: '360px', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <img
                src={activeImage || quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {quickViewProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: activeImage === img ? '2px solid #c5a059' : '1px solid #ddd',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c5a059', fontWeight: 600 }}>
              {quickViewProduct.category}
            </span>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '8px 0 10px', color: '#1c1b18' }}>
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(quickViewProduct.rating) ? '#d4af37' : 'none'}
                    stroke="#d4af37"
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#6b6860' }}>
                {quickViewProduct.rating} ({quickViewProduct.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1c1b18' }}>
                ${quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.originalPrice && (
                <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', color: '#9e9a90' }}>
                  ${quickViewProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#6b6860', lineHeight: 1.6, marginBottom: '20px' }}>
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            {quickViewProduct.sizes && (
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '8px' }}>
                  Select Size / Length: <span style={{ color: '#c5a059' }}>{selectedSize}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        border: selectedSize === s ? '1px solid #1c1b18' : '1px solid #ddd',
                        background: selectedSize === s ? '#1c1b18' : '#fff',
                        color: selectedSize === s ? '#fff' : '#1c1b18',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material Selector */}
            {quickViewProduct.materials && (
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '8px' }}>
                  Precious Metal: <span style={{ color: '#c5a059' }}>{selectedMaterial}</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {quickViewProduct.materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        border: selectedMaterial === m ? '1px solid #c5a059' : '1px solid #ddd',
                        background: selectedMaterial === m ? 'rgba(197, 160, 89, 0.15)' : '#fff',
                        color: selectedMaterial === m ? '#99752d' : '#1c1b18',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: selectedMaterial === m ? 600 : 400
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ padding: '10px 14px', background: '#f8f8f8', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ padding: '0 16px', fontWeight: 600, fontSize: '0.9rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: '10px 14px', background: '#f8f8f8', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ flexGrow: 1 }}
              >
                <ShoppingBag size={16} /> Add to Shopping Bag
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                style={{
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isFavorite ? '#b00020' : '#1c1b18'
                }}
                title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isFavorite ? '#b00020' : 'none'} />
              </button>
            </div>

            {/* Guarantee checklist */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#6b6860' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={14} color="#c5a059" /> Complimentary Insured Express Courier
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color="#c5a059" /> Certified Conflict-Free & Laboratory Appraised
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={14} color="#c5a059" /> 30-Day Effortless Returns & Exchanges
              </div>
            </div>

            {/* View Full Product Link */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                style={{ fontSize: '0.8rem', color: '#c5a059', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                View Full Product Details &amp; Specifications &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

