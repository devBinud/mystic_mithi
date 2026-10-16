import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWidgets from './components/FloatingWidgets'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BooksPage from './pages/BooksPage'
import BookDetailPage from './pages/BookDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import BuyNowRedirect from './pages/BuyNowRedirect'
import CartDrawer from './components/CartDrawer'
import ScrollReveal from './components/ScrollReveal'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'
import './App.css'

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard section="dashboard" />} />
          <Route path="/admin/books" element={<AdminDashboard section="books" />} />
          <Route path="/admin/books/new" element={<AdminDashboard section="add-book" />} />
          <Route path="/admin/books/:bookId/edit" element={<AdminDashboard section="edit-book" />} />
          <Route path="/admin/orders" element={<AdminDashboard section="orders" />} />
          <Route path="/admin/settings" element={<AdminDashboard section="settings" />} />
          {/* Any unknown admin path lands on the dashboard */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="mystic-container">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/:id" element={<BuyNowRedirect />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Legacy route fallback */}
          <Route path="/appointment" element={<BooksPage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWidgets />
      <CartDrawer />
      <ScrollReveal />
    </div>
  )
}

export default App
