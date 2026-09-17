/* ==========================================================================
   AURA E-COMMERCE PLATFORM - HEADER COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { CURRENCIES } from '../data/products.js';

export default function Header({ onSearchChange, searchQuery }) {
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
    applyCoupon,
    showToast
  } = useStore();

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCopyPromo = () => {
    navigator.clipboard?.writeText('AURAFUTURE');
    applyCoupon('AURAFUTURE');
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>PRE-ORDER SPECIAL: COMPLIMENTARY EXPRESS AIR DELIVERY & 2-YEAR EXTENDED WARRANTY</span>
        <span
          className="announcement-promo"
          onClick={handleCopyPromo}
          title="Click to copy & apply code"
        >
          USE CODE: <strong>AURAFUTURE</strong>
        </span>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header" role="banner">
        <div className="container header-content">
          
          {/* Brand Logo */}
          <a href="#" className="brand-logo" aria-label="AURA Home">
            <div className="brand-icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <span>AU<span className="accent">RA</span></span>
          </a>

          {/* Quick Search Box */}
          <div className="header-search-wrap">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              className="header-search-input"
              placeholder="Search instruments, audio, wearables..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search catalog"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Header Action Controls */}
          <div className="header-actions">
            
            {/* Currency Selector */}
            <div className="currency-selector-wrap">
              <select
                className="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Select currency"
              >
                {Object.keys(CURRENCIES).map(code => (
                  <option key={code} value={code}>{CURRENCIES[code].name}</option>
                ))}
              </select>
            </div>

            {/* Visual Theme Toggle */}
            <button
              className="header-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle visual theme"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {/* Saved Devices / Wishlist Button */}
            <button
              className="header-btn wishlist-header-btn"
              onClick={openWishlist}
              title="Saved Devices"
              aria-label="Open wishlist"
            >
              <i className="fa-solid fa-heart"></i>
              {wishlist.length > 0 && (
                <span className="badge-count wishlist-count-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              className="header-btn cart-header-btn"
              onClick={openCart}
              title="Shopping Bag"
              aria-label="Open shopping bag"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              {totalCartItems > 0 && (
                <span className="badge-count cart-count-badge">{totalCartItems}</span>
              )}
            </button>

            {/* User Profile Pill -> Opens Account Drawer */}
            <div className="header-user-wrapper">
              {currentUser ? (
                <button
                  className="header-btn user-profile-btn"
                  onClick={() => openAccount('profile')}
                  title={`Account Hub (${currentUser.name})`}
                  aria-label="Open Account Hub"
                >
                  <span className="user-avatar-circle">{currentUser.avatarLetter}</span>
                  <span className="user-name-label">{currentUser.name.split(' ')[0]}</span>
                  <i className="fa-solid fa-sliders" style={{ fontSize: '0.65rem', marginLeft: '0.25rem', color: 'var(--text-muted)' }}></i>
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => showToast('Please authenticate at the gateway', 'info')}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  <i className="fa-regular fa-user" style={{ marginRight: '0.25rem' }}></i> Sign In
                </button>
              )}
            </div>

          </div>

        </div>
      </header>
    </>
  );
}
