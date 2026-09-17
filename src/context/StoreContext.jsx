/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT STATE CONTEXT & STORE
   ========================================================================== */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS, CURRENCIES, COUPONS } from '../data/products.js';

const StoreContext = createContext(null);

const DEFAULT_SETTINGS = {
  fullName: 'Alex Vance',
  email: 'alex.vance@futuretech.io',
  phone: '+1 (555) 019-2834',
  timezone: typeof Intl !== 'undefined' && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'America/Los_Angeles',
  shippingAddress: {
    address: '742 Cybernetic Way, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    defaultSpeed: 'standard'
  },
  preferences: {
    currency: 'USD',
    theme: 'light',
    emailNotifications: true,
    vipDropsAlert: true
  },
  security: {
    twoFactorEnabled: false
  }
};

const DEFAULT_ORDERS = [
  {
    id: 'AURA-98214',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      { name: 'AURA Pulse Pro Wireless ANC', price: 349, quantity: 1, color: 'Obsidian Black' }
    ],
    shippingMethod: 'Express Priority',
    status: 'In Transit',
    statusStep: 3,
    total: 349,
    shippingAddress: { name: 'Alex Vance', city: 'San Francisco, CA' }
  }
];

function loadStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function StoreProvider({ children }) {
  // --- Persistent State ---
  const [cart, setCart] = useState(() => loadStorage('aura_cart', [
    { productId: 'aura-pulse-pro', quantity: 1, colorName: 'Obsidian Black', colorImg: PRODUCTS[0].colors[0].img }
  ]));

  const [wishlist, setWishlist] = useState(() => loadStorage('aura_wishlist', ['chronos-v-smartwatch']));
  const [currency, setCurrencyState] = useState(() => loadStorage('aura_currency', 'USD'));
  const [theme, setThemeState] = useState(() => loadStorage('aura_theme', 'light'));
  const [currentUser, setCurrentUser] = useState(() => loadStorage('aura_user', null));
  const [appliedCoupon, setAppliedCoupon] = useState(() => loadStorage('aura_coupon', null));
  const [orders, setOrders] = useState(() => loadStorage('aura_orders', DEFAULT_ORDERS));
  
  const [userSettings, setUserSettings] = useState(() => {
    const saved = loadStorage('aura_user_settings', DEFAULT_SETTINGS);
    const user = loadStorage('aura_user', null);
    if (user) {
      if (!saved.fullName || saved.fullName === 'Alex Vance') saved.fullName = user.name;
      if (!saved.email || saved.email === 'alex.vance@futuretech.io') saved.email = user.email;
    }
    return saved;
  });

  // --- Ephemeral UI State ---
  const [toasts, setToasts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState('profile');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync theme attribute on document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveStorage('aura_theme', theme);
  }, [theme]);

  // Persist State
  useEffect(() => { saveStorage('aura_cart', cart); }, [cart]);
  useEffect(() => { saveStorage('aura_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { saveStorage('aura_currency', currency); }, [currency]);
  useEffect(() => { saveStorage('aura_orders', orders); }, [orders]);
  useEffect(() => { saveStorage('aura_user', currentUser); }, [currentUser]);
  useEffect(() => { saveStorage('aura_coupon', appliedCoupon); }, [appliedCoupon]);
  useEffect(() => { saveStorage('aura_user_settings', userSettings); }, [userSettings]);

  // Global ESC key to close open modals & drawers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsAccountOpen(false);
        setIsCheckoutOpen(false);
        setIsTrackerOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast Notification Manager
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  // Theme & Currency Toggles
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next} mode`, 'info');
      return next;
    });
  }, [showToast]);

  const setCurrency = useCallback((curr) => {
    if (CURRENCIES[curr]) {
      setCurrencyState(curr);
      showToast(`Currency updated to ${curr}`, 'info');
    }
  }, [showToast]);

  // Price Formatter
  const formatPrice = useCallback((amountInUSD) => {
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const val = amountInUSD * curr.rate;
    return `${curr.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }, [currency]);

  // Cart Management
  const addToCart = useCallback((productId, quantity = 1, colorName = null, colorImg = null) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const selectedColor = colorName || product.colors[0].name;
    const selectedImg = colorImg || product.colors[0].img;

    setCart(prev => {
      const idx = prev.findIndex(item => item.productId === productId && item.colorName === selectedColor);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      } else {
        return [...prev, { productId, quantity, colorName: selectedColor, colorImg: selectedImg }];
      }
    });

    showToast(`Added "${product.name}" to your bag`, 'success');
  }, [showToast]);

  const updateCartQuantity = useCallback((index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], quantity };
      return next;
    });
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
    showToast('Removed item from bag', 'info');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Cart Totals Calculation
  const getCartTotals = useCallback(() => {
    let subtotalUSD = 0;
    let totalItems = 0;

    cart.forEach(item => {
      const prod = PRODUCTS.find(p => p.id === item.productId);
      if (prod) {
        subtotalUSD += prod.price * item.quantity;
        totalItems += item.quantity;
      }
    });

    let discountUSD = 0;
    let shippingUSD = subtotalUSD >= 150 || (appliedCoupon && appliedCoupon.freeShipping) ? 0 : 15;
    if (subtotalUSD === 0) shippingUSD = 0;

    if (appliedCoupon) {
      if (appliedCoupon.discountPercent) {
        discountUSD = (subtotalUSD * appliedCoupon.discountPercent) / 100;
      } else if (appliedCoupon.discountAmount) {
        if (!appliedCoupon.minOrder || subtotalUSD >= appliedCoupon.minOrder) {
          discountUSD = appliedCoupon.discountAmount;
        }
      }
    }

    const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);
    const curr = CURRENCIES[currency] || CURRENCIES.USD;

    return {
      totalItems,
      subtotalUSD,
      discountUSD,
      shippingUSD,
      totalUSD,
      subtotalConverted: subtotalUSD * curr.rate,
      discountConverted: discountUSD * curr.rate,
      shippingConverted: shippingUSD * curr.rate,
      totalConverted: totalUSD * curr.rate,
      currencySymbol: curr.symbol,
      freeShippingThreshold: 150,
      freeShippingRemaining: Math.max(0, 150 - subtotalUSD)
    };
  }, [cart, appliedCoupon, currency]);

  // Coupon Engine
  const applyCoupon = useCallback((code) => {
    const clean = code.trim().toUpperCase();
    if (COUPONS[clean]) {
      const couponObj = { code: clean, ...COUPONS[clean] };
      setAppliedCoupon(couponObj);
      showToast(`Coupon "${clean}" applied!`, 'success');
      return { success: true, message: COUPONS[clean].description };
    }
    showToast('Invalid or expired coupon code', 'error');
    return { success: false, message: 'Invalid promo code' };
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  }, [showToast]);

  // Wishlist
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist', 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  // Auth Operations
  const login = useCallback((email, password, name = null) => {
    const user = {
      email,
      name: name || (email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
      avatarLetter: (name || email)[0].toUpperCase(),
      loginTime: new Date().toISOString()
    };
    setCurrentUser(user);
    setUserSettings(prev => ({
      ...prev,
      fullName: user.name,
      email: user.email
    }));
    showToast(`Welcome back, ${user.name}!`, 'success');
    return user;
  }, [showToast]);

  const register = useCallback((name, email, password) => {
    const user = {
      email,
      name: name.trim(),
      avatarLetter: name.trim()[0].toUpperCase(),
      loginTime: new Date().toISOString()
    };
    setCurrentUser(user);
    setUserSettings(prev => ({
      ...prev,
      fullName: user.name,
      email: user.email
    }));
    showToast(`Welcome to AURA, ${user.name}!`, 'success');
    return user;
  }, [showToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAccountOpen(false);
    showToast('You have signed out', 'info');
  }, [showToast]);

  // User Settings Updater
  const updateUserSettings = useCallback((newSettings) => {
    setUserSettings(prev => {
      const merged = {
        ...prev,
        ...newSettings,
        shippingAddress: {
          ...prev.shippingAddress,
          ...(newSettings.shippingAddress || {})
        },
        preferences: {
          ...prev.preferences,
          ...(newSettings.preferences || {})
        },
        security: {
          ...prev.security,
          ...(newSettings.security || {})
        }
      };

      // Keep currentUser in sync if profile changed
      if (currentUser) {
        if (newSettings.fullName && newSettings.fullName !== currentUser.name) {
          setCurrentUser(u => ({ ...u, name: newSettings.fullName.trim(), avatarLetter: newSettings.fullName.trim()[0].toUpperCase() }));
        }
        if (newSettings.email && newSettings.email !== currentUser.email) {
          setCurrentUser(u => ({ ...u, email: newSettings.email.trim() }));
        }
      }

      // Sync currency and theme if changed in preferences
      if (newSettings.preferences?.currency && newSettings.preferences.currency !== currency) {
        setCurrencyState(newSettings.preferences.currency);
      }
      if (newSettings.preferences?.theme && newSettings.preferences.theme !== theme) {
        setThemeState(newSettings.preferences.theme);
      }

      return merged;
    });

    showToast('Account settings updated successfully', 'success');
  }, [currentUser, currency, theme, showToast]);

  // Orders
  const addOrder = useCallback((orderData) => {
    setOrders(prev => [orderData, ...prev]);
    clearCart();
    showToast(`Order #${orderData.id} placed successfully!`, 'success');
  }, [clearCart, showToast]);

  // Drawer & Modal Controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  const openAccount = (tab = 'profile') => {
    setAccountTab(tab);
    setIsAccountOpen(true);
  };
  const closeAccount = () => setIsAccountOpen(false);

  const openCheckout = () => {
    if (cart.length === 0) {
      showToast('Your bag is empty! Add items first.', 'error');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openTracker = (order = null) => {
    setActiveTrackingOrder(order || orders[0] || null);
    setIsTrackerOpen(true);
  };
  const closeTracker = () => setIsTrackerOpen(false);

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const value = {
    // State
    cart,
    wishlist,
    currency,
    theme,
    currentUser,
    userSettings,
    orders,
    appliedCoupon,
    toasts,
    isCartOpen,
    isWishlistOpen,
    isAccountOpen,
    accountTab,
    isCheckoutOpen,
    isTrackerOpen,
    activeTrackingOrder,
    quickViewProduct,

    // Methods
    formatPrice,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    isInWishlist,
    setCurrency,
    setTheme: setThemeState,
    toggleTheme,
    login,
    register,
    logout,
    updateUserSettings,
    addOrder,
    showToast,

    // Modals & Drawers
    openCart,
    closeCart,
    openWishlist,
    closeWishlist,
    openAccount,
    closeAccount,
    setAccountTab,
    openCheckout,
    closeCheckout,
    openTracker,
    closeTracker,
    openQuickView,
    closeQuickView
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
