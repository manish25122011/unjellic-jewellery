# The Unjellic Jewellery – Premium Fine Jewellery Store

A modern, responsive, luxury Jewellery E-Commerce web application inspired by **[The Unjellic Jewellery](https://unjellic.com)**. Built with **React.js, Vite, HTML5, CSS3, JavaScript, React Hooks, and React Router**.

Developed by **Aman Pandey** for Internship Project Demonstration and Viva Examination.

---

## 🌟 Project Overview

**The Unjellic Jewellery** is a high-end e-commerce frontend showcasing artisanal fine jewellery crafted from ethical diamonds, recycled 18K solid gold, and rare precious gemstones. The application provides an immersive luxury shopping experience featuring live product search, category filtering, price sorting, interactive quick view modals, slide-out shopping bag drawers, wishlist tracking, persistent cart state via `localStorage`, and simulated checkout with order ID generation.

---

## 💎 Design System & Aesthetic

- **Color Palette:**
  - **Ivory & Pure White:** `#ffffff`, `#fcfbf9`, `#f7f5f0` (clean, luxurious canvas)
  - **Midnight & Onyx:** `#121212`, `#0a0a0a` (high-contrast elegance)
  - **Champagne & Imperial Gold:** `#c5a059`, `#d4af37`, `#99752d` with subtle metallic gradients (`linear-gradient(135deg, #d8b467 0%, #b38b34 50%, #e2c27b 100%)`)
- **Typography:**
  - Headings: `Cormorant Garamond` & `Cinzel` (Google Fonts – classic Parisian/Italian atelier typography)
  - Body & UI: `Montserrat` (clean, readable modern geometric sans-serif)
- **Visual Polish:**
  - Subtle image zoom effects on hover (`scale(1.06)`)
  - Translucent glassmorphism overlays with `backdrop-filter: blur(8px)`
  - Slide-out drawers and animated toast notifications
  - High-resolution jewellery photography with automatic fallback handling

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React.js (v18)** | Component-based UI rendering, Virtual DOM, and state reactivity |
| **Vite (v6)** | Lightning-fast development server, HMR (Hot Module Replacement), and production bundler |
| **React Router (v6)** | Declarative client-side routing (`Routes`, `Route`, `Link`, `useNavigate`, `useParams`, `useSearchParams`) |
| **React Hooks** | Functional component state & lifecycle (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`) |
| **Context API** | Global state management for Shopping Bag (`CartContext`) and Toast Notifications (`ToastContext`) |
| **HTML5 & CSS3** | Semantic markup (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`), CSS Grid, Flexbox, CSS Variables |
| **Web Storage API** | Browser `localStorage` for persisting shopping bag and wishlist across browser reloads |
| **Lucide React** | Featherweight, customizable modern iconography |

---

## 📂 Project Architecture

```
unjellic-jewellery/
├── index.html                  # HTML entry point with Google Fonts preconnections
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite bundler configuration
├── public/                     # Public static assets
└── src/
    ├── assets/                 # Icons and static media
    ├── components/
    │   ├── Header.jsx          # Announcement bar, brand logo, navigation & search toggle
    │   ├── Footer.jsx          # Newsletter form, boutique address, quick links & socials
    │   ├── Hero.jsx            # Luxury hero banner, trust metrics & assurance pillars
    │   ├── ProductCard.jsx     # Reusable card with hover quick-actions & wishlist toggle
    │   ├── QuickViewModal.jsx  # Interactive product preview modal with size & quantity selectors
    │   ├── CartDrawer.jsx      # Slide-out quick cart drawer with free shipping progress bar
    │   └── Toast.jsx           # Global floating notification toasts
    ├── context/
    │   ├── CartContext.jsx     # Cart & wishlist state, discount coupon logic, and localStorage sync
    │   └── ToastContext.jsx    # Alert toast notifications dispatch system
    ├── data/
    │   └── products.js         # Curated catalogue of 16 fine jewellery pieces & categories
    ├── pages/
    │   ├── Home.jsx            # Hero, signature collections, bestsellers, why choose us, testimonials
    │   ├── Shop.jsx            # 16-item catalogue, category filter pills, live search, price sorting
    │   ├── ProductDetails.jsx  # Dynamic /product/:id page with gallery, specs table & accordions
    │   ├── Cart.jsx            # Full shopping bag, promo code application & simulated checkout modal
    │   ├── About.jsx           # Atelier story, craftsmanship pillars, ethical sourcing standards
    │   └── Contact.jsx         # JavaScript-validated contact form & interactive FAQ accordion
    ├── styles/
    │   ├── index.css           # Global luxury design system, CSS variables, typography & resets
    │   ├── Header.css          # Navigation, dropdowns, search expandable bar & mobile drawer
    │   ├── Hero.css            # Hero styling, gold borders & trust pillars grid
    │   └── Footer.css          # Newsletter bar, footer link columns & copyright strip
    ├── App.jsx                 # Route definitions, layout wrapper & ScrollToTop listener
    └── main.jsx                # React root mount point
```

---

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Step-by-Step Instructions

1. **Navigate to the project folder:**
   ```bash
   cd unjellic-jewellery
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at: **`http://localhost:3000`**

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 💎 Features & Capabilities

### 1. Home Page
- **Top Announcement Bar:** Highlights complimentary insured shipping and exclusive privilege code `UNJELLIC10`.
- **Navigation Bar:** Responsive navigation with brand crest, dropdowns, live search expander, wishlist count, and shopping bag badge.
- **Hero Showcase:** Headline, atelier narrative, dual CTAs, key metrics, and four core trust pillars (Authenticity, Insured Shipping, Lifetime Warranty, Bespoke Craft).
- **Signature Collections Grid:** Direct visual categories (The Bridal Heritage, Liquid Gold & Chains, Ethereal Pearls, The Tennis Lineage).
- **Most Cherished Creations:** Category-filtered bestsellers with Quick View and Add to Bag overlay actions.
- **Craftsmanship Editorial:** Deep dive into conflict-free diamonds and recycled gold metallurgy.
- **Client Testimonials:** Verified reviews from real clients with star ratings.

### 2. Shop Page (`/shop`)
- **16 Fine Jewellery Pieces:** Spanning Rings, Necklaces, Earrings, and Bracelets with realistic pricing.
- **Instant Search:** Real-time search filter matching product names, categories, and descriptions.
- **Category Filtering:** Filter by All, Rings, Necklaces, Earrings, or Bracelets with active pills.
- **Price Sorting:** Sort by Featured, Price: Low to High, Price: High to Low, Highest Rating, or Most Reviewed.
- **Price Range Filter:** Under $1,000, $1,000 – $2,000, Above $2,000.
- **Wishlist Only View:** Toggle to view only items you have favorited.
- **Quick View Modal:** Allows inspecting product photos, selecting size/metal, and adding to bag without leaving the shop page.

### 3. Product Details Page (`/product/:id`)
- **Dynamic Routing:** Route `/product/:id` reads product ID via `useParams`.
- **Photo Gallery:** Main showcase with thumbnail gallery selector.
- **Options Customizer:** Choose precious metal (18K Yellow Gold, 18K White Gold, Platinum 950) and size.
- **Quantity Selector:** Interactive increment and decrement controls.
- **Atelier Specifications Table:** Details on metal purity, gemstone carat, cut/clarity, and certifications.
- **Interactive Information Accordions:**
  - Complimentary Insured Express Shipping details
  - 30-Day Returns & Free Resizing policy
  - Lifetime Atelier Guarantee & Cleaning
- **Related Jewels Grid:** Intelligent recommendation of matching items from the same category.

### 4. Shopping Bag & Checkout (`/cart`)
- **Cart Management:** Adjust quantities, remove items, or clear entire bag.
- **Automated Calculations:** Real-time recalculation of subtotal, shipping fee (Free over $250), tax (5%), and total.
- **Coupon Code System:**
  - Code `UNJELLIC10` applies a 10% discount.
  - Code `GOLDEN50` applies a $50 welcome gift credit.
- **Free Shipping Progress Bar:** Dynamic progress bar showing how much more to add to unlock free shipping.
- **Slide-out Cart Drawer:** Side drawer triggers instantly when adding any item to the bag.
- **Persistent Storage:** All cart and wishlist items persist in browser `localStorage`.
- **Simulated Checkout Modal:** Form with full shipping address fields, validation, demo card simulation, and generated Order Confirmation ID (e.g. `UNJ-2026-89412`).

### 5. About Us Page (`/about`)
- Comprehensive brand story and atelier origins.
- The 4 pillars of craftsmanship: 100% Ethical Diamonds, Recycled 18K Solid Gold, Microscope Hand-set Stones, and GIA/IGI Certification.
- Private consultation invitation banner.

### 6. Contact & Concierge Page (`/contact`)
- Interactive inquiry form with JavaScript client validation (name length, email regex, message character threshold).
- Success confirmation banner and toast alerts.
- Flagship Madison Avenue boutique address, phone, and visiting hours.
- Interactive FAQ accordion for diamond certification, ring sizing, insured shipping, and bespoke inquiries.

---

## 🎓 Internship Viva / Examiner Q&A Guide

Use these concise explanations during your viva demonstration:

### Q1: What architecture did you use for state management?
> **Answer:** *"I implemented React's built-in **Context API** (`CartContext` and `ToastContext`). This avoids 'prop-drilling' across deeply nested components. Any component (like the Header, ProductCard, QuickViewModal, or ProductDetails) can access the shopping bag or trigger toast alerts cleanly."*

### Q2: How does the Shopping Cart persist when the user refreshes the page?
> **Answer:** *"I utilized the browser's **localStorage API** combined with React's `useEffect` hook. When the app initializes, `useState` lazily reads and parses JSON from `localStorage`. Whenever the cart state changes, a `useEffect` automatically serializes and writes the updated cart array back to `localStorage`."*

### Q3: How did you implement client-side routing?
> **Answer:** *"I used **React Router v6** (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`, `useParams`, and `useSearchParams`). Dynamic product pages use `/product/:id` where the specific jewel is retrieved using the `useParams()` hook. The search bar and category filters use `useSearchParams()` so filter states are reflected in the URL."*

### Q4: How is responsive design achieved?
> **Answer:** *"The project uses mobile-first CSS media queries, CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(...))`), and Flexbox. On mobile screens (under 768px), navigation transforms into a slide-in drawer, product grids stack smoothly, and modals fit mobile viewports."*

### Q5: Did you connect a real payment gateway or backend?
> **Answer:** *"No. To keep the project clean, honest, and focused on frontend engineering for this demonstration, I designed a simulated checkout flow. It validates client information and computes totals in real-time without fake payment processing or claiming a non-existent database."*

---

## 📜 License

Created for academic internship viva demonstration purposes. All brand concepts inspired by The Unjellic Jewellery.
