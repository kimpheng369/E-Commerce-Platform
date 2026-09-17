/* ==========================================================================
   AURA E-COMMERCE PLATFORM - QUICK VIEW MODAL COMPONENT
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedImage(quickViewProduct.images[0] || quickViewProduct.colors[0].img);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedColor) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleColorPick = (color) => {
    setSelectedColor(color);
    setSelectedImage(color.img);
  };

  const handleAdd = () => {
    addToCart(quickViewProduct.id, quantity, selectedColor.name, selectedColor.img);
    closeQuickView();
  };

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label={quickViewProduct.name}
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) closeQuickView();
      }}
    >
      <div className="modal-content" style={{ maxWidth: '820px' }}>
        
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeQuickView}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="quickview-modal-inner">
          
          {/* Left Gallery Column */}
          <div className="quickview-gallery">
            <div className="quickview-main-img-wrap">
              <img src={selectedImage} alt={quickViewProduct.name} />
            </div>

            {quickViewProduct.images && quickViewProduct.images.length > 1 && (
              <div className="quickview-thumbs">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt="Thumbnail preview" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details Column */}
          <div className="quickview-info">
            <span className="card-category">{quickViewProduct.category.toUpperCase()}</span>
            <h2 className="quickview-title">{quickViewProduct.name}</h2>

            <div className="card-rating" style={{ marginBottom: '0.85rem' }}>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star" style={{ color: i < Math.floor(quickViewProduct.rating) ? '#f59e0b' : 'var(--border-subtle)', fontSize: '0.8rem' }}></i>
                ))}
              </div>
              <span className="rating-val">{quickViewProduct.rating}</span>
              <span className="review-count">({quickViewProduct.reviewCount} customer reviews)</span>
            </div>

            <div className="quickview-price-wrap">
              <span className="quickview-price">{formatPrice(quickViewProduct.price)}</span>
              {quickViewProduct.originalPrice && quickViewProduct.originalPrice > quickViewProduct.price && (
                <span className="card-original-price" style={{ fontSize: '1rem' }}>
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
              <span className="badge-pill badge-featured" style={{ marginLeft: '0.5rem', fontSize: '0.72rem' }}>
                <i className="fa-solid fa-bolt" style={{ color: '#f59e0b', marginRight: '3px' }}></i> {quickViewProduct.stock} Left In Stock
              </span>
            </div>

            <p className="quickview-desc">{quickViewProduct.description}</p>

            {/* Color Swatch Selection */}
            <div className="quickview-section">
              <label className="quickview-label">
                Color Finish: <strong>{selectedColor.name}</strong>
              </label>
              <div className="card-color-swatches" style={{ marginTop: '0.35rem' }}>
                {quickViewProduct.colors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    className={`color-swatch-btn ${selectedColor.name === color.name ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorPick(color)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            {quickViewProduct.specs && (
              <div className="quickview-specs-box">
                <h4 style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  Technical Specifications
                </h4>
                <div className="specs-table">
                  {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key}</span>
                      <span className="spec-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add Button */}
            <div className="quickview-actions-row">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="stepper-value">{quantity}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setQuantity(q => Math.min(quickViewProduct.stock, q + 1))}
                  aria-label="Increase quantity"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleAdd}
              >
                <i className="fa-solid fa-bag-shopping" style={{ marginRight: '0.4rem' }}></i>
                <span>Add {quantity} to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
              </button>

              <button
                type="button"
                className={`quick-action-btn ${isSaved ? 'active' : ''}`}
                style={{ width: '44px', height: '44px', flexShrink: 0 }}
                onClick={() => toggleWishlist(quickViewProduct.id)}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <i className={isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} style={{ color: isSaved ? '#ef4444' : '' }}></i>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
