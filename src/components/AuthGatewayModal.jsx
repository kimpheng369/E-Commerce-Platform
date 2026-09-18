/* ==========================================================================
   AURA E-COMMERCE PLATFORM - LUXURY SENSORY AUTH GATEWAY TERMINAL
   ========================================================================== */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext.jsx';

const PERSONAS = [
  {
    id: 'alex',
    name: 'Alex Vance',
    email: 'alex.vance@futuretech.io',
    role: 'Hardware Architect',
    location: 'San Francisco, CA',
    tier: 'VIP Titanium',
    badgeColor: '#38bdf8',
    avatarLetter: 'A',
    avatarBg: 'linear-gradient(135deg, #0284c7, #6366f1)',
    ordersCount: 3,
    preferredDevice: 'Pulse Pro Wireless ANC'
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@soundlab.berlin',
    role: 'Acoustic Engineer',
    location: 'Berlin, DE',
    tier: 'Studio Pro',
    badgeColor: '#ec4899',
    avatarLetter: 'E',
    avatarBg: 'linear-gradient(135deg, #db2777, #9333ea)',
    ordersCount: 5,
    preferredDevice: 'Apex Linear Acoustic Desk'
  },
  {
    id: 'marcus',
    name: 'Marcus Sterling',
    email: 'm.sterling@atelier.tokyo',
    role: 'Creative Director',
    location: 'Tokyo, JP',
    tier: 'Atelier Lead',
    badgeColor: '#10b981',
    avatarLetter: 'M',
    avatarBg: 'linear-gradient(135deg, #059669, #0284c7)',
    ordersCount: 8,
    preferredDevice: 'Vanguard Mechanical Keyboard'
  }
];

const SHOWCASE_PRIVILEGES = [
  {
    icon: 'fa-bolt',
    iconColor: '#38bdf8',
    title: 'Priority Titanium Drops',
    tag: '48H PRIVILEGE',
    desc: 'Exclusive early allocation window on bespoke sensory hardware and limited-run anodized finishes.'
  },
  {
    icon: 'fa-shield-halved',
    iconColor: '#10b981',
    title: 'Zero-Loss Acoustic Guarantee',
    tag: 'WHITE-GLOVE',
    desc: 'Lifetime diagnostic telemetry, concierge rapid RMA exchange, and tailored firmware calibrations.'
  },
  {
    icon: 'fa-network-wired',
    iconColor: '#a855f7',
    title: 'Global Studio Mesh Sync',
    tag: 'CLOUD TELEMETRY',
    desc: 'Instant acoustic profile and low-latency EQ sync across macOS, iOS, Windows, and AURA OS.'
  }
];

export default function AuthGatewayModal() {
  const {
    currentUser,
    isAuthOpen,
    closeAuth,
    login,
    register,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState('alex.vance@futuretech.io');
  const [signInPassword, setSignInPassword] = useState('password123');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState('vip'); // 'creator' | 'vip'

  // Forgot Password inline state
  const [isForgotView, setIsForgotView] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  // Auto rotate showcase privilege card every 5s
  useEffect(() => {
    if (!isAuthOpen) return;
    const timer = setInterval(() => {
      setActiveShowcaseIdx(prev => (prev + 1) % SHOWCASE_PRIVILEGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAuthOpen]);

  // Keyboard navigation & Caps Lock detection
  useEffect(() => {
    if (!isAuthOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAuth();
      }
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'));
      }
    };

    const handleKeyUp = (e) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isAuthOpen, closeAuth]);

  // Password telemetry & strength rating
  const passwordTelemetry = useMemo(() => {
    const pwd = regPassword;
    const hasLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    let score = 0;
    if (pwd.length > 0) score++;
    if (hasLength) score++;
    if (hasUpper && hasNumber) score++;
    if (hasSpecial && hasLength) score++;

    let label = 'Awaiting input';
    let color = 'var(--text-muted)';
    if (pwd.length > 0) {
      switch (score) {
        case 1:
          label = 'Weak Cipher';
          color = '#ef4444';
          break;
        case 2:
          label = 'Fair Protection';
          color = '#f59e0b';
          break;
        case 3:
          label = 'Robust Security';
          color = '#10b981';
          break;
        case 4:
          label = 'Titanium Grade';
          color = '#06b6d4';
          break;
        default:
          label = 'Weak';
          color = '#ef4444';
      }
    }

    return {
      score,
      label,
      color,
      hasLength,
      hasUpper,
      hasNumber,
      hasSpecial
    };
  }, [regPassword]);

  // If already authenticated or not explicitly opened, do not render
  if (!isAuthOpen || currentUser) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#f472b6']
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Please provide both email and password', 'error');
      return;
    }
    triggerCelebration();
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
    triggerCelebration();
    register(regName, regEmail, regPassword);
  };

  const handlePersonaLogin = (persona) => {
    triggerCelebration();
    showToast(`Access granted: Authenticated as ${persona.name} (${persona.tier})`, 'success');
    login(persona.email, 'demo-secret-pass', persona.name);
  };

  const handleBiometricAuth = () => {
    showToast('Touch ID / Passkey verified. Welcome back, Alex Vance.', 'success');
    triggerCelebration();
    login('alex.vance@futuretech.io', 'passkey-auth', 'Alex Vance');
  };

  const handleSocialAuth = (provider) => {
    showToast(`Identity verified via ${provider} OAuth Gateway.`, 'success');
    triggerCelebration();
    login('alex.vance@futuretech.io', 'oauth-token', 'Alex Vance');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your account email address', 'error');
      return;
    }
    setRecoverySent(true);
    showToast(`Zero-knowledge recovery token dispatched to ${forgotEmail}`, 'success');
  };

  return (
    <div
      className="auth-gateway-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label="AURA Sensory Access Gateway"
      onClick={(e) => {
        if (e.target.classList.contains('auth-gateway-overlay') || e.target.id === 'auth-gateway-container') {
          closeAuth();
        }
      }}
    >
      <div id="auth-gateway-container" className="auth-terminal-container">
        
        {/* Main Terminal Card */}
        <div className="auth-terminal-card">
          
          {/* Close Floating Button */}
          <button
            type="button"
            className="terminal-close-btn"
            onClick={closeAuth}
            aria-label="Close authentication gateway"
            title="Close terminal (Esc)"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* =================================================================
              LEFT SHOWCASE PANE: ATELIER & MEMBER PRIVILEGE TELEMETRY
              ================================================================= */}
          <div className="auth-showcase-pane">
            
            {/* Ambient Background Aura Glows */}
            <div className="showcase-ambient-glow glow-cyan"></div>
            <div className="showcase-ambient-glow glow-purple"></div>

            {/* Brand Passport Header */}
            <div className="showcase-brand-badge">
              <div className="brand-icon-hologram">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <div className="badge-text-group">
                <span className="badge-kicker">AURA PASSPORT // CIPHER SECURE</span>
                <span className="badge-beacon">
                  <span className="beacon-pulse"></span>
                  LIVE TELEMETRY
                </span>
              </div>
            </div>

            <div className="showcase-hero-copy">
              <h2 className="showcase-heading">
                Precision sensory architecture for creators.
              </h2>
              <p className="showcase-subtext">
                Authenticate your terminal to access the private atelier, manage high-fidelity telemetry, and synchronize hardware firmware.
              </p>
            </div>

            {/* Interactive Privilege Carousel / Showcase */}
            <div className="showcase-privileges-wrapper">
              <div className="showcase-tabs-indicator">
                {SHOWCASE_PRIVILEGES.map((p, idx) => (
                  <button
                    key={p.title}
                    type="button"
                    className={`indicator-dot ${activeShowcaseIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveShowcaseIdx(idx)}
                    title={`View ${p.title}`}
                    aria-label={`Show ${p.title}`}
                  />
                ))}
              </div>

              {/* Active Privilege Card */}
              <div className="showcase-privilege-card" onClick={() => setActiveShowcaseIdx((activeShowcaseIdx + 1) % SHOWCASE_PRIVILEGES.length)}>
                <div className="privilege-icon-wrap" style={{ color: SHOWCASE_PRIVILEGES[activeShowcaseIdx].iconColor }}>
                  <i className={`fa-solid ${SHOWCASE_PRIVILEGES[activeShowcaseIdx].icon}`}></i>
                </div>
                <div className="privilege-content">
                  <div className="privilege-header">
                    <span className="privilege-title">{SHOWCASE_PRIVILEGES[activeShowcaseIdx].title}</span>
                    <span className="privilege-tag">{SHOWCASE_PRIVILEGES[activeShowcaseIdx].tag}</span>
                  </div>
                  <p className="privilege-desc">{SHOWCASE_PRIVILEGES[activeShowcaseIdx].desc}</p>
                </div>
              </div>
            </div>

            {/* Live Studio Telemetry Bar */}
            <div className="showcase-telemetry-bar">
              <div className="telemetry-stat">
                <span className="telemetry-value">
                  <span className="telemetry-online-dot"></span>
                  14,280+
                </span>
                <span className="telemetry-label">Active Creators</span>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-stat">
                <span className="telemetry-value">0.8ms</span>
                <span className="telemetry-label">Sync Latency</span>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-stat">
                <span className="telemetry-value">99.98%</span>
                <span className="telemetry-label">Acoustic Accuracy</span>
              </div>
            </div>

            {/* Security Guarantee Footer */}
            <div className="showcase-security-footer">
              <i className="fa-solid fa-lock"></i>
              <span>256-bit AES Hardware-Grade Encryption · Zero-Knowledge Storage</span>
            </div>

          </div>

          {/* =================================================================
              RIGHT AUTH PANE: AUTHENTICATION ENGINE
              ================================================================= */}
          <div className="auth-form-pane">
            
            {/* Header Lockup */}
            <div className="form-header-lockup">
              <div className="form-brand-symbol">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <h3 className="form-header-title">
                  {isForgotView
                    ? 'Security Credential Recovery'
                    : activeTab === 'signin'
                    ? 'Access Your Terminal'
                    : 'Initialize AURA Passport'}
                </h3>
                <p className="form-header-subtitle">
                  {isForgotView
                    ? 'Enter your registered email to receive an instant recovery cipher.'
                    : activeTab === 'signin'
                    ? 'Enter your credentials or use instantaneous one-click identity.'
                    : 'Join the private atelier and unlock high-tier hardware drops.'}
                </p>
              </div>
            </div>

            {/* If In Forgot Password View */}
            {isForgotView ? (
              <div className="forgot-recovery-panel">
                {recoverySent ? (
                  <div className="recovery-success-box">
                    <div className="recovery-check-icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <h4>Cipher Dispatched</h4>
                    <p>
                      A zero-knowledge authentication link has been dispatched to <strong>{forgotEmail}</strong>. Please follow the instructions to access your terminal.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-block btn-lg"
                      onClick={() => {
                        setIsForgotView(false);
                        setRecoverySent(false);
                      }}
                      style={{ marginTop: '1.25rem' }}
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="auth-form-body">
                    <div className="form-group">
                      <label className="form-label" htmlFor="forgot-email">Account Email</label>
                      <div className="input-with-icon">
                        <i className="fa-regular fa-envelope input-leading-icon"></i>
                        <input
                          type="email"
                          id="forgot-email"
                          className="form-input"
                          placeholder="alex.vance@futuretech.io"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="action-buttons-group">
                      <button type="submit" className="btn btn-primary btn-block btn-lg">
                        Dispatch Recovery Token
                        <i className="fa-solid fa-paper-plane" style={{ marginLeft: '0.45rem' }}></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-block"
                        onClick={() => setIsForgotView(false)}
                      >
                        Cancel & Return
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <>
                {/* Mode Switcher Tabs */}
                <div className="terminal-tab-pill-nav">
                  <div className={`tab-pill-indicator ${activeTab === 'register' ? 'slide-right' : ''}`}></div>
                  <button
                    type="button"
                    className={`terminal-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
                    onClick={() => setActiveTab('signin')}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '0.35rem' }}></i>
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`terminal-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                  >
                    <i className="fa-solid fa-user-plus" style={{ marginRight: '0.35rem' }}></i>
                    Create Account
                  </button>
                </div>

                {/* Fast-Access One-Touch Ecosystem Buttons */}
                <div className="fast-access-grid">
                  <button
                    type="button"
                    className="fast-access-btn"
                    onClick={() => handleSocialAuth('Apple')}
                    title="Sign in with Apple ID"
                  >
                    <i className="fa-brands fa-apple"></i>
                    <span>Apple</span>
                  </button>
                  <button
                    type="button"
                    className="fast-access-btn"
                    onClick={() => handleSocialAuth('Google')}
                    title="Sign in with Google Workspace"
                  >
                    <i className="fa-brands fa-google" style={{ color: '#ea4335' }}></i>
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="fast-access-btn biometric-btn"
                    onClick={handleBiometricAuth}
                    title="Authenticate with Touch ID / Passkey"
                  >
                    <i className="fa-solid fa-fingerprint" style={{ color: '#06b6d4' }}></i>
                    <span>Passkey</span>
                  </button>
                </div>

                <div className="terminal-divider">
                  <span>OR WITH AURA IDENTITY</span>
                </div>

                {/* Caps Lock Detection Warning */}
                {capsLockActive && (
                  <div className="caps-lock-banner">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <span>Caps Lock is ON</span>
                  </div>
                )}

                {/* Tab 1: Sign In Form */}
                {activeTab === 'signin' ? (
                  <form onSubmit={handleSignIn} className="auth-form-body">
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
                      <div className="label-with-action">
                        <label className="form-label" htmlFor="signin-password">Password</label>
                        <button
                          type="button"
                          className="btn-link-subtle"
                          onClick={() => {
                            setForgotEmail(signInEmail);
                            setIsForgotView(true);
                          }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-lock input-leading-icon"></i>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="signin-password"
                          className="form-input"
                          placeholder="••••••••••••"
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

                    {/* Remember Device Switch */}
                    <div className="remember-device-row">
                      <label className="toggle-switch-label">
                        <input
                          type="checkbox"
                          checked={rememberDevice}
                          onChange={(e) => setRememberDevice(e.target.checked)}
                          className="toggle-checkbox"
                        />
                        <span className="toggle-slider"></span>
                        <span className="toggle-text">Remember this terminal session</span>
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block btn-lg terminal-submit-btn">
                      <span>Authorize Terminal Access</span>
                      <i className="fa-solid fa-arrow-right submit-arrow-icon"></i>
                    </button>
                  </form>
                ) : (
                  /* Tab 2: Register Form */
                  <form onSubmit={handleRegister} className="auth-form-body">
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
                      <label className="form-label" htmlFor="register-password">Password</label>
                      <div className="input-with-icon">
                        <i className="fa-solid fa-lock input-leading-icon"></i>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="register-password"
                          className="form-input"
                          placeholder="8+ characters, mixed case & numbers"
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

                      {/* Password Strength Meter & Live Telemetry */}
                      {regPassword.length > 0 && (
                        <div className="pwd-strength-container">
                          <div className="pwd-strength-header">
                            <span className="pwd-strength-label">Cipher Strength:</span>
                            <span className="pwd-strength-rating" style={{ color: passwordTelemetry.color }}>
                              {passwordTelemetry.label}
                            </span>
                          </div>
                          <div className="pwd-strength-meter-bar">
                            <div
                              className={`meter-segment ${passwordTelemetry.score >= 1 ? 'filled' : ''}`}
                              style={{ backgroundColor: passwordTelemetry.score >= 1 ? passwordTelemetry.color : '' }}
                            ></div>
                            <div
                              className={`meter-segment ${passwordTelemetry.score >= 2 ? 'filled' : ''}`}
                              style={{ backgroundColor: passwordTelemetry.score >= 2 ? passwordTelemetry.color : '' }}
                            ></div>
                            <div
                              className={`meter-segment ${passwordTelemetry.score >= 3 ? 'filled' : ''}`}
                              style={{ backgroundColor: passwordTelemetry.score >= 3 ? passwordTelemetry.color : '' }}
                            ></div>
                            <div
                              className={`meter-segment ${passwordTelemetry.score >= 4 ? 'filled' : ''}`}
                              style={{ backgroundColor: passwordTelemetry.score >= 4 ? passwordTelemetry.color : '' }}
                            ></div>
                          </div>
                          <div className="pwd-criteria-chips">
                            <span className={`criteria-chip ${passwordTelemetry.hasLength ? 'valid' : ''}`}>
                              <i className={`fa-solid ${passwordTelemetry.hasLength ? 'fa-check' : 'fa-circle-dot'}`}></i> 8+ chars
                            </span>
                            <span className={`criteria-chip ${passwordTelemetry.hasUpper ? 'valid' : ''}`}>
                              <i className={`fa-solid ${passwordTelemetry.hasUpper ? 'fa-check' : 'fa-circle-dot'}`}></i> Uppercase
                            </span>
                            <span className={`criteria-chip ${passwordTelemetry.hasNumber ? 'valid' : ''}`}>
                              <i className={`fa-solid ${passwordTelemetry.hasNumber ? 'fa-check' : 'fa-circle-dot'}`}></i> Number
                            </span>
                            <span className={`criteria-chip ${passwordTelemetry.hasSpecial ? 'valid' : ''}`}>
                              <i className={`fa-solid ${passwordTelemetry.hasSpecial ? 'fa-check' : 'fa-circle-dot'}`}></i> Symbol
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Member Tier Selection */}
                    <div className="tier-selector-container">
                      <span className="tier-selector-heading">Select Access Tier:</span>
                      <div className="tier-radio-group">
                        <label className={`tier-card-option ${selectedTier === 'vip' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="tier"
                            value="vip"
                            checked={selectedTier === 'vip'}
                            onChange={() => setSelectedTier('vip')}
                          />
                          <div className="tier-card-body">
                            <div className="tier-title-row">
                              <span className="tier-name">AURA Titanium Studio</span>
                              <span className="tier-tag">VIP</span>
                            </div>
                            <span className="tier-sub">Priority allocation, bespoke drops & concierge</span>
                          </div>
                        </label>
                        <label className={`tier-card-option ${selectedTier === 'creator' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="tier"
                            value="creator"
                            checked={selectedTier === 'creator'}
                            onChange={() => setSelectedTier('creator')}
                          />
                          <div className="tier-card-body">
                            <div className="tier-title-row">
                              <span className="tier-name">Creator Edition</span>
                              <span className="tier-tag">STANDARD</span>
                            </div>
                            <span className="tier-sub">General catalog access & telemetry diagnostics</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block btn-lg terminal-submit-btn" style={{ marginTop: '1.25rem' }}>
                      <span>Initialize AURA Passport</span>
                      <i className="fa-solid fa-user-plus submit-arrow-icon"></i>
                    </button>
                  </form>
                )}

                {/* =============================================================
                    MULTI-PERSONA DEMO SANDBOX SELECTOR
                    ============================================================= */}
                <div className="demo-sandbox-section">
                  <div className="sandbox-header">
                    <div className="sandbox-badge">
                      <i className="fa-solid fa-flask"></i>
                      <span>INSTANT DEMO SANDBOX</span>
                    </div>
                    <span className="sandbox-hint">Click any persona to log in instantly</span>
                  </div>

                  <div className="sandbox-personas-grid">
                    {PERSONAS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="persona-card-btn"
                        onClick={() => handlePersonaLogin(p)}
                        title={`Authenticate instantly as ${p.name}`}
                      >
                        <div className="persona-avatar-wrap" style={{ background: p.avatarBg }}>
                          <span>{p.avatarLetter}</span>
                          <span className="persona-status-ring"></span>
                        </div>
                        <div className="persona-details">
                          <div className="persona-top-row">
                            <span className="persona-name">{p.name}</span>
                            <span className="persona-tier-pill" style={{ borderColor: p.badgeColor, color: p.badgeColor }}>
                              {p.tier}
                            </span>
                          </div>
                          <span className="persona-role">{p.role} · {p.location}</span>
                        </div>
                        <i className="fa-solid fa-bolt persona-bolt-icon"></i>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Browsing fallback */}
                <div className="guest-fallback-wrap">
                  <button
                    type="button"
                    className="guest-action-btn"
                    onClick={closeAuth}
                  >
                    <span>Continue browsing as guest visitor</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
