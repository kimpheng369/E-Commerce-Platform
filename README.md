# AURA — Precision Hardware & Sensory Architecture

A **Clean Minimalist E-Commerce Platform** engineered with **React 19**, **Vite 6**, custom CSS design tokens, and Font Awesome 6 icons, inspired by Apple, Teenage Engineering, and Dieter Rams aesthetics.

![AURA Banner](https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Features

- **⚡ Modern React 19 + Vite 6 Architecture**:
  - Blazing-fast Hot Module Replacement (HMR) and optimized production bundling.
  - Granular, modular component tree with reactive state management via `StoreContext`.
  - Zero heavy CSS bloat — pure, bespoke design system with CSS custom properties.

- **🎨 Clean Minimalist Aesthetic**:
  - Crisp 1px hairline borders (`#e4e4e7`), pure whites (`#ffffff`, `#fafafa`), and subtle micro-elevations.
  - Light mode default with Obsidian Precision dark mode support.
  - Integrated **Font Awesome 6** icons throughout every button and badge.

- **🔒 User Authentication Gateway**:
  - Non-dismissible entry modal for private hardware catalog access.
  - Sign in, account registration, and 1-click **Instant Demo Access** (`Alex Vance`).
  - Persistent login session across browser reloads using `localStorage`.

- **📱 Interactive Slide-Out Account Drawer**:
  - Glides in smoothly from the right edge with user avatar hero and active session dot (`#10b981`).
  - **Quick Metrics Bar**: Orders count, Wishlist count, and VIP founder tier.
  - **4 Segmented Tabs**:
    - **Profile**: Name, email, phone, and Worldwide Timezone Protocol Suite.
    - **Shipping**: Default shipping address pre-filling into checkout, delivery speed cards.
    - **Orders**: Live orders summary with 1-click **Track Live** launcher.
    - **Preferences & Security**: Currency (USD/EUR/GBP), theme, VIP alerts, and 2FA toggle.

- **🌍 Worldwide Timezone Protocol Suite**:
  - Access to all **400+ IANA world timezones** across all continents.
  - Real-time search/filter input to find any city or region instantly.
  - **1-Click Auto-Detect** button that reads browser system timezone.
  - Live ticking digital clock with GMT offset badge and localized time display.

- **🛍️ Hardware Catalog & Shopping Experience**:
  - Category filtering: Audio, Wearables, Workstations, Smart Home, Accessories.
  - Price range slider, stock filter, and real-time search.
  - Quick-view modal with hardware specifications table.
  - Slide-out Cart & Wishlist drawers with live free shipping meter ($150 threshold).
  - Discount promo code engine (try `AURAFUTURE` for 15% off).

- **💳 Multi-Step Checkout & Order Tracking**:
  - Step 1: Shipping address & delivery speed selection.
  - Step 2: 256-bit encrypted credit card payment form with 3D interactive card flip, Apple Pay, and Google Pay.
  - Step 3: Interactive order confirmation with canvas confetti particle explosion.
  - Step-by-step live parcel tracking timeline.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed.

### Installation & Local Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kimpheng369/E-Commerce-Platform.git
   cd E-Commerce-Platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:8085](http://localhost:8085).

4. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 Project Structure

```
├── index.html                  # Root HTML template & font preconnects
├── vite.config.js              # Vite configuration (port 8085, react plugin)
├── package.json                # React 19, Vite 6, canvas-confetti
├── src/
│   ├── main.jsx                # React DOM root entry
│   ├── App.jsx                 # Main layout coordinator & drawer assembler
│   ├── context/
│   │   └── StoreContext.jsx    # React Context state management & localStorage sync
│   ├── data/
│   │   └── products.js         # Curated hardware catalog, currencies, coupons
│   ├── styles/
│   │   └── index.css           # Consolidated design tokens, layout, components
│   └── components/
│       ├── Header.jsx          # Sticky header with search, theme & currency switchers
│       ├── Hero.jsx            # 3D interactive hardware showcase
│       ├── TrustBadges.jsx     # Value proposition guarantee badges
│       ├── ProductCard.jsx     # Swatches, ratings, wishlist & quick-add
│       ├── Catalog.jsx         # Category filters, price slider & grid
│       ├── QuickViewModal.jsx  # Technical specs & image gallery
│       ├── CartDrawer.jsx      # Slide-out cart with shipping threshold meter
│       ├── WishlistDrawer.jsx  # Saved devices drawer
│       ├── TimezoneSuite.jsx   # 400+ IANA timezones & live ticking clock
│       ├── AccountDrawer.jsx   # Account Hub hero & 4-tab settings
│       ├── CheckoutModal.jsx   # 3-step checkout with interactive 3D card
│       ├── OrderTrackerModal.jsx # Parcel delivery progress timeline
│       ├── AuthGatewayModal.jsx  # Mandatory login gate with instant demo access
│       ├── ToastContainer.jsx  # Notification toasts
│       └── Footer.jsx          # Collections, assistance links & newsletter
└── README.md                   # Project documentation
```

---

## 🔒 Security & Privacy Notice
All user credentials and card numbers are processed client-side within browser storage for simulation purposes. Zero personal data or financial tokens are transmitted to external servers.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

Designed with precision for creators.
