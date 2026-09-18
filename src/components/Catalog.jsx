/* ==========================================================================
   AURA E-COMMERCE PLATFORM - CATALOG COMPONENT
   ========================================================================== */

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

export default function Catalog({ searchQuery }) {
  const { formatPrice } = useStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(600);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: 'All Releases', icon: 'fa-solid fa-border-all' },
    { id: 'audio', label: 'Audio & Acoustic', icon: 'fa-solid fa-headphones' },
    { id: 'wearables', label: 'Wearables', icon: 'fa-solid fa-stopwatch' },
    { id: 'workstations', label: 'Workstations', icon: 'fa-solid fa-keyboard' },
    { id: 'smart-home', label: 'Smart Home', icon: 'fa-solid fa-lightbulb' },
    { id: 'accessories', label: 'Accessories', icon: 'fa-solid fa-plug' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Max price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0; // featured default
      }
    });
  }, [activeCategory, maxPrice, inStockOnly, searchQuery, sortBy]);

  return (
    <section className="shop-section" id="shop-section">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="section-title">The Hardware Catalog</h2>
            <p className="section-subtitle">Curated instruments for modern high-performance environments.</p>
          </div>
          <div className="results-count-text">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'device' : 'devices'}
          </div>
        </div>

        {/* Shop Toolbar & Filters */}
        <div className="shop-toolbar">
          
          {/* Category Tabs */}
          <nav className="category-tabs" aria-label="Categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <i className={cat.icon}></i> {cat.label}
              </button>
            ))}
          </nav>

          {/* Secondary Controls Row */}
          <div className="filter-controls-row">
            <div className="filter-group">
              
              {/* Max Price Range Slider */}
              <div className="price-slider-wrap">
                <label htmlFor="price-slider">
                  Max Price: <strong style={{ color: 'var(--text-primary)' }}>{formatPrice(maxPrice)}</strong>
                </label>
                <input
                  type="range"
                  id="price-slider"
                  className="price-range-input"
                  min="50"
                  max="600"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              {/* In Stock Only Checkbox */}
              <label className="stock-toggle-wrap">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In Stock Only</span>
              </label>

            </div>

            {/* Sort Dropdown */}
            <div className="sort-group">
              <label htmlFor="sort-select">Sort:</label>
              <select
                id="sort-select"
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Precision</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <div className="empty-state-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem' }}>No Instruments Found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              No hardware devices match your current filters. Try resetting the price range or search terms.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveCategory('all');
                setMaxPrice(600);
                setInStockOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
