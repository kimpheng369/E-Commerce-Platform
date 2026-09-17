/* ==========================================================================
   AURA E-COMMERCE PLATFORM - CART DRAWER COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    formatPrice,
    openCheckout
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const totals = getCartTotals();
  const freeShippingProgress = Math.min(100, Math.round((totals.subtotalUSD / totals.freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  return (
    <div
      className="drawer-overlay open"
      onClick={(e) => {
        if (e.target.classList.contains('drawer-overlay')) closeCart();
      }}
    >
      <div className="drawer" role="dialog" aria-modal="true" aria-label="Shopping Bag">
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3 className="drawer-title">
            <i className="fa-solid fa-bag-shopping"></i>
            Shopping Bag ({totals.totalItems})
          </h3>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="cart-shipping-meter">
          <div className="shipping-meter-text">
            {totals.freeShippingRemaining === 0 ? (
              <span>
                <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginRight: '4px' }}></i>
                <strong>Complimentary Express Air Shipping</strong> Unlocked!
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(totals.freeShippingRemaining)}</strong> more for complimentary express delivery
              </span>
            )}
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-body">
          {cart.length > 0 ? (
            <div className="cart-items-list">
              {cart.map((item, idx) => {
                const product = PRODUCTS.find(p => p.id === item.productId);
                if (!product) return null;

                return (
                  <div key={`${item.productId}-${item.colorName}-${idx}`} className="cart-item">
                    <img
                      src={item.colorImg || product.colors[0].img}
                      alt={product.name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-info">
                      <div className="cart-item-title-row">
                        <h4 className="cart-item-title">{product.name}</h4>
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(idx)}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>

                      <div className="cart-item-meta">{item.colorName}</div>

                      <div className="cart-item-price-row">
                        <span className="cart-item-price">
                          {formatPrice(product.price * item.quantity)}
                        </span>

                        <div className="quantity-stepper mini">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span className="stepper-value">{item.quantity}</span>
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h4>Your Bag is Empty</h4>
              <p>Explore our curated hardware catalog to add items.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={closeCart}
                style={{ marginTop: '0.5rem' }}
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                className="form-input coupon-input"
                placeholder="Discount code (e.g. AURAFUTURE)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="applied-coupon-tag">
                <span>
                  <i className="fa-solid fa-tag" style={{ color: '#10b981', marginRight: '4px' }}></i>
                  {appliedCoupon.code} ({appliedCoupon.description})
                </span>
                <button
                  type="button"
                  className="remove-coupon-btn"
                  onClick={removeCoupon}
                  title="Remove coupon"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}

            {/* Price Calculations Breakdown */}
            <div className="cart-totals-breakdown">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotalUSD)}</span>
              </div>

              {totals.discountUSD > 0 && (
                <div className="total-row discount" style={{ color: '#10b981' }}>
                  <span>Discount</span>
                  <span>-{formatPrice(totals.discountUSD)}</span>
                </div>
              )}

              <div className="total-row">
                <span>Express Shipping</span>
                <span>
                  {totals.shippingUSD === 0 ? (
                    <strong style={{ color: '#10b981' }}>FREE</strong>
                  ) : (
                    formatPrice(totals.shippingUSD)
                  )}
                </span>
              </div>

              <div className="total-row grand-total">
                <span>Estimated Total</span>
                <span className="total-amount">{formatPrice(totals.totalUSD)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              className="btn btn-primary btn-block checkout-btn"
              onClick={openCheckout}
            >
              <span>Proceed to Express Checkout</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={clearCart}
              style={{ marginTop: '0.4rem', fontSize: '0.78rem', padding: '0.4rem' }}
            >
              Clear Bag
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
