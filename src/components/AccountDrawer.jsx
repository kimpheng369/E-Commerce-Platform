/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT ACCOUNT & SETTINGS DRAWER COMPONENT
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import TimezoneSuite from './TimezoneSuite.jsx';

export default function AccountDrawer() {
  const {
    isAccountOpen,
    closeAccount,
    accountTab,
    setAccountTab,
    userSettings,
    updateUserSettings,
    currentUser,
    logout,
    orders,
    wishlist,
    currency,
    setCurrency,
    theme,
    setTheme,
    formatPrice,
    openTracker,
    openWishlist,
    showToast
  } = useStore();

  // Local form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    timezone: 'UTC',
    shippingAddress: {
      address: '',
      city: '',
      state: '',
      postalCode: '',
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
  });

  // Sync form state when drawer opens or userSettings update
  useEffect(() => {
    if (userSettings) {
      setFormData({
        fullName: userSettings.fullName || (currentUser ? currentUser.name : 'Alex Vance'),
        email: userSettings.email || (currentUser ? currentUser.email : 'alex.vance@futuretech.io'),
        phone: userSettings.phone || '',
        timezone: userSettings.timezone || (typeof Intl !== 'undefined' && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'America/Los_Angeles'),
        shippingAddress: {
          address: userSettings.shippingAddress?.address || '',
          city: userSettings.shippingAddress?.city || '',
          state: userSettings.shippingAddress?.state || '',
          postalCode: userSettings.shippingAddress?.postalCode || '',
          country: userSettings.shippingAddress?.country || 'United States',
          defaultSpeed: userSettings.shippingAddress?.defaultSpeed || 'standard'
        },
        preferences: {
          currency: currency || 'USD',
          theme: theme || 'light',
          emailNotifications: userSettings.preferences?.emailNotifications !== false,
          vipDropsAlert: userSettings.preferences?.vipDropsAlert !== false
        },
        security: {
          twoFactorEnabled: !!userSettings.security?.twoFactorEnabled
        }
      });
    }
  }, [userSettings, currentUser, currency, theme, isAccountOpen]);

  if (!isAccountOpen) return null;

  const displayName = formData.fullName || (currentUser ? currentUser.name : 'Alex Vance');
  const displayEmail = formData.email || (currentUser ? currentUser.email : 'alex.vance@futuretech.io');
  const avatarLetter = (displayName[0] || 'A').toUpperCase();

  const handleSave = (e) => {
    e.preventDefault();
    updateUserSettings(formData);
    // Apply currency and theme if changed
    if (formData.preferences.currency !== currency) {
      setCurrency(formData.preferences.currency);
    }
    if (formData.preferences.theme !== theme) {
      setTheme(formData.preferences.theme);
    }
    showToast('Account settings synchronized successfully', 'success');
  };

  const handleSignOut = () => {
    logout();
    closeAccount();
  };

  return (
    <div
      className={`drawer-overlay ${isAccountOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeAccount(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Account and Settings"
    >
      <div className="drawer account-drawer">
        {/* Top Header */}
        <div className="drawer-header account-drawer-header">
          <div className="account-drawer-title-wrap">
            <div className="account-header-icon">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <div>
              <h3 className="drawer-title" style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Account Hub
              </h3>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Profile, hardware keys & preferences
              </span>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeAccount}
            aria-label="Close account drawer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body account-drawer-scrollable">
          {/* User Profile Hero Card */}
          <div className="account-hero-card">
            <div className="account-hero-top">
              <div className="account-hero-avatar">
                {avatarLetter}
                <span className="avatar-online-dot" title="Active Session"></span>
              </div>
              <div className="account-hero-details">
                <h4 className="account-hero-name">{displayName}</h4>
                <div className="account-hero-email">{displayEmail}</div>
                <div className="account-hero-tags">
                  <span className="badge-pill badge-vip">
                    <i className="fa-solid fa-crown"></i> VIP Member
                  </span>
                  <span className="account-id-badge">ID: #AUR-2026-88</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Metrics Bar */}
            <div className="account-stats-bar">
              <button
                type="button"
                className="account-stat-item"
                onClick={() => setAccountTab('orders')}
              >
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">
                  <i className="fa-solid fa-box" style={{ marginRight: '3px' }}></i> Orders
                </span>
              </button>
              <div className="stat-divider"></div>
              <button
                type="button"
                className="account-stat-item"
                onClick={() => {
                  closeAccount();
                  openWishlist();
                }}
              >
                <span className="stat-number">{wishlist.length}</span>
                <span className="stat-label">
                  <i className="fa-solid fa-heart" style={{ marginRight: '3px' }}></i> Saved
                </span>
              </button>
              <div className="stat-divider"></div>
              <div className="account-stat-item">
                <span className="stat-number">Tier 1</span>
                <span className="stat-label">
                  <i className="fa-solid fa-shield-halved" style={{ marginRight: '3px' }}></i> Founder
                </span>
              </div>
            </div>
          </div>

          {/* Segmented Navigation Tabs */}
          <div className="account-segmented-tabs" role="tablist">
            <button
              type="button"
              className={`account-segment-btn ${accountTab === 'profile' ? 'active' : ''}`}
              onClick={() => setAccountTab('profile')}
            >
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </button>
            <button
              type="button"
              className={`account-segment-btn ${accountTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setAccountTab('shipping')}
            >
              <i className="fa-solid fa-location-dot"></i>
              <span>Shipping</span>
            </button>
            <button
              type="button"
              className={`account-segment-btn ${accountTab === 'orders' ? 'active' : ''}`}
              onClick={() => setAccountTab('orders')}
            >
              <i className="fa-solid fa-box"></i>
              <span>Orders</span>
            </button>
            <button
              type="button"
              className={`account-segment-btn ${accountTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setAccountTab('preferences')}
            >
              <i className="fa-solid fa-gear"></i>
              <span>Preferences</span>
            </button>
          </div>

          {/* Form container */}
          <form id="account-settings-form" className="account-tab-content-form" onSubmit={handleSave}>
            {/* TAB: PROFILE */}
            {accountTab === 'profile' && (
              <div className="account-tab-panel animate-fade-in" id="panel-profile">
                <div className="form-group">
                  <label className="form-label" htmlFor="drawer-fullname">
                    <i className="fa-regular fa-user" style={{ marginRight: '0.25rem' }}></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="drawer-fullname"
                    className="form-input"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="drawer-email">
                    <i className="fa-regular fa-envelope" style={{ marginRight: '0.25rem' }}></i> Email Address
                  </label>
                  <input
                    type="email"
                    id="drawer-email"
                    className="form-input"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="drawer-phone">
                    <i className="fa-solid fa-phone" style={{ marginRight: '0.25rem' }}></i> Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="drawer-phone"
                    className="form-input"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* All 418 Worldwide Timezones Suite Component */}
                <TimezoneSuite
                  selectedTimezone={formData.timezone}
                  onTimezoneChange={(newTz) => setFormData({ ...formData, timezone: newTz })}
                />
              </div>
            )}

            {/* TAB: SHIPPING */}
            {accountTab === 'shipping' && (
              <div className="account-tab-panel animate-fade-in" id="panel-shipping">
                <div className="account-tip-banner">
                  <i className="fa-solid fa-circle-info"></i>
                  <span>This primary address pre-fills automatically during one-click express checkouts.</span>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label" htmlFor="drawer-address">
                    <i className="fa-solid fa-house" style={{ marginRight: '0.25rem' }}></i> Street Address
                  </label>
                  <input
                    type="text"
                    id="drawer-address"
                    className="form-input"
                    placeholder="742 Cybernetic Way, Suite 400"
                    required
                    value={formData.shippingAddress.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingAddress: { ...formData.shippingAddress, address: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="drawer-city">City</label>
                    <input
                      type="text"
                      id="drawer-city"
                      className="form-input"
                      required
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="drawer-state">State / Province</label>
                    <input
                      type="text"
                      id="drawer-state"
                      className="form-input"
                      required
                      value={formData.shippingAddress.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, state: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="drawer-postal">Postal / ZIP Code</label>
                    <input
                      type="text"
                      id="drawer-postal"
                      className="form-input"
                      required
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, postalCode: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="drawer-country">Country</label>
                    <select
                      id="drawer-country"
                      className="form-input"
                      value={formData.shippingAddress.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, country: e.target.value }
                        })
                      }
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                      <option value="France">France</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '0.5rem' }}>
                  <label className="form-label">Default Shipping Method</label>
                  <div className="settings-radio-group">
                    <label className={`settings-radio-card ${formData.shippingAddress.defaultSpeed !== 'express' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="drawerSpeed"
                        value="standard"
                        checked={formData.shippingAddress.defaultSpeed !== 'express'}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, defaultSpeed: 'standard' }
                          })
                        }
                      />
                      <div className="settings-radio-content">
                        <div className="settings-radio-title">
                          <span>Standard Air / Ground</span>
                          <strong style={{ color: '#10b981' }}>FREE ($150+)</strong>
                        </div>
                        <div className="settings-radio-desc">3–5 business days with tracked delivery</div>
                      </div>
                    </label>

                    <label className={`settings-radio-card ${formData.shippingAddress.defaultSpeed === 'express' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="drawerSpeed"
                        value="express"
                        checked={formData.shippingAddress.defaultSpeed === 'express'}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            shippingAddress: { ...formData.shippingAddress, defaultSpeed: 'express' }
                          })
                        }
                      />
                      <div className="settings-radio-content">
                        <div className="settings-radio-title">
                          <span>Express Priority Air</span>
                          <strong>$25.00</strong>
                        </div>
                        <div className="settings-radio-desc">1–2 business days via dedicated courier</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {accountTab === 'orders' && (
              <div className="account-tab-panel animate-fade-in" id="panel-orders">
                {orders.length === 0 ? (
                  <div className="empty-orders-view">
                    <div className="empty-orders-icon">
                      <i className="fa-solid fa-box-open"></i>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>No Active Shipments</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      You have not placed any hardware orders yet.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        closeAccount();
                        const shop = document.getElementById('shop-section');
                        if (shop) shop.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <i className="fa-solid fa-compass" style={{ marginRight: '0.35rem' }}></i> Explore Catalog
                    </button>
                  </div>
                ) : (
                  <div className="account-orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="account-order-card">
                        <div className="account-order-card-header">
                          <div>
                            <span className="order-ref-num">{order.id}</span>
                            <div className="order-date-str">
                              {new Date(order.date).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <span
                            className="badge-pill badge-sale"
                            style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}
                          >
                            <i className="fa-solid fa-truck-fast"></i> {order.status || 'In Transit'}
                          </span>
                        </div>

                        <div className="account-order-items-preview">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-preview-item">
                              <i className="fa-solid fa-circle-dot" style={{ fontSize: '0.45rem', color: 'var(--accent)' }}></i>
                              <span className="order-item-title">{item.name}</span>
                              <span className="order-item-qty">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="account-order-card-footer">
                          <div className="order-total-val">
                            Total: <strong>{formatPrice(order.total)}</strong>
                          </div>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm btn-drawer-track"
                            onClick={() => {
                              closeAccount();
                              openTracker(order);
                            }}
                          >
                            <i className="fa-solid fa-location-crosshairs" style={{ marginRight: '0.25rem' }}></i> Track Live
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: PREFERENCES */}
            {accountTab === 'preferences' && (
              <div className="account-tab-panel animate-fade-in" id="panel-preferences">
                <div className="form-group">
                  <label className="form-label" htmlFor="drawer-currency">
                    <i className="fa-solid fa-coins" style={{ marginRight: '0.25rem' }}></i> Store Currency
                  </label>
                  <select
                    id="drawer-currency"
                    className="form-input"
                    value={formData.preferences.currency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, currency: e.target.value }
                      })
                    }
                  >
                    <option value="USD">USD ($) - United States Dollar</option>
                    <option value="EUR">EUR (€) - Eurozone</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="drawer-theme">
                    <i className="fa-solid fa-palette" style={{ marginRight: '0.25rem' }}></i> Interface Aesthetic
                  </label>
                  <select
                    id="drawer-theme"
                    className="form-input"
                    value={formData.preferences.theme}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, theme: e.target.value }
                      })
                    }
                  >
                    <option value="light">Clean Minimalist (Light)</option>
                    <option value="dark">Obsidian Precision (Dark)</option>
                  </select>
                </div>

                <div className="account-sub-section">
                  <h5 className="sub-section-title">
                    <i className="fa-solid fa-shield-halved"></i> Security & Cryptographic Auth
                  </h5>
                  <div className="security-switch-card">
                    <div className="security-switch-info">
                      <strong>Two-Factor Authentication (2FA)</strong>
                      <p>Requires biometric or hardware security key verification upon sign-in.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.security.twoFactorEnabled}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            security: { ...formData.security, twoFactorEnabled: e.target.checked }
                          })
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="account-sub-section" style={{ marginTop: '1.25rem' }}>
                  <h5 className="sub-section-title">
                    <i className="fa-regular fa-bell"></i> Signals & Dispatches
                  </h5>
                  <div className="security-switch-card">
                    <div className="security-switch-info">
                      <strong>VIP Drops Alert</strong>
                      <p>Receive immediate alerts 1 hour before limited edition hardware releases.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.preferences.vipDropsAlert}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferences: { ...formData.preferences, vipDropsAlert: e.target.checked }
                          })
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Form Bottom Actions */}
            <div className="account-form-actions">
              <button type="submit" className="btn btn-primary btn-block" id="account-save-btn">
                <i className="fa-solid fa-check" style={{ marginRight: '0.35rem' }}></i> Save Account Settings
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block account-signout-btn"
                onClick={handleSignOut}
              >
                <i className="fa-solid fa-arrow-right-from-bracket" style={{ color: '#ef4444', marginRight: '0.35rem' }}></i> Sign Out of AURA
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
