import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, search]);

  return null;
};

// 404 Fallback component
const NotFound = () => (
  <div className="container section-padding" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <span className="subtitle">404 ERROR</span>
    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', margin: '10px 0 16px' }}>
      Atelier Page Not Found
    </h1>
    <p style={{ color: '#666', maxWidth: '460px', marginBottom: '28px' }}>
      The page you requested may have been relocated or is no longer available.
    </p>
    <a href="/shop" className="btn btn-primary">
      Return to Jewellery Catalogue
    </a>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />

            {/* Global Overlays & Modals */}
            <CartDrawer />
            <QuickViewModal />
            <Toast />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;

