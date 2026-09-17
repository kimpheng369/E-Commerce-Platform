/* ==========================================================================
   AURA E-COMMERCE PLATFORM - WISHLIST DRAWER COMPONENT
   ========================================================================== */

import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addToCart,
    formatPrice
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product) => {
    addToCart(product.id, 1, product.colors[0].name, product.colors[0].img);
    toggleWishlist(product.id);
  };

  return (
    <div
      className="drawer-overlay open"
      onClick={(e) => {
        if (e.target.classList.contains('drawer-overlay')) closeWishlist();
      }}
    >
      <div className="drawer" role="dialog" aria-modal="true" aria-label="Wishlist">
        
        <div className="drawer-header">
          <h3 className="drawer-title">
            <i className="fa-solid fa-heart" style={{ color: '#ef4444' }}></i>
            Saved Devices ({wishlist.length})
          </h3>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeWishlist}
            aria-label="Close wishlist"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          {wishlist.length > 0 ? (
            <div className="wishlist-items-list">
              {wishlist.map(productId => {
                const product = PRODUCTS.find(p => p.id === productId);
                if (!product) return null;

                return (
                  <div key={product.id} className="cart-item">
                    <img
                      src={product.colors[0].img}
                      alt={product.name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-info">
                      <div className="cart-item-title-row">
                        <h4 className="cart-item-title">{product.name}</h4>
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => toggleWishlist(product.id)}
                          title="Remove from wishlist"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>

                      <div className="cart-item-meta">{product.category.toUpperCase()}</div>

                      <div className="cart-item-price-row" style={{ marginTop: '0.4rem' }}>
                        <span className="cart-item-price">{formatPrice(product.price)}</span>
                        
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleMoveToBag(product)}
                        >
                          <i className="fa-solid fa-bag-shopping" style={{ marginRight: '3px' }}></i> Move to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <h4>No Saved Devices</h4>
              <p>Click the heart icon on any hardware device to save it for later.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={closeWishlist}
                style={{ marginTop: '0.5rem' }}
              >
                Explore Hardware
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
