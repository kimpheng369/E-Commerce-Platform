/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT ROOT APP COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext.jsx';
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleExploreClick = () => {
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onExploreClick={handleExploreClick} />
        <TrustBadges />
        <Catalog searchQuery={searchQuery} />
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
