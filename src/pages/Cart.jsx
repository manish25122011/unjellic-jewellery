import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Sparkles,
  Tag,
  X
} from 'lucide-react';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shipping,
    estimatedTax,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Checkout form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card'
  });

  const [formErrors, setFormErrors] = useState({});

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    applyCoupon(couponCode);
    setCouponCode('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateCheckoutForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateCheckoutForm()) {
      showToast('Please fill out all required shipping fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `UNJ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
      showToast(`Order confirmed! Order #${generatedId}`, 'success');
    }, 1500);
  };

  // If cart is completely empty and no completed order modal is open
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="cart-page">
        <section style={{ background: '#fcfbf9', borderBottom: '1px solid #eae6dc', padding: '60px 0 40px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="subtitle">SHOPPING BAG</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', margin: '8px 0 14px' }}>
              Your Bag is Empty
            </h1>
            <div className="gold-divider" />
          </div>
        </section>

        <div className="container section-padding" style={{ textAlign: 'center', maxWidth: '540px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#f8f7f4',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #eae6dc'
            }}
          >
            <ShoppingBag size={36} color="#c5a059" />
          </div>
          <p style={{ color: '#6b6860', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            You currently have no creations saved in your shopping bag. Explore our collection of 
            handcrafted conflict-free engagement rings, diamond necklaces, earrings, and tennis bracelets.
          </p>
          <Link to="/shop" className="btn btn-gold" style={{ padding: '16px 36px' }}>
            Explore Catalogue <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Banner */}
      <section style={{ background: '#fcfbf9', borderBottom: '1px solid #eae6dc', padding: '50px 0 30px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="subtitle">REVIEW &amp; CHECKOUT</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', margin: '6px 0 10px' }}>
            Your Shopping Bag
          </h1>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Left: Cart Items List */}
          <div style={{ flex: '1 1 60%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #eae6dc' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Item Description
              </span>
              <button
                onClick={clearCart}
                style={{ fontSize: '0.75rem', color: '#b00020', textDecoration: 'underline', cursor: 'pointer', background: 'none' }}
              >
                Clear Entire Bag
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #f2eee6',
                    alignItems: 'center'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: '90px', height: '90px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: '#f8f7f4' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Info */}
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '4px' }}>
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#6b6860', marginBottom: '10px' }}>
                      Size: <strong>{item.size}</strong> &bull; Metal: <strong>{item.material}</strong>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#1c1b18', fontWeight: 600 }}>
                      ${item.price.toLocaleString()} each
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      style={{ padding: '6px 12px', background: '#f8f8f8', cursor: 'pointer' }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span style={{ padding: '0 12px', fontWeight: 600, fontSize: '0.9rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      style={{ padding: '6px 12px', background: '#f8f8f8', cursor: 'pointer' }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal & Delete */}
                  <div style={{ textAlign: 'right', minWidth: '90px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{ color: '#9e9a90', padding: '4px', cursor: 'pointer' }}
                      title="Remove from bag"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to="/shop" style={{ fontSize: '0.85rem', color: '#c5a059', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                &larr; Continue Shopping More Fine Jewellery
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div
            style={{
              background: '#fcfbf9',
              border: '1px solid #eae6dc',
              borderRadius: '4px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '20px' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', borderBottom: '1px solid #eae6dc', paddingBottom: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b6860' }}>Subtotal:</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2e7d32' }}>
                  <span>Discount ({appliedCoupon?.code}):</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b6860' }}>Insured Worldwide Shipping:</span>
                <span>{shipping === 0 ? <strong style={{ color: '#2e7d32' }}>Complimentary (Free)</strong> : `$${shipping}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b6860' }}>Estimated Sales Tax:</span>
                <span>${estimatedTax.toLocaleString()}</span>
              </div>
            </div>

            {/* Total Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>Total:</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: '#1c1b18' }}>
                ${finalTotal.toLocaleString()}
              </span>
            </div>

            {/* Promo Code Form */}
            <div style={{ marginBottom: '24px' }}>
              {appliedCoupon ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#e8f5e9', padding: '10px 14px', borderRadius: '4px', fontSize: '0.8rem', color: '#2e7d32' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={14} /> Coupon <strong>{appliedCoupon.code}</strong> Applied
                  </div>
                  <button onClick={removeCoupon} style={{ color: '#b00020', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter code (e.g. UNJELLIC10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.85rem', padding: '10px 12px' }}
                  />
                  <button type="submit" className="btn btn-sm btn-outline">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px 20px', fontSize: '0.9rem' }}
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              Proceed to Secure Checkout <ArrowRight size={16} />
            </button>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: '#6b6860', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#c5a059" /> Encrypted 256-Bit SSL Checkout Protection
              </div>
              <div>Free Returns &bull; GIA/IGI Authenticity Card Included</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setIsCheckoutModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '36px' }}>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer', padding: '6px' }}
              aria-label="Close checkout"
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="subtitle">ATELIER CONCIERGE</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: '4px 0 8px' }}>
                Express Insured Checkout
              </h2>
              <div style={{ background: '#fff9e6', border: '1px solid #f3deb1', padding: '8px 14px', borderRadius: '4px', fontSize: '0.75rem', color: '#8a6214' }}>
                &bull; <strong>Internship Viva Simulation:</strong> This is a secure front-end demonstration. No real payment charge will occur.
              </div>
            </div>

            <form onSubmit={handlePlaceOrder}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
                1. Delivery &amp; Contact Details
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Eleanor"
                  />
                  {formErrors.firstName && <span className="form-error">{formErrors.firstName}</span>}
                </div>
                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Vance"
                  />
                  {formErrors.lastName && <span className="form-error">{formErrors.lastName}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="eleanor@example.com"
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+1 (555) 019-2831"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label className="form-label">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="742 Evergreen Terrace, Suite 4B"
                />
                {formErrors.address && <span className="form-error">{formErrors.address}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="New York"
                  />
                  {formErrors.city && <span className="form-error">{formErrors.city}</span>}
                </div>
                <div>
                  <label className="form-label">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="10022"
                  />
                  {formErrors.postalCode && <span className="form-error">{formErrors.postalCode}</span>}
                </div>
                <div>
                  <label className="form-label">Country</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="form-select">
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
                2. Payment Simulation
              </h4>
              <div style={{ background: '#f8f7f4', padding: '14px 18px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" checked readOnly id="card-sim" />
                  <label htmlFor="card-sim" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Credit / Debit Card Simulation (Test Mode)
                  </label>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#6b6860' }}>Visa &bull; MC &bull; Amex</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '18px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Amount Due:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1c1b18' }}>
                  ${finalTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gold"
                style={{ width: '100%', padding: '16px', fontSize: '0.95rem' }}
              >
                {isSubmitting ? 'Securing & Placing Order...' : `Confirm & Place Order ($${finalTotal.toLocaleString()})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Complete Success View */}
      {orderComplete && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '540px', padding: '40px', textAlign: 'center' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#e8f5e9',
                margin: '0 auto 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle2 size={36} color="#2e7d32" />
            </div>

            <span className="subtitle">TRANSACTION CONFIRMED</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', margin: '8px 0 12px' }}>
              Thank You for Your Order
            </h2>

            <p style={{ color: '#6b6860', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Your order has been registered in the atelier database. A bespoke presentation chest will be 
              prepared and dispatched with full insurance coverage.
            </p>

            <div style={{ background: '#f8f7f4', border: '1px solid #eae6dc', borderRadius: '4px', padding: '16px', marginBottom: '28px', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: '6px' }}>
                Order Identification Number: <strong style={{ color: '#c5a059' }}>#{orderId}</strong>
              </div>
              <div style={{ color: '#6b6860' }}>
                Estimated Insured Dispatch: <strong>2 Business Days</strong>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setOrderComplete(false);
                setIsCheckoutModalOpen(false);
                navigate('/shop');
              }}
            >
              Return to Fine Jewellery Collection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
