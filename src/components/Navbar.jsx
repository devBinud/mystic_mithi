import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaXmark, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { useCart } from '../cart/useCart'
import { FiMenu, FiShoppingBag } from 'react-icons/fi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { count, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else if (window.scrollY < 10) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and add class when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer whenever location/route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="cureo-header-wrapper">
      {/* Announcement Bar */}
      <div className="mm-topbar">
        <div className="mm-topbar-inner">
          <div className="mm-topbar-marquee">
            <div className="mm-topbar-track">
              <span>Signed copies now available &mdash; order directly from the author</span>
              <span aria-hidden="true">Signed copies now available &mdash; order directly from the author</span>
            </div>
          </div>
          <div className="mm-topbar-social">
            <a href="https://www.instagram.com/mystic_mithi25" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={12} /></a>
            <a href="https://www.facebook.com/mysticmithi" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={11} /></a>
            <a href="https://wa.me/917002974378" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={12} /></a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`cureo-navbar mm-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="header-content mm-header">
          <ul className="nav-links desktop-nav mm-nav-left">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                About
              </NavLink>
            </li>
          </ul>

          <Link to="/" className="mm-logo" aria-label="Mystic Mithi home">
            <span className="mm-logo-script">Mystic Mithi</span>
          </Link>

          <ul className="nav-links desktop-nav mm-nav-right">
            <li>
              <NavLink to="/faq" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className="nav-link mm-nav-cta">
                Shop Books
              </NavLink>
            </li>
          </ul>

          <button type="button" className="mm-cart-btn" onClick={openDrawer} aria-label={`Open cart, ${count} items`}>
            <FiShoppingBag size={21} strokeWidth={1.8} />
            {count > 0 && <span className="mm-cart-badge">{count}</span>}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <FiMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Right Side Drawer Backdrop Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Right Side Sliding Drawer */}
      <aside
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="drawer-header">
          <Link to="/" className="brand-wrapper" style={{ textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
            <span className="mm-logo-script mm-logo-drawer">Mystic Mithi</span>
          </Link>

          <button
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <FaXmark size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <nav className="drawer-links-list">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "drawer-link active" : "drawer-link")}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? "drawer-link active" : "drawer-link")}
            >
              Books
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "drawer-link active" : "drawer-link")}
            >
              About
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) => (isActive ? "drawer-link active" : "drawer-link")}
            >
              FAQ
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "drawer-link active" : "drawer-link")}
            >
              Contact
            </NavLink>
          </nav>

          <div className="drawer-action">
            <Link to="/books" className="btn-insp-primary mm-drawer-cta">
              Shop Books
            </Link>
            <div className="mm-drawer-social">
              <a href="https://www.instagram.com/mystic_mithi25" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="https://www.facebook.com/mysticmithi" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={15} /></a>
              <a href="https://wa.me/917002974378" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={16} /></a>
            </div>
          </div>
        </div>
      </aside>
    </header>
  )
}
