/* ==========================================================================
   AURA E-COMMERCE PLATFORM - PRODUCT CARD COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const isSaved = isInWishlist(product.id);

  const handleColorChange = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1, selectedColor.name, selectedColor.img);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="product-card" tabIndex={0} onClick={() => openQuickView(product)}>
      
      {/* Badges Container */}
      <div className="card-badge-container">
        {product.badge === 'BESTSELLER' && (
          <span className="badge-pill badge-featured">{product.badge}</span>
        )}
        {product.badge === 'NEW DROP' && (
          <span className="badge-pill badge-new">{product.badge}</span>
        )}
        {product.badge === 'SALE' && (
          <span className="badge-pill badge-sale">{product.badge}</span>
        )}
      </div>

      {/* Floating Quick Action Buttons */}
      <div className="card-quick-actions">
        <button
          type="button"
          className={`quick-action-btn ${isSaved ? 'active' : ''}`}
          onClick={handleWishlist}
          title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist toggle"
        >
          <i className={isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} style={{ color: isSaved ? '#ef4444' : '' }}></i>
        </button>

        <button
          type="button"
          className="quick-action-btn"
          onClick={(e) => { e.stopPropagation(); openQuickView(product); }}
          title="Quick View Specifications"
          aria-label="Quick View"
        >
          <i className="fa-regular fa-eye"></i>
        </button>
      </div>

      {/* Product Image */}
      <div className="card-image-wrap">
        <img
          src={selectedColor.img}
          alt={`${product.name} in ${selectedColor.name}`}
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="card-content">
        <span className="card-category">{product.category.toUpperCase()}</span>
        <h3 className="card-title">{product.name}</h3>

        {/* Rating Stars */}
        <div className="card-rating">
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="fa-solid fa-star" style={{ color: i < Math.floor(product.rating) ? '#f59e0b' : 'var(--border-subtle)', fontSize: '0.75rem' }}></i>
            ))}
          </div>
          <span className="rating-val">{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="card-color-swatches" onClick={(e) => e.stopPropagation()}>
            {product.colors.map(color => (
              <button
                key={color.name}
                type="button"
                className={`color-swatch-btn ${selectedColor.name === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={(e) => handleColorChange(e, color)}
                title={color.name}
                aria-label={color.name}
              />
            ))}
          </div>
        )}

        {/* Card Footer: Price & Add to Bag */}
        <div className="card-footer">
          <div className="card-price-group">
            <span className="card-price">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="card-original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm card-add-btn"
            onClick={handleAdd}
          >
            <i className="fa-solid fa-plus" style={{ marginRight: '3px' }}></i> Add
          </button>
        </div>
      </div>

    </article>
  );
}
