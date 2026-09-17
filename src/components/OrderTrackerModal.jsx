/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT ORDER TRACKER MODAL COMPONENT
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function OrderTrackerModal() {
  const {
    isTrackerOpen,
    closeTracker,
    activeTrackingOrder,
    orders
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isTrackerOpen) {
      const initial = activeTrackingOrder || orders[0] || null;
      setSelectedOrder(initial);
      setSearchQuery(initial ? initial.id : '');
    }
  }, [isTrackerOpen, activeTrackingOrder, orders]);

  if (!isTrackerOpen) return null;

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toUpperCase();
    if (!q) return;
    const match = orders.find(o => o.id.toUpperCase() === q);
    setSelectedOrder(match || null);
  };

  const steps = ['Order Placed', 'Processing & QA', 'In Transit', 'Delivered'];
  const currentStepNum = selectedOrder ? (selectedOrder.statusStep || 2) : 1;

  return (
    <div
      className={`modal-overlay ${isTrackerOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Order Tracking"
      onClick={(e) => { if (e.target === e.currentTarget) closeTracker(); }}
    >
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeTracker}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ padding: '2.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem', textAlign: 'center' }}>
            <i className="fa-solid fa-location-dot" style={{ marginRight: '0.35rem' }}></i> Order Tracking
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
            Enter your order number or select a recent order
          </p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px', margin: '0 auto 1.75rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. AURA-98214"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ textTransform: 'uppercase' }}
            />
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '0.25rem' }}></i> Look Up
            </button>
          </form>

          <div id="tracker-results-area">
            {selectedOrder ? (
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order Number</span>
                    <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{selectedOrder.id}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</span>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>
                      <i className="fa-solid fa-circle-dot" style={{ fontSize: '0.65rem', marginRight: '0.25rem' }}></i>
                      {selectedOrder.status}
                    </div>
                  </div>
                </div>

                <div className="tracking-timeline">
                  {steps.map((stepName, i) => {
                    const stepNum = i + 1;
                    let cls = '';
                    if (stepNum < currentStepNum) cls = 'done';
                    else if (stepNum === currentStepNum) cls = 'current';

                    return (
                      <div key={stepName} className={`tracking-step ${cls}`}>
                        <div className="tracking-dot">
                          {stepNum < currentStepNum ? <i className="fa-solid fa-check"></i> : stepNum}
                        </div>
                        <span className="step-label" style={{ fontSize: '0.75rem' }}>{stepName}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1.35rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Delivery To</div>
                    <strong>{selectedOrder.shippingAddress?.name || 'Customer'}</strong><br />
                    <span>{selectedOrder.shippingAddress?.city || 'Worldwide'}</span>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Carrier & Method</div>
                    <strong>{selectedOrder.shippingMethod || 'Express Air'}</strong><br />
                    <span style={{ color: 'var(--text-secondary)' }}>Tracking: #TRK-849204</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state" style={{ border: 'none' }}>
                <p>No order found with ID "{searchQuery}". Check your confirmation receipt or explore orders in Account Hub.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
