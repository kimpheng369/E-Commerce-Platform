/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT FOOTER COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function Footer() {
  const { openTracker, openAccount, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Enrolled in VIP Drops dispatch & firmware signals', 'success');
      setNewsletterEmail('');
    }
  };

  const scrollToShop = (e) => {
    e.preventDefault();
    const shop = document.getElementById('shop-section');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <a href="#" className="brand-logo" onClick={scrollToShop}>
              <div className="brand-icon">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <span>AU<span className="accent">RA</span></span>
            </a>
            <p>Hardware engineered for high-bandwidth sensory fidelity and timeless spatial aesthetics.</p>
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <span>© 2026 AURA Hardware Labs</span>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li>
                <a href="#shop-section" onClick={scrollToShop}>
                  <i className="fa-solid fa-headphones" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Planar Audio
                </a>
              </li>
              <li>
                <a href="#shop-section" onClick={scrollToShop}>
                  <i className="fa-solid fa-stopwatch" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Titanium Wearables
                </a>
              </li>
              <li>
                <a href="#shop-section" onClick={scrollToShop}>
                  <i className="fa-solid fa-keyboard" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Mechanical Input
                </a>
              </li>
              <li>
                <a href="#shop-section" onClick={scrollToShop}>
                  <i className="fa-solid fa-lightbulb" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Circadian Lighting
                </a>
              </li>
              <li>
                <a href="#shop-section" onClick={scrollToShop}>
                  <i className="fa-solid fa-plug" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Desk Architecture
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Assistance</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openTracker();
                  }}
                >
                  <i className="fa-solid fa-truck-fast" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Order Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openAccount('profile');
                  }}
                >
                  <i className="fa-solid fa-gear" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Account Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Worldwide express shipping is free on all orders over $150.', 'info');
                  }}
                >
                  <i className="fa-solid fa-globe" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Global Shipping Rates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('All AURA devices come with a 2-Year Comprehensive Titanium Warranty.', 'info');
                  }}
                >
                  <i className="fa-solid fa-shield-halved" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Warranty & Repair
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Fully compatible with macOS, iOS, Windows 11, Linux, and Android.', 'info');
                  }}
                >
                  <i className="fa-solid fa-laptop-code" style={{ fontSize: '0.75rem', marginRight: '0.35rem' }}></i> Device Compatibility
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">VIP Drops & Signals</h4>
            <p style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              Join the dispatch for limited product drops, firmware releases, and private access.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" aria-label="Subscribe to VIP newsletter">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <div>All rights reserved. Designed with precision.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Zero trackers or advertising beacons.', 'info'); }}>Privacy Protocol</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('AURA standard hardware terms.', 'info'); }}>Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast('Compliant with FCC, CE, RoHS, and WEEE standards.', 'info'); }}>Regulatory Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
