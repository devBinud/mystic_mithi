import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaXmark, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { useCart } from '../cart/useCart'
import { FiMenu, FiShoppingBag, FiChevronDown } from 'react-icons/fi'
import { NAV_LEFT, NAV_RIGHT } from '../data/navigation'

const linkClass = (base) => ({ isActive }) => (isActive ? `${base} active` : base);

// Desktop dropdown: opens on hover, or on click/keyboard via the toggle button.
function NavGroup({ group }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = group.items.some((item) => pathname.startsWith(item.to));

  return (
    <li
      className={`mm-nav-group ${open ? 'is-open' : ''}`}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <button
        type="button"
        className={`nav-link mm-nav-group-btn ${active ? 'active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {group.label} <FiChevronDown size={13} />
      </button>
      <ul className="mm-nav-menu">
        {group.items.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={linkClass('mm-nav-menu-link')} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

function DesktopNav({ items, className }) {
  return (
    <ul className={`nav-links desktop-nav ${className}`}>
      {items.map((item) =>
        item.items ? (
          <NavGroup key={item.label} group={item} />
        ) : (
          <li key={item.to}>
            <NavLink to={item.to} className={linkClass('nav-link')} end={item.end}>
              {item.label}
            </NavLink>
          </li>
        )
      )}
    </ul>
  );
}

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
          <DesktopNav items={NAV_LEFT} className="mm-nav-left" />

          <Link to="/" className="mm-logo" aria-label="Madhushree Das home">
            <span className="mm-logo-script">Madhushree Das</span>
          </Link>

          <DesktopNav items={NAV_RIGHT} className="mm-nav-right" />

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
            <span className="mm-logo-script mm-logo-drawer">Madhushree Das</span>
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
            {[...NAV_LEFT, ...NAV_RIGHT].map((item) =>
              item.items ? (
                <div key={item.label} className="mm-drawer-group">
                  <span className="mm-drawer-group-label">{item.label}</span>
                  {item.items.map((sub) => (
                    <NavLink key={sub.to} to={sub.to} className={linkClass('drawer-link')}>
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} className={linkClass('drawer-link')} end={item.end}>
                  {item.label}
                </NavLink>
              )
            )}
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
