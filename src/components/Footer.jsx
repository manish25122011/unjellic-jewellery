import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to Unjellic Atelier Privileges. Enjoy 10% off your first order.', 'success');
    setEmail('');
  };

  return (
    <footer className="site-footer" aria-label="Site Footer">
      {/* Newsletter Section */}
      <div className="newsletter-banner">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <span className="subtitle">THE ATELIER CIRCLE</span>
            <h3>Receive Exclusive Previews &amp; Private Offers</h3>
            <p>
              Subscribe to enjoy early access to rare gem drops, bespoke exhibitions, and a complimentary 10% privilege on your first creation.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-gold" aria-label="Subscribe">
                {subscribed ? <Check size={18} /> : <>Subscribe <ArrowRight size={14} /></>}
              </button>
            </div>
            {subscribed && (
              <span className="newsletter-success-msg">
                &check; Thank you for joining the Unjellic Circle. Check your inbox shortly.
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container main-footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-brand-logo">
            <Sparkles size={18} className="gold-sparkle-icon" />
            <span className="brand-heading">THE UNJELLIC</span>
          </Link>
          <p className="footer-brand-tagline">
            Dedicated to the rare poetry of fine jewellery. Each creation is meticulously handcrafted 
            using 100% conflict-free lab and natural diamonds set in recycled 18K solid gold.
          </p>

          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Fine Jewellery</h4>
          <ul className="footer-link-list">
            <li><Link to="/shop?category=rings">Solitaire &amp; Eternity Rings</Link></li>
            <li><Link to="/shop?category=necklaces">Diamond Pendants &amp; Chokers</Link></li>
            <li><Link to="/shop?category=earrings">Diamond Studs &amp; Drops</Link></li>
            <li><Link to="/shop?category=bracelets">Classic Tennis Bracelets</Link></li>
            <li><Link to="/shop?collection=featured">Signature Heirlooms</Link></li>
          </ul>
        </div>

        {/* Atelier & Client Care */}
        <div className="footer-col">
          <h4 className="footer-heading">Client Services</h4>
          <ul className="footer-link-list">
            <li><Link to="/about">Our Story &amp; Craftsmanship</Link></li>
            <li><Link to="/contact">Book Private Atelier Appointment</Link></li>
            <li><Link to="/shop">Bespoke Design Consultation</Link></li>
            <li><Link to="/contact">Complimentary Sizing &amp; Care</Link></li>
            <li><Link to="/cart">Order Tracking &amp; Returns</Link></li>
          </ul>
        </div>

        {/* Flagship Boutique & Concierge */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Boutique &amp; Concierge</h4>
          <div className="footer-contact-item">
            <MapPin size={16} className="contact-icon" />
            <span>540 Madison Avenue, 9th Floor, New York, NY 10022</span>
          </div>
          <div className="footer-contact-item">
            <Phone size={16} className="contact-icon" />
            <span>+1 (800) 555-UNJELLIC</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={16} className="contact-icon" />
            <span>concierge@unjellic.com</span>
          </div>
          <div className="atelier-hours">
            <span className="hours-label">Private Viewing Hours:</span>
            <span>Mon &ndash; Sat: 10:00 AM &ndash; 7:00 PM EST</span>
          </div>
        </div>
      </div>

      {/* Payment & Copyright Strip */}
      <div className="footer-bottom-strip">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} The Unjellic Jewellery. All rights reserved. &bull; Designed &amp; Developed by Aman Pandey for Internship Viva &amp; Demonstration.
          </p>

          <div className="payment-badges-row">
            <span className="payment-pill">VISA</span>
            <span className="payment-pill">MASTERCARD</span>
            <span className="payment-pill">AMEX</span>
            <span className="payment-pill">APPLE PAY</span>
            <span className="payment-pill">PAYPAL</span>
            <span className="payment-pill">IGI / GIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
