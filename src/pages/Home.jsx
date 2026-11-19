import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products, categories, collections, testimonials } from '../data/products';
import { Sparkles, ArrowRight, Star, ShieldCheck, Heart, Award, Gem, CheckCircle } from 'lucide-react';

const Home = () => {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  // Filtered products for bestsellers
  const bestsellers = products.filter((p) => p.isBestseller);
  const displayedProducts =
    activeCategoryTab === 'all'
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeCategoryTab).slice(0, 8);

  return (
    <div className="home-page">
      {/* 1. Hero Showcase */}
      <Hero />

      {/* 2. Featured Collections Banner Cards */}
      <section className="section-padding" style={{ background: '#fdfcf9' }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">CURATED HIGH JEWELLERY</span>
            <h2>Signature Collections</h2>
            <div className="gold-divider" />
            <p>
              Each collection is born from meticulous hand-drafted design and timeless Italian silversmithing.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {collections.map((col) => (
              <Link
                key={col.id}
                to={`/shop?category=${col.category}`}
                style={{
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  aspectRatio: '1 / 1.25',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid #eae6dc',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px',
                  color: '#fff',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease'
                }}
                className="collection-card"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    transition: 'transform 0.8s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, rgba(0,0,0,0) 100%)',
                    zIndex: 1
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.65rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-light)',
                      fontWeight: 600,
                      marginBottom: '8px'
                    }}
                  >
                    {col.tag}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#eae6dc', marginBottom: '14px', lineHeight: 1.4 }}>
                    {col.subtitle}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-light)'
                    }}
                  >
                    Discover Collection <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Quick Navigator */}
      <section style={{ padding: '40px 0', borderTop: '1px solid #eae6dc', borderBottom: '1px solid #eae6dc', background: '#fff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/shop' : `/shop?category=${cat.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '999px',
                border: '1px solid #eae6dc',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-main)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c5a059';
                e.currentTarget.style.background = '#fbf9f5';
                e.currentTarget.style.color = '#99752d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#eae6dc';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
            >
              <Gem size={14} color="#c5a059" /> {cat.name} ({cat.count})
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Best-Selling Creations */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">THE ATELIER ICONS</span>
            <h2>Most Cherished Creations</h2>
            <div className="gold-divider" />
            <p>
              Handcrafted in limited runs using ethically sourced stones. Discover our most sought-after engagement rings and fine jewelry.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`btn btn-sm ${activeCategoryTab === 'all' ? 'btn-primary' : 'btn-outline'}`}
            >
              All Highlights
            </button>
            <button
              onClick={() => setActiveCategoryTab('rings')}
              className={`btn btn-sm ${activeCategoryTab === 'rings' ? 'btn-primary' : 'btn-outline'}`}
            >
              Rings
            </button>
            <button
              onClick={() => setActiveCategoryTab('necklaces')}
              className={`btn btn-sm ${activeCategoryTab === 'necklaces' ? 'btn-primary' : 'btn-outline'}`}
            >
              Necklaces
            </button>
            <button
              onClick={() => setActiveCategoryTab('earrings')}
              className={`btn btn-sm ${activeCategoryTab === 'earrings' ? 'btn-primary' : 'btn-outline'}`}
            >
              Earrings
            </button>
            <button
              onClick={() => setActiveCategoryTab('bracelets')}
              className={`btn btn-sm ${activeCategoryTab === 'bracelets' ? 'btn-primary' : 'btn-outline'}`}
            >
              Bracelets
            </button>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/shop" className="btn btn-gold" style={{ padding: '16px 40px' }}>
              View Complete Boutique Collection ({products.length} Items) <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Editorial Spotlight Banner */}
      <section style={{ background: '#121212', color: '#ffffff', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', gap: '60px', padding: '80px 24px' }}>
          <div>
            <span className="subtitle" style={{ color: 'var(--gold-light)' }}>
              HAUTE ATELIER CRAFTSMANSHIP
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#ffffff', margin: '12px 0 20px', lineHeight: 1.2 }}>
              The Poetry of Ethical Fire &amp; Hand-Set Diamonds
            </h2>
            <p style={{ color: '#b5b0a3', fontSize: '1rem', lineHeight: 1.8, marginBottom: '28px', fontWeight: 300 }}>
              At The Unjellic, we reject the notion that luxury must compromise human rights or environmental stewardship. 
              Every diamond is independently certified conflict-free, hand-inspected for optical purity, and set in 100% recycled 
              precious metals by generational artisans.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#eae6dc' }}>
                <CheckCircle size={18} color="#c5a059" /> 100% Traceable Kimberly-Process Compliant Gems
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#eae6dc' }}>
                <CheckCircle size={18} color="#c5a059" /> Certified Solid 14K &amp; 18K Recycled Gold &amp; Platinum 950
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#eae6dc' }}>
                <CheckCircle size={18} color="#c5a059" /> Micro-Pavé Triple-Check Setting for Everyday Longevity
              </div>
            </div>
            <Link to="/about" className="btn btn-gold">
              Read Our Full Story <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
                alt="Jewellery Craftsmanship in Atelier"
                style={{ width: '100%', height: '460px', objectFit: 'cover' }}
              />
            </div>
            {/* Subtle floating gold seal */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'var(--gold-gradient)',
                color: '#121212',
                padding: '16px 24px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                boxShadow: 'var(--gold-glow)'
              }}
            >
              Certified Atelier Grade
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose The Unjellic Section */}
      <section className="section-padding" style={{ background: '#fdfcf9' }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">THE UNJELLIC PROMISE</span>
            <h2>Why Choose Our Atelier</h2>
            <div className="gold-divider" />
            <p>
              Uncompromising standards from initial hand sketch to the moment your heirloom arrives in our bespoke velvet presentation box.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '1px solid #eae6dc', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gem size={26} color="#c5a059" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>Conflict-Free Diamonds</h4>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                Every stone is rigorously vetted, certified by GIA/IGI, and guaranteed to adhere to strict ethical and ecological standards.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '1px solid #eae6dc', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={26} color="#c5a059" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>Master Goldsmithing</h4>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                Hand-forged by master bench jewelers with decades of traditional experience in micro-pavé, claw prongs, and filigree.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '1px solid #eae6dc', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={26} color="#c5a059" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>Lifetime Atelier Care</h4>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                Enjoy complimentary annual inspections, prong tightening, professional ultrasonic cleaning, and rhodium replating.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '1px solid #eae6dc', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197, 160, 89, 0.12)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={26} color="#c5a059" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '10px' }}>Bespoke Customization</h4>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', lineHeight: 1.6 }}>
                Collaborate with our head gemologist to customize center stones, metal alloys, personalized engravings, and bespoke settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">VOICES OF DEVOTION</span>
            <h2>Client Testimonials</h2>
            <div className="gold-divider" />
            <p>
              Read firsthand accounts from clients across the globe who marked their most treasured milestones with The Unjellic.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #eae6dc',
                  borderRadius: '4px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', color: '#d4af37', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#d4af37" stroke="#d4af37" />
                  ))}
                </div>

                <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#333', lineHeight: 1.7, marginBottom: '24px', flexGrow: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid #f2eee6', paddingTop: '16px' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', margin: 0, fontWeight: 600 }}>
                      {t.name}
                    </h5>
                    <span style={{ fontSize: '0.72rem', color: '#6b6860' }}>
                      {t.location} &bull; <strong style={{ color: '#c5a059' }}>Verified Client</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
