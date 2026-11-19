import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Gem, Truck } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" aria-label="Hero Showcase">
      <div className="hero-background-overlay" />
      
      <div className="container hero-content-grid">
        {/* Left Column: Hero Text */}
        <div className="hero-text-column">
          <div className="hero-subtitle-pill">
            <Sparkles size={14} className="gold-sparkle-icon" />
            <span>HAUTE JOAILLERIE &bull; ATELIER 2026</span>
          </div>

          <h1 className="hero-title">
            Eternal Elegance, <br />
            <em>Masterfully Crafted.</em>
          </h1>

          <p className="hero-description">
            Discover bespoke engagement rings, luminous conflict-free diamonds, and 
            handcrafted 18K solid gold heirlooms designed to transcend time.
          </p>

          <div className="hero-cta-group">
            <Link to="/shop" className="btn btn-gold hero-btn">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-outline hero-btn-secondary">
              The Atelier Story
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="hero-metrics-bar">
            <div className="metric-box">
              <span className="metric-number">100%</span>
              <span className="metric-label">Ethical &amp; Conflict-Free</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-number">18K</span>
              <span className="metric-label">Solid Recycled Gold</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-number">4.9/5</span>
              <span className="metric-label">Client Distinction</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Frame */}
        <div className="hero-image-column">
          <div className="hero-frame-wrap">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85"
                alt="Luxury Solitaire Diamond Ring"
                className="hero-main-img"
              />
              <div className="hero-floating-badge">
                <Gem size={18} color="#c5a059" />
                <div>
                  <span className="badge-title">The Celestial Solitaire</span>
                  <span className="badge-subtitle">1.75ct VVS1 &bull; 18K Gold</span>
                </div>
              </div>
            </div>

            {/* Decorative Gold Border accents */}
            <div className="gold-frame-accent accent-top-left" />
            <div className="gold-frame-accent accent-bottom-right" />
          </div>
        </div>
      </div>

      {/* Trust Pillars Bar */}
      <div className="trust-pillars-bar">
        <div className="container trust-pillars-grid">
          <div className="pillar-item">
            <Award size={22} className="pillar-icon" />
            <div>
              <h4 className="pillar-title">Certified Authenticity</h4>
              <p className="pillar-desc">GIA &amp; IGI laboratory certificates included</p>
            </div>
          </div>

          <div className="pillar-item">
            <Truck size={22} className="pillar-icon" />
            <div>
              <h4 className="pillar-title">Complimentary Shipping</h4>
              <p className="pillar-desc">Fully insured express global delivery</p>
            </div>
          </div>

          <div className="pillar-item">
            <Shield size={22} className="pillar-icon" />
            <div>
              <h4 className="pillar-title">Lifetime Guarantee</h4>
              <p className="pillar-desc">Atelier warranty, prong checks &amp; cleaning</p>
            </div>
          </div>

          <div className="pillar-item">
            <Sparkles size={22} className="pillar-icon" />
            <div>
              <h4 className="pillar-title">Bespoke Customization</h4>
              <p className="pillar-desc">One-on-one custom atelier design services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
