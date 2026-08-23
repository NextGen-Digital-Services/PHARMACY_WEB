import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [promoDiscount, setPromoDiscount] = useState(0); // in percent
  const [appliedPromo, setAppliedPromo] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate cart from sessionStorage if available
  useEffect(() => {
    const savedCart = sessionStorage.getItem('vd_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedPromo = sessionStorage.getItem('vd_cart_promo');
    const savedDiscount = sessionStorage.getItem('vd_cart_discount');
    if (savedPromo && savedDiscount) {
      setAppliedPromo(savedPromo);
      setPromoDiscount(parseInt(savedDiscount, 10));
    }
  }, []);

  const saveCartToStorage = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem('vd_cart', JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    saveCartToStorage(newCart);
    setIsCartOpen(true); // Auto-open cart drawer on addition
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCartToStorage(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
    setPromoDiscount(0);
    setAppliedPromo('');
    setIsCartOpen(false);
    sessionStorage.removeItem('vd_cart');
    sessionStorage.removeItem('vd_cart_promo');
    sessionStorage.removeItem('vd_cart_discount');
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VITA10') {
      setPromoDiscount(10);
      setAppliedPromo('VITA10');
      sessionStorage.setItem('vd_cart_promo', 'VITA10');
      sessionStorage.setItem('vd_cart_discount', '10');
      return { success: true, message: 'Promo code applied! 10% discount has been applied.' };
    }
    return { success: false, message: 'Invalid promo code. Use VITA10 for 10% off.' };
  };

  const removePromoCode = () => {
    setPromoDiscount(0);
    setAppliedPromo('');
    sessionStorage.removeItem('vd_cart_promo');
    sessionStorage.removeItem('vd_cart_discount');
  };

  // Calculations
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = Math.round(cartSubtotal * (promoDiscount / 100));
  
  // Shipping rule: Free shipping over Rs 999, else Rs 99
  const shippingCharge = cartSubtotal === 0 ? 0 : (cartSubtotal >= 999 ? 0 : 99);
  const cartTotal = cartSubtotal - discountAmount + shippingCharge;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      discountAmount,
      shippingCharge,
      cartTotal,
      appliedPromo,
      promoDiscount,
      applyPromoCode,
      removePromoCode,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
