import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems
  } = useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 250;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckoutRedirect = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Shopping Bag Drawer">
        {/* Drawer Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #eae6dc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#c5a059" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: 0, fontWeight: 600 }}>
              Shopping Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{ color: '#6b6860', padding: '6px', cursor: 'pointer', display: 'flex' }}
            aria-label="Close cart drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ background: '#fbf9f5', padding: '14px 24px', borderBottom: '1px solid #eae6dc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#1c1b18', marginBottom: '8px' }}>
            <Truck size={14} color="#c5a059" />
            {remainingForFreeShipping === 0 ? (
              <span>You have unlocked <strong>Free Insured Express Shipping!</strong></span>
            ) : (
              <span>
                Add <strong>${remainingForFreeShipping.toLocaleString()}</strong> more for <strong>Free Insured Shipping</strong>
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: '6px', background: '#e5e0d3', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'var(--gold-gradient)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f8f7f4', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={28} color="#c5a059" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '8px' }}>
                Your Shopping Bag is Empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6b6860', marginBottom: '24px' }}>
                Explore our curated fine jewellery and find an heirloom piece designed for you.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f0ece3'
                  }}
                >
                  <div style={{ width: '72px', height: '72px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: '#f7f6f2' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.3 }}>
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.72rem', color: '#6b6860', marginBottom: '8px' }}>
                      Size: {item.size} &bull; Metal: {item.material}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity controls */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          style={{ padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer' }}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span style={{ padding: '0 8px', fontSize: '0.8rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          style={{ padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer' }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{ color: '#9e9a90', padding: '4px', cursor: 'pointer' }}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #eae6dc', background: '#faf9f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#6b6860', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Estimated Subtotal:
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#1c1b18' }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>

            <p style={{ fontSize: '0.72rem', color: '#9e9a90', marginBottom: '16px' }}>
              Taxes and insured shipping calculated at checkout.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-gold"
                style={{ width: '100%' }}
                onClick={handleCheckoutRedirect}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-outline"
                style={{ width: '100%' }}
                onClick={handleCheckoutRedirect}
              >
                View Full Bag Details
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', fontSize: '0.7rem', color: '#6b6860' }}>
              <ShieldCheck size={14} color="#c5a059" /> 100% Encrypted &amp; Insured Checkout
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
