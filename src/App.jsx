/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT ROOT APP COMPONENT
   ========================================================================== */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustBadges from './components/TrustBadges.jsx';
import Catalog from './components/Catalog.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import WishlistDrawer from './components/WishlistDrawer.jsx';
import AccountDrawer from './components/AccountDrawer.jsx';
import QuickViewModal from './components/QuickViewModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import OrderTrackerModal from './components/OrderTrackerModal.jsx';
import AuthGatewayModal from './components/AuthGatewayModal.jsx';
import ToastContainer from './components/ToastContainer.jsx';

function StoreLayout() {
  const { applyCoupon, openCart } = useStore();

  const handleApplyPromo = () => {
    applyCoupon('AURAFUTURE');
    openCart();
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="announcement-bar" role="complementary" aria-label="Store Announcement">
        <span>
          <i className="fa-solid fa-plane-departure" style={{ marginRight: '0.35rem' }}></i>
          Free Worldwide Express Priority on all orders over $150
        </span>
        <button
          type="button"
          className="badge"
          id="announcement-promo-copy"
          title="Click to auto-apply code"
          onClick={handleApplyPromo}
        >
          <i className="fa-solid fa-tag" style={{ marginRight: '0.25rem' }}></i>
          Use Code: <strong>AURAFUTURE</strong> for 15% OFF
        </button>
      </aside>

      {/* Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <TrustBadges />
        <Catalog />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Global Modals & Slide-out Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <AccountDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <OrderTrackerModal />
      <AuthGatewayModal />
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreLayout />
    </StoreProvider>
  );
}
