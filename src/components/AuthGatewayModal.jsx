/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT AUTH GATEWAY MODAL COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function AuthGatewayModal() {
  const {
    currentUser,
    login,
    register,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState('alex.vance@futuretech.io');
  const [signInPassword, setSignInPassword] = useState('password123');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // If already authenticated, do not show
  if (currentUser) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Please provide both email and password', 'error');
      return;
    }
    login(signInEmail, signInPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      showToast('Please complete all required fields', 'error');
      return;
    }
    if (regPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    register(regName, regEmail, regPassword);
  };

  const handleDemoAccess = () => {
    login('alex.vance@futuretech.io', 'demo123', 'Alex Vance');
  };

  return (
    <div
      className="auth-gateway-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label="Sign In to AURA"
    >
      <div id="auth-gateway-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="brand-icon" style={{ width: '42px', height: '42px', margin: '0 auto 0.85rem' }}>
              <i className="fa-solid fa-layer-group" style={{ fontSize: '18px' }}></i>
            </div>
            <h2 className="auth-title">Welcome to AURA</h2>
            <p className="auth-subtitle">
              Precision hardware & sensory architecture. Please authenticate to enter the private catalog.
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Create Account
            </button>
          </div>

          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn} className="auth-form">
              <div className="form-group">
                <label className="form-label" htmlFor="signin-email">Email Address</label>
                <div className="input-with-icon">
                  <i className="fa-regular fa-envelope input-leading-icon"></i>
                  <input
                    type="email"
                    id="signin-email"
                    className="form-input"
                    placeholder="name@company.com"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" htmlFor="signin-password">Password</label>
                  <span
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                    onClick={() => showToast('Use demo password or click Instant Demo Access below.', 'info')}
                  >
                    Forgot?
                  </span>
                </div>
                <div className="input-with-icon">
                  <i className="fa-solid fa-lock input-leading-icon"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signin-password"
                    className="form-input"
                    placeholder="••••••••"
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '1.25rem' }}>
                Sign In to AURA
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.35rem' }}></i>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label className="form-label" htmlFor="register-name">Full Name</label>
                <div className="input-with-icon">
                  <i className="fa-regular fa-user input-leading-icon"></i>
                  <input
                    type="text"
                    id="register-name"
                    className="form-input"
                    placeholder="Marcus Vance"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="register-email">Email Address</label>
                <div className="input-with-icon">
                  <i className="fa-regular fa-envelope input-leading-icon"></i>
                  <input
                    type="email"
                    id="register-email"
                    className="form-input"
                    placeholder="marcus@example.com"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="register-password">Password (6+ characters)</label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-lock input-leading-icon"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="register-password"
                    className="form-input"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '1.25rem' }}>
                Create AURA Account
                <i className="fa-solid fa-user-plus" style={{ marginLeft: '0.35rem' }}></i>
              </button>
            </form>
          )}

          <div className="auth-divider">
            <span>OR QUICK TEST</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-block quick-demo-btn"
            id="btn-quick-demo"
            onClick={handleDemoAccess}
          >
            <i className="fa-solid fa-bolt" style={{ color: '#f59e0b', marginRight: '0.35rem' }}></i>
            Instant Demo Access (Alex Vance)
          </button>
        </div>
      </div>
    </div>
  );
}
