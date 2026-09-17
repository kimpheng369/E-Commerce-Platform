/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT CHECKOUT MODAL COMPONENT
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    clearCart,
    getCartTotals,
    formatPrice,
    currentUser,
    userSettings,
    addOrder,
    openTracker,
    showToast
  } = useStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  const [shippingData, setShippingData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@futuretech.io',
    address: '742 Cybernetic Way, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    method: 'standard'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '4532 8892 1049 8892',
    cardHolder: 'ALEX VANCE',
    expiry: '08/29',
    cvv: '882'
  });

  // Sync defaults when checkout opens
  useEffect(() => {
    if (isCheckoutOpen) {
      setCurrentStep(1);
      setIsCardFlipped(false);

      const s = userSettings || {};
      const ship = s.shippingAddress || {};
      const user = currentUser || {};

      setShippingData(prev => ({
        fullName: s.fullName || user.name || prev.fullName,
        email: s.email || user.email || prev.email,
        address: ship.address || prev.address,
        city: ship.city || prev.city,
        state: ship.state || prev.state,
        postalCode: ship.postalCode || prev.postalCode,
        country: ship.country || prev.country,
        method: ship.defaultSpeed || prev.method
      }));

      const name = s.fullName || user.name || 'ALEX VANCE';
      setPaymentData(prev => ({
        ...prev,
        cardHolder: name.toUpperCase()
      }));
    }
  }, [isCheckoutOpen, userSettings, currentUser]);

  if (!isCheckoutOpen) return null;

  const totals = getCartTotals();
  const speedCost = shippingData.method === 'priority' ? 25 : 0;
  const finalTotalUSD = totals.totalUSD + speedCost;

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const handleCompleteOrder = (methodUsed = 'Credit Card') => {
    const orderId = `AURA-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart.map(c => {
        const prod = PRODUCTS.find(p => p.id === c.productId);
        return {
          name: prod ? prod.name : 'AURA Precision Device',
          price: prod ? prod.price : 0,
          quantity: c.quantity,
          color: c.colorName
        };
      }),
      shippingMethod: shippingData.method === 'priority' ? 'Next-Flight Express Air' : 'Standard Insured Delivery',
      paymentMethod: methodUsed,
      status: 'Order Placed',
      statusStep: 1,
      total: finalTotalUSD,
      shippingAddress: {
        name: shippingData.fullName,
        city: `${shippingData.city}, ${shippingData.postalCode}`
      }
    };

    addOrder(newOrder);
    setLastPlacedOrder(newOrder);
    setCurrentStep(3);

    // Confetti celebration
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    handleCompleteOrder('Credit Card');
  };

  const handleExpressPay = (provider) => {
    showToast(`Authenticated via ${provider}`, 'success');
    handleCompleteOrder(provider);
  };

  return (
    <div
      className={`modal-overlay ${isCheckoutOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      onClick={(e) => { if (e.target === e.currentTarget) closeCheckout(); }}
    >
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeCheckout}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="checkout-modal-inner">
          {currentStep < 3 && (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem', textAlign: 'center' }}>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: '0.35rem', fontSize: '1.25rem' }}></i> Express Checkout
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                Fast, encrypted 256-bit secure transaction
              </p>

              {/* Progress Indicators */}
              <div className="checkout-steps-nav">
                <div className={`checkout-step-indicator ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                  <div className="step-circle">{currentStep > 1 ? <i className="fa-solid fa-check"></i> : '1'}</div>
                  <span className="step-label">Shipping</span>
                </div>
                <div className={`checkout-step-indicator ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                  <div className="step-circle">{currentStep > 2 ? <i className="fa-solid fa-check"></i> : '2'}</div>
                  <span className="step-label">Payment</span>
                </div>
                <div className={`checkout-step-indicator ${currentStep === 3 ? 'active' : ''}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">Confirmation</span>
                </div>
              </div>
            </>
          )}

          {/* STEP 1: SHIPPING DETAILS */}
          {currentStep === 1 && (
            <form id="shipping-form" style={{ marginTop: '1.25rem' }} onSubmit={handleShippingSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="ship-name">Full Name</label>
                  <input
                    type="text"
                    id="ship-name"
                    className="form-input"
                    required
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="ship-email">Email Address</label>
                  <input
                    type="email"
                    id="ship-email"
                    className="form-input"
                    required
                    value={shippingData.email}
                    onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ship-address">Street Address</label>
                <input
                  type="text"
                  id="ship-address"
                  className="form-input"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="ship-city">City</label>
                  <input
                    type="text"
                    id="ship-city"
                    className="form-input"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="ship-postal">Postal Code</label>
                  <input
                    type="text"
                    id="ship-postal"
                    className="form-input"
                    required
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Delivery Speed</label>
                <div className="shipping-options">
                  <label className={`shipping-option-card ${shippingData.method === 'standard' ? 'selected' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input
                        type="radio"
                        name="shipping-speed"
                        value="standard"
                        checked={shippingData.method === 'standard'}
                        onChange={() => setShippingData({ ...shippingData, method: 'standard' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          <i className="fa-solid fa-truck" style={{ marginRight: '0.35rem' }}></i> Standard Insured Delivery
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Estimated 3-5 business days</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 600 }}>
                      {totals.shippingUSD === 0 ? <span style={{ color: '#10b981' }}>FREE</span> : formatPrice(totals.shippingUSD)}
                    </span>
                  </label>

                  <label className={`shipping-option-card ${shippingData.method === 'priority' ? 'selected' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input
                        type="radio"
                        name="shipping-speed"
                        value="priority"
                        checked={shippingData.method === 'priority'}
                        onChange={() => setShippingData({ ...shippingData, method: 'priority' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          <i className="fa-solid fa-plane-up" style={{ marginRight: '0.35rem' }}></i> Next-Flight Express Air
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Delivered within 24-48 hours</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 600 }}>{formatPrice(25)}</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem' }}>
                <div style={{ fontWeight: 600 }}>
                  Total: <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{formatPrice(finalTotalUSD)}</span>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" id="btn-to-payment">
                  Continue to Payment
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.35rem' }}></i>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT & 3D INTERACTIVE CARD */}
          {currentStep === 2 && (
            <div className="payment-step-wrap">
              {/* Express 1-Click Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem', fontWeight: 600 }}
                  onClick={() => handleExpressPay('Apple Pay')}
                >
                  <i className="fa-brands fa-apple" style={{ fontSize: '1.15rem', marginRight: '0.35rem' }}></i>
                  Apple Pay
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem', fontWeight: 600 }}
                  onClick={() => handleExpressPay('Google Pay')}
                >
                  <i className="fa-brands fa-google" style={{ fontSize: '1.05rem', marginRight: '0.35rem' }}></i>
                  Google Pay
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
                <span>OR PAY WITH CARD</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
              </div>

              {/* 3D Interactive Card Preview */}
              <div className="credit-card-container">
                <div className={`credit-card-inner ${isCardFlipped ? 'flipped' : ''}`} id="interactive-card-3d">
                  {/* Card Front */}
                  <div className="credit-card-front">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="card-chip"></div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}>
                        AURA
                      </div>
                    </div>

                    <div className="card-number-display">
                      {paymentData.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="card-info-bottom">
                      <div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase' }}>Cardholder</div>
                        <div className="card-holder-name">{paymentData.cardHolder || 'ALEX VANCE'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase' }}>Expires</div>
                        <div className="card-expiry-display">{paymentData.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Back (Flipped on CVV) */}
                  <div className="credit-card-back">
                    <div className="card-magnetic-bar"></div>
                    <div className="card-cvv-band">
                      <span>{paymentData.cvv || '•••'}</span>
                    </div>
                    <div style={{ padding: '0 1.35rem', fontSize: '0.65rem', opacity: 0.6, textAlign: 'right' }}>
                      Security Code
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Form */}
              <form id="payment-form" onSubmit={handlePaymentSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="card-num-input">Card Number</label>
                  <input
                    type="text"
                    id="card-num-input"
                    className="form-input"
                    required
                    maxLength="19"
                    value={paymentData.cardNumber}
                    placeholder="4532 8892 1049 8892"
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setPaymentData({ ...paymentData, cardNumber: formatted });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="card-holder-input">Cardholder Name</label>
                  <input
                    type="text"
                    id="card-holder-input"
                    className="form-input"
                    required
                    value={paymentData.cardHolder}
                    placeholder="ALEX VANCE"
                    onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value.toUpperCase() })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-exp-input">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      id="card-exp-input"
                      className="form-input"
                      required
                      maxLength="5"
                      value={paymentData.expiry}
                      placeholder="MM/YY"
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                        setPaymentData({ ...paymentData, expiry: v });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-cvv-input">Security Code (CVV)</label>
                    <input
                      type="password"
                      id="card-cvv-input"
                      className="form-input"
                      required
                      maxLength="4"
                      value={paymentData.cvv}
                      placeholder="•••"
                      onFocus={() => setIsCardFlipped(true)}
                      onBlur={() => setIsCardFlipped(false)}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setCurrentStep(1)}
                  >
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: '0.35rem' }}></i> Back
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg" id="btn-complete-order">
                    <i className="fa-solid fa-lock" style={{ marginRight: '0.35rem' }}></i> Pay {formatPrice(finalTotalUSD)}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
          {currentStep === 3 && lastPlacedOrder && (
            <div className="order-success-box">
              <div className="success-icon-wrap">
                <i className="fa-solid fa-circle-check" style={{ fontSize: '2rem' }}></i>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.35rem' }}>Order Confirmed!</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Thank you, <strong>{shippingData.fullName}</strong>. Your confirmation email has been dispatched to <em>{shippingData.email}</em>.
              </p>

              <div className="order-id-highlight">
                <i className="fa-solid fa-receipt" style={{ marginRight: '0.35rem' }}></i> {lastPlacedOrder.id}
              </div>

              <div className="tracking-timeline">
                <div className="tracking-step current">
                  <div className="tracking-dot"><i className="fa-solid fa-check"></i></div>
                  <span className="step-label" style={{ fontSize: '0.75rem' }}>Placed</span>
                </div>
                <div className="tracking-step">
                  <div className="tracking-dot">2</div>
                  <span className="step-label" style={{ fontSize: '0.75rem' }}>Processing</span>
                </div>
                <div className="tracking-step">
                  <div className="tracking-dot">3</div>
                  <span className="step-label" style={{ fontSize: '0.75rem' }}>In Transit</span>
                </div>
                <div className="tracking-step">
                  <div className="tracking-dot">4</div>
                  <span className="step-label" style={{ fontSize: '0.75rem' }}>Delivered</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1.15rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.65rem' }}>Order Details</div>
                {lastPlacedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span>{item.quantity}x {item.name} ({item.color})</span>
                    <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.65rem', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Total Paid</span>
                  <span>{formatPrice(lastPlacedOrder.total)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    closeCheckout();
                    openTracker(lastPlacedOrder);
                  }}
                >
                  <i className="fa-solid fa-truck-fast" style={{ marginRight: '0.25rem' }}></i> Track Live Status
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    closeCheckout();
                    const shop = document.getElementById('shop-section');
                    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <i className="fa-solid fa-bag-shopping" style={{ marginRight: '0.25rem' }}></i> Return to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
