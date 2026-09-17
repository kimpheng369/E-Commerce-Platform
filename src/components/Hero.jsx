/* ==========================================================================
   AURA E-COMMERCE PLATFORM - HERO SECTION COMPONENT
   ========================================================================== */

import React, { useRef, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';

export default function Hero({ onExploreClick }) {
  const { openQuickView, formatPrice } = useStore();
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const featuredProduct = PRODUCTS.find(p => p.id === 'aura-pulse-pro') || PRODUCTS[0];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    });
  };

  return (
    <section className="hero-section" aria-label="Introduction">
      <div className="container hero-grid">
        
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <span className="badge-dot"></span>
            <span>NEXT-GEN SPATIAL AUDIO SYSTEM</span>
          </div>

          <h1 className="hero-title">
            Precision Hardware for Modern Senses.
          </h1>

          <p className="hero-description">
            Engineered at the intersection of acoustic physics, tactile industrial design, and computational sensory hardware. Timeless minimalism built for high-performance creative spaces.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onExploreClick}
            >
              <span>Explore The Catalog</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => openQuickView(featuredProduct)}
            >
              <i className="fa-regular fa-eye"></i>
              <span>Featured Release</span>
            </button>
          </div>

          <div className="hero-metrics">
            <div className="hero-metric-item">
              <div className="metric-value">60h</div>
              <div className="metric-label">Lossless Playback</div>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <div className="metric-value">5Hz</div>
              <div className="metric-label">Planar Response</div>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <div className="metric-value">2-Year</div>
              <div className="metric-label">Hardware Guarantee</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Showcase Card */}
        <div className="hero-visual">
          <div
            className="hero-showcase-card"
            ref={cardRef}
            style={tiltStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => openQuickView(featuredProduct)}
            role="button"
            tabIndex={0}
            aria-label="View AURA Pulse Pro specs"
          >
            <div className="hero-card-glow"></div>
            <div className="hero-card-img-wrap">
              <img
                src={featuredProduct.colors[0].img}
                alt={featuredProduct.name}
                className="hero-card-img"
              />
            </div>
            <div className="hero-card-details">
              <div>
                <span className="hero-card-tag">NEW RELEASE • ARCHITECTURAL AUDIO</span>
                <h3 className="hero-card-title">{featuredProduct.name}</h3>
                <div className="hero-card-meta">Lossless Planar • 60hr Playback</div>
              </div>
              <div className="hero-card-price-wrap">
                <div className="hero-card-price">{formatPrice(featuredProduct.price)}</div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginRight: '3px' }}></i> In Stock ({featuredProduct.stock} left)
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
