import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  const product = products.find((p) => p.id === parseInt(id, 10));

  // If product not found
  if (!product) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center', minHeight: '50vh' }}>
        <h2>Jewellery Piece Not Found</h2>
        <p style={{ margin: '16px 0 24px', color: '#666' }}>The product you are looking for does not exist or has been retired.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials ? product.materials[0] : '18K Yellow Gold');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('shipping');

  // Reset states when ID changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes ? product.sizes[0] : 'Standard');
    setSelectedMaterial(product.materials ? product.materials[0] : '18K Yellow Gold');
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id, product]);

  const isFavorite = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedMaterial, quantity, true);
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-page">
      {/* Breadcrumb Bar */}
      <div style={{ background: '#fbf9f5', borderBottom: '1px solid #eae6dc', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#6b6860' }}>
          <Link to="/" style={{ color: '#1c1b18' }}>Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" style={{ color: '#1c1b18' }}>Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} style={{ textTransform: 'capitalize', color: '#1c1b18' }}>
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: '#c5a059', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '50px' }}>
          {/* Left: Product Media Gallery */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1.05',
                borderRadius: '4px',
                overflow: 'hidden',
                background: '#f8f7f4',
                border: '1px solid #eae6dc',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '16px'
              }}
            >
              <img
                src={activeImage}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: activeImage === img ? '2px solid #c5a059' : '1px solid #eae6dc',
                      cursor: 'pointer',
                      padding: 0,
                      background: '#fff'
                    }}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Actions & Specs */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="subtitle">{product.category}</span>
              {product.badge && <span className="badge badge-gold">{product.badge}</span>}
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#1c1b18', marginBottom: '12px', lineHeight: 1.25 }}>
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? '#d4af37' : 'none'}
                    stroke="#d4af37"
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#6b6860' }}>
                {product.rating} &bull; {product.reviewsCount} verified customer reviews
              </span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '22px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1b18' }}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: '#9e9a90' }}>
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 600, background: '#e8f5e9', padding: '3px 8px', borderRadius: '4px' }}>
                Complimentary Shipping Included
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.98rem', color: '#55524c', lineHeight: 1.7, marginBottom: '28px' }}>
              {product.description}
            </p>

            {/* Metal Selector */}
            {product.materials && (
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '10px' }}>
                  Precious Metal: <strong style={{ color: '#99752d' }}>{selectedMaterial}</strong>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {product.materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMaterial(m)}
                      style={{
                        padding: '8px 18px',
                        fontSize: '0.82rem',
                        border: selectedMaterial === m ? '1.5px solid #c5a059' : '1px solid #ddd',
                        background: selectedMaterial === m ? 'rgba(197, 160, 89, 0.12)' : '#fff',
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

            {/* Size Selector */}
            {product.sizes && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                    Select Size: <strong style={{ color: '#1c1b18' }}>{selectedSize}</strong>
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#c5a059', textDecoration: 'underline', cursor: 'pointer' }}>
                    Ring Sizing Chart
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.85rem',
                        border: selectedSize === s ? '1.5px solid #1c1b18' : '1px solid #ddd',
                        background: selectedSize === s ? '#1c1b18' : '#fff',
                        color: selectedSize === s ? '#fff' : '#1c1b18',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Primary Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ padding: '12px 18px', background: '#f8f8f8', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ padding: '0 18px', fontWeight: 600, fontSize: '1rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: '12px 18px', background: '#f8f8f8', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-gold"
                onClick={handleAddToCart}
                style={{ flexGrow: 1, padding: '16px 24px' }}
              >
                <ShoppingBag size={18} /> Add to Shopping Bag
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  padding: '14px',
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
                <Heart size={22} fill={isFavorite ? '#b00020' : 'none'} />
              </button>
            </div>

            {/* Specifications Card */}
            {product.details && (
              <div style={{ background: '#fcfbf9', border: '1px solid #eae6dc', borderRadius: '4px', padding: '20px 24px', marginBottom: '28px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  Atelier Specifications
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
                  {Object.entries(product.details).map(([key, val]) => (
                    <div key={key}>
                      <span style={{ color: '#6b6860', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>{' '}
                      <strong>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accordions */}
            <div style={{ borderTop: '1px solid #eae6dc', display: 'flex', flexDirection: 'column' }}>
              {/* Shipping Accordion */}
              <div style={{ borderBottom: '1px solid #eae6dc' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Truck size={18} color="#c5a059" /> Complimentary Insured Express Shipping
                  </span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <p style={{ fontSize: '0.85rem', color: '#6b6860', paddingBottom: '16px', lineHeight: 1.6 }}>
                    Every order includes complimentary worldwide courier dispatch via FedEx / DHL Express. 
                    Signature is mandatory upon arrival for safety. Items arrive discreetly packaged in our signature 
                    velvet atelier jewelry chest with a certificate of authenticity.
                  </p>
                )}
              </div>

              {/* Returns Accordion */}
              <div style={{ borderBottom: '1px solid #eae6dc' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'returns' ? '' : 'returns')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RefreshCw size={18} color="#c5a059" /> 30-Day Returns &amp; Free Resizing
                  </span>
                  {openAccordion === 'returns' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'returns' && (
                  <p style={{ fontSize: '0.85rem', color: '#6b6860', paddingBottom: '16px', lineHeight: 1.6 }}>
                    We want you to treasure your purchase completely. Returns are accepted within 30 days in unworn condition. 
                    We also offer one complimentary ring resizing within 60 days of delivery.
                  </p>
                )}
              </div>

              {/* Warranty Accordion */}
              <div style={{ borderBottom: '1px solid #eae6dc' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'warranty' ? '' : 'warranty')}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color="#c5a059" /> Lifetime Atelier Guarantee
                  </span>
                  {openAccordion === 'warranty' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'warranty' && (
                  <p style={{ fontSize: '0.85rem', color: '#6b6860', paddingBottom: '16px', lineHeight: 1.6 }}>
                    Every Unjellic creation is protected by our lifetime manufacturing warranty covering structural integrity, 
                    prong inspection, annual ultrasonic cleaning, and complimentary rhodium replating.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Creations */}
      {relatedProducts.length > 0 && (
        <section className="section-padding" style={{ background: '#fcfbf9', borderTop: '1px solid #eae6dc' }}>
          <div className="container">
            <div className="section-header">
              <span className="subtitle">CURATED COMPLEMENTS</span>
              <h2>You May Also Admire</h2>
              <div className="gold-divider" />
            </div>

            <div className="product-grid">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;

