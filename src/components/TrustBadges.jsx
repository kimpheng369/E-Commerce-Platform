/* ==========================================================================
   AURA E-COMMERCE PLATFORM - TRUST BADGES COMPONENT
   ========================================================================== */

import React from 'react';

export default function TrustBadges() {
  const badges = [
    {
      icon: 'fa-solid fa-plane-departure',
      title: 'Global Express Delivery',
      subtitle: 'Free air shipping on orders $150+'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: '2-Year Precision Warranty',
      subtitle: 'No-questions instant replacement'
    },
    {
      icon: 'fa-solid fa-rotate-left',
      title: '30-Day Risk-Free Trial',
      subtitle: 'Keep it only if you truly love it'
    },
    {
      icon: 'fa-solid fa-headset',
      title: '24/7 Priority Concierge',
      subtitle: 'Direct access to hardware specialists'
    }
  ];

  return (
    <section className="features-section" aria-label="Customer Benefits">
      <div className="container features-grid">
        {badges.map((badge, idx) => (
          <div key={idx} className="feature-item">
            <div className="feature-icon-box">
              <i className={badge.icon}></i>
            </div>
            <div>
              <h4 className="feature-title">{badge.title}</h4>
              <p className="feature-subtitle">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
