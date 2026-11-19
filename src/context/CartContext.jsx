import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

const CART_STORAGE_KEY = 'unjellic_jewellery_cart';
const WISHLIST_STORAGE_KEY = 'unjellic_jewellery_wishlist';

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  // Load initial wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage:', e);
      return [];
    }
  });

  // Slide-out quick cart drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // Add item to cart
  const addToCart = (product, size = null, material = null, quantity = 1, openDrawer = true) => {
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const selectedMaterial = material || (product.materials && product.materials.length > 0 ? product.materials[0] : 'Standard');
    const cartItemId = `${product.id}-${selectedSize}-${selectedMaterial}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: selectedSize,
            material: selectedMaterial,
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  // Remove single item from cart
  const removeFromCart = (cartItemId) => {
    const itemToRemove = cart.find((i) => i.cartItemId === cartItemId);
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.name}" from shopping bag.`, 'info');
    }
  };

  // Update quantity of an item
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist.`, 'success');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Apply discount coupon
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'UNJELLIC10') {
      setAppliedCoupon({ code: 'UNJELLIC10', discountPercent: 10, type: 'percent', label: '10% Off Privilege' });
      showToast('Coupon "UNJELLIC10" applied! 10% discount added.', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'GOLDEN50') {
      setAppliedCoupon({ code: 'GOLDEN50', discountAmount: 50, type: 'fixed', label: '$50 Off Welcome Gift' });
      showToast('Coupon "GOLDEN50" applied! $50 discount added.', 'success');
      return { success: true, message: '$50 discount applied!' };
    } else {
      showToast('Invalid promo code. Try "UNJELLIC10"', 'error');
      return { success: false, message: 'Invalid promo code. Use code UNJELLIC10' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Calculation helpers
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  // Free shipping on orders over $250
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 25;
  const estimatedTax = subtotal > 0 ? Math.round((subtotal - discount) * 0.05) : 0;
  const finalTotal = Math.max(0, subtotal - discount + shipping + estimatedTax);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        estimatedTax,
        finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        setQuickViewProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
