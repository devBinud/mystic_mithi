import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaBookOpen, FaXmark } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      {/* Main Navbar */}
      <nav className={`cureo-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="header-content">
          <Link to="/" className="brand-wrapper" style={{ textDecoration: 'none' }}>
            <span className="brand-title-text" style={{ color: 'var(--primary)', transition: 'none' }}>Mystic Mithi</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links desktop-nav">
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
                About Author
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="header-action desktop-action">
            <Link to="/books" className="btn-inspiration-primary">
              <FaBookOpen size={13} style={{ marginRight: '6px' }} />
              <span>Explore Books</span>
            </Link>
          </div>

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
            <span className="brand-title-text" style={{ fontSize: '1.25rem', color: 'var(--primary)', transition: 'none' }}>Mystic Mithi</span>
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
              About Author
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "drawer-link active" : "drawer-link")}
            >
              Contact
            </NavLink>
          </nav>

          <div className="drawer-action">
            <Link to="/books" className="btn-inspiration-primary drawer-btn">
              <span>Explore Books</span>
            </Link>
          </div>
        </div>
      </aside>
    </header>
  )
}
