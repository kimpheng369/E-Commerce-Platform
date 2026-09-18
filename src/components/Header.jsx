/* ==========================================================================
   AURA E-COMMERCE PLATFORM - LUXURY SENSORY HEADER COMPONENT
   ========================================================================== */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { CURRENCIES } from '../data/products.js';

export default function Header({ onSearchChange = () => {}, searchQuery = '' }) {
  const {
    cart,
    wishlist,
    currency,
    setCurrency,
    theme,
    toggleTheme,
    currentUser,
    openCart,
    openWishlist,
    openAccount,
    openAuth,
    openTracker,
    showToast
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  // Detect scroll for dynamic header elevation/blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Pressing '/' or 'Cmd/Ctrl + K' focuses search
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

      if ((e.key === '/' && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation click handler
  const handleNavClick = (categoryId) => {
    setMobileMenuOpen(false);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
      // If a specific category was clicked, trigger that category button in Catalog
      if (categoryId) {
        setTimeout(() => {
          const categoryButtons = document.querySelectorAll('.category-tab');
          categoryButtons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(categoryId.toLowerCase())) {
              btn.click();
            }
          });
        }, 400);
      }
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container header-inner">
          
          {/* LEFT ZONE: Brand Logo & Navigation Links */}
          <div className="header-left-zone">
            
            {/* Brand Logo Lockup */}
            <a href="#" className="brand-logo" aria-label="AURA Home">
              <div className="brand-icon-wrapper">
                <div className="brand-icon">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <div className="brand-icon-glow"></div>
              </div>
              <div className="brand-text-block">
                <span className="brand-title">AU<span className="accent">RA</span></span>
                <span className="brand-kicker">ATELIER // LABS</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="header-nav-menu" aria-label="Primary Navigation">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => handleNavClick('all')}
              >
                Catalog
              </button>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => handleNavClick('audio')}
              >
                Acoustics
              </button>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => handleNavClick('wearables')}
              >
                Wearables
              </button>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => handleNavClick('workstations')}
              >
                Workstations
              </button>
              <button
                type="button"
                className="nav-link-btn nav-link-radar"
                onClick={() => openTracker()}
                title="Track active orders & shipments"
              >
                <span className="radar-dot"></span>
                Order Radar
              </button>
            </nav>

          </div>

          {/* CENTER ZONE: Sleek Pill Live Search */}
          <div className={`header-search-wrap ${searchFocused ? 'focused' : ''}`}>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              ref={searchInputRef}
              type="text"
              className="header-search-input"
              placeholder="Search acoustic hardware, titanium wearables, studio desks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search catalog"
            />
            {searchQuery ? (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                title="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            ) : (
              <span className="search-shortcut-pill" title="Press '/' or 'Ctrl+K' to search">
                /
              </span>
            )}
          </div>

          {/* RIGHT ZONE: Utility Controls, Actions & Profile */}
          <div className="header-actions">
            
            {/* Custom Currency Selector Pill */}
            <div className="currency-selector-pill">
              <i className="fa-solid fa-globe globe-icon"></i>
              <select
                className="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Select currency"
              >
                {Object.keys(CURRENCIES).map(code => (
                  <option key={code} value={code}>
                    {code} ({CURRENCIES[code].symbol})
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down chevron-icon"></i>
            </div>

            {/* Visual Theme Toggle */}
            <button
              type="button"
              className="header-action-btn theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle visual theme"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {/* Saved Devices / Wishlist Button */}
            <button
              type="button"
              className="header-action-btn wishlist-btn"
              onClick={openWishlist}
              title="Saved Instruments"
              aria-label="Open wishlist"
            >
              <i className="fa-solid fa-heart"></i>
              {wishlist.length > 0 && (
                <span className="action-badge wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              className="header-action-btn cart-btn"
              onClick={openCart}
              title="Shopping Bag"
              aria-label="Open shopping bag"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              {totalCartItems > 0 && (
                <span className="action-badge cart-badge bump">{totalCartItems}</span>
              )}
            </button>

            {/* User Profile Pill or Sign In Button */}
            <div className="header-user-wrapper">
              {currentUser ? (
                <button
                  type="button"
                  className="user-profile-pill"
                  onClick={() => openAccount('profile')}
                  title={`Terminal Profile: ${currentUser.name}`}
                  aria-label="Open User Account Terminal"
                >
                  <div className="user-avatar-circle">
                    {currentUser.avatarLetter || currentUser.name[0]}
                    <span className="user-online-dot"></span>
                  </div>
                  <div className="user-info-text">
                    <span className="user-name-label">{currentUser.name.split(' ')[0]}</span>
                    <span className="user-tier-label">VIP ATELIER</span>
                  </div>
                  <i className="fa-solid fa-sliders user-sliders-icon"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className="header-signin-btn"
                  onClick={openAuth}
                  aria-label="Sign in to AURA"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Navigation Toggle Button */}
            <button
              type="button"
              className="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>

          </div>

        </div>

        {/* MOBILE NAVIGATION DRAWER / DROPDOWN */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-search-wrap">
              <i className="fa-solid fa-magnifying-glass mobile-search-icon"></i>
              <input
                type="text"
                className="mobile-search-input"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div className="mobile-nav-links">
              <button
                type="button"
                className="mobile-nav-item"
                onClick={() => handleNavClick('all')}
              >
                <i className="fa-solid fa-border-all"></i>
                <span>Complete Catalog</span>
              </button>
              <button
                type="button"
                className="mobile-nav-item"
                onClick={() => handleNavClick('audio')}
              >
                <i className="fa-solid fa-headphones"></i>
                <span>Audio & Acoustics</span>
              </button>
              <button
                type="button"
                className="mobile-nav-item"
                onClick={() => handleNavClick('wearables')}
              >
                <i className="fa-solid fa-stopwatch"></i>
                <span>Wearables</span>
              </button>
              <button
                type="button"
                className="mobile-nav-item"
                onClick={() => handleNavClick('workstations')}
              >
                <i className="fa-solid fa-keyboard"></i>
                <span>Workstations</span>
              </button>
              <button
                type="button"
                className="mobile-nav-item"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTracker();
                }}
              >
                <i className="fa-solid fa-satellite-dish" style={{ color: '#38bdf8' }}></i>
                <span>Order Radar & Tracking</span>
              </button>
            </div>

            <div className="mobile-nav-footer">
              <div className="mobile-currency-row">
                <span className="mobile-meta-label">Currency:</span>
                <select
                  className="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {Object.keys(CURRENCIES).map(code => (
                    <option key={code} value={code}>
                      {code} ({CURRENCIES[code].name})
                    </option>
                  ))}
                </select>
              </div>

              {!currentUser && (
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuth();
                  }}
                  style={{ marginTop: '0.75rem' }}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '0.45rem' }}></i>
                  Sign In to AURA Terminal
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
