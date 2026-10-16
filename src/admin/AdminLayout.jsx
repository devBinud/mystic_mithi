// src/admin/AdminLayout.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaBookOpen, FaCartShopping, FaGauge, FaGear, FaGlobe, FaPlus,
  FaRightFromBracket, FaUserShield, FaBars, FaXmark
} from 'react-icons/fa6';
import { logout } from './adminStore';

export default function AdminLayout({ children, activeSection = 'dashboard' }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  // Escape closes the "leave admin" confirmation
  useEffect(() => {
    if (!confirmLeave) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setConfirmLeave(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [confirmLeave]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navSections = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'dashboard', to: '/admin', label: 'Dashboard', icon: FaGauge },
      ],
    },
    {
      label: 'BOOKS',
      items: [
        { id: 'add-book', to: '/admin/books/new', label: 'Add New Book', icon: FaPlus },
        { id: 'books', to: '/admin/books', label: 'View All Books', icon: FaBookOpen },
      ],
    },
    {
      label: 'STORE',
      items: [
        { id: 'orders', to: '/admin/orders', label: 'Orders & Sales', icon: FaCartShopping },
        { id: 'settings', to: '/admin/settings', label: 'Author & Store Settings', icon: FaGear },
      ],
    },
  ];

  const getBreadcrumbTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Dashboard';
      case 'add-book': return 'Add New Book';
      case 'edit-book': return 'Edit Book';
      case 'orders': return 'Orders & Customer Purchases';
      case 'settings': return 'Author & Publishing Settings';
      default: return 'Books Catalog & Inventory';
    }
  };

  return (
    <div className="admin-wrapper" data-theme="light">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-layout-body">
        {/* Left Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          <div className="admin-sidebar-header">
            <Link to="/admin" className="admin-sidebar-brand" aria-label="Mystic Mithi admin home">
              <span className="admin-sidebar-logo">Mystic Mithi</span>
            </Link>
            <button
              className="admin-sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaXmark />
            </button>
          </div>

          <div className="admin-sidebar-nav">
            {navSections.map((section, i) => (
              <div key={section.label} style={i > 0 ? { marginTop: '1.75rem' } : undefined}>
                <div className="admin-sidebar-section-label">{section.label}</div>
                <ul className="admin-sidebar-menu">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    // Editing a book is a sub-page of "View All Books"
                    const isActive = activeSection === item.id || (activeSection === 'edit-book' && item.id === 'books');
                    return (
                      <li key={item.id}>
                        <Link
                          to={item.to}
                          className={`admin-nav-item ${isActive ? 'active' : ''}`}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <Icon className="admin-nav-icon" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="admin-sidebar-section-label" style={{ marginTop: '1.75rem' }}>
              PUBLIC STORE
            </div>
            <ul className="admin-sidebar-menu">
              <li>
                <button
                  type="button"
                  className="admin-nav-item"
                  onClick={() => {
                    setSidebarOpen(false);
                    setConfirmLeave(true);
                  }}
                >
                  <FaGlobe className="admin-nav-icon" />
                  <span>View Public Website</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="admin-sidebar-footer" style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--admin-sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="admin-sidebar-user" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div className="admin-user-avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaUserShield size={14} />
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name" style={{ fontSize: '0.85rem', fontWeight: 700 }}>Mystic Mithi</span>
                <span className="admin-user-role" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Author & Publisher</span>
              </div>
            </div>
            <button
              type="button"
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Sign Out"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <FaRightFromBracket size={15} />
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="admin-content-area">
          {/* Top Admin Bar */}
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              {/* Shown instead of the breadcrumb while the sidebar is hidden (tablet / phone) */}
              <Link to="/admin" className="admin-topbar-brand" aria-label="Mystic Mithi admin home">
                <span className="admin-sidebar-logo">Mystic Mithi</span>
              </Link>
              <div className="admin-page-breadcrumb">
                <span className="breadcrumb-parent">Admin Portal</span>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current" style={{ color: 'var(--primary)', fontWeight: 700 }}>{getBreadcrumbTitle()}</span>
              </div>
            </div>
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <FaBars />
            </button>
          </header>

          <main>
            {children}
          </main>
        </div>
      </div>

      {/* Confirm before leaving the admin for the public website */}
      {confirmLeave && (
        <div className="admin-modal-overlay" onClick={() => setConfirmLeave(false)}>
          <div
            className="admin-confirm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-confirm-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-confirm-icon">
              <FaGlobe />
            </div>
            <h2 id="admin-confirm-title" className="admin-confirm-title">Leave the admin portal?</h2>
            <p className="admin-confirm-text">
              You&rsquo;ll be taken to the public Mystic Mithi website. You&rsquo;ll stay signed in, so you can come back to the dashboard anytime.
            </p>
            <div className="admin-confirm-actions">
              <button type="button" className="btn-insp-secondary" onClick={() => setConfirmLeave(false)}>
                Stay Here
              </button>
              <button type="button" className="btn-insp-primary" autoFocus onClick={() => navigate('/')}>
                Yes, Open Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
