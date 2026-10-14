// src/admin/AdminLayout.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaBookOpen, FaCartShopping, FaGear, FaGlobe,
  FaRightFromBracket, FaUserShield, FaBars, FaXmark
} from 'react-icons/fa6';
import logoImg from '../logo.jpeg';
import { logout } from './adminStore';

export default function AdminLayout({ children, activeTab = 'books', onTabChange }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'books', label: 'Books Management', icon: FaBookOpen },
    { id: 'orders', label: 'Orders & Sales', icon: FaCartShopping },
    { id: 'settings', label: 'Author & Store Settings', icon: FaGear },
  ];

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
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
            <Link to="/admin" className="admin-sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <img src={logoImg} alt="Mystic Mithi Logo" className="admin-sidebar-logo" style={{ maxHeight: '36px', borderRadius: '4px' }} />
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
            <div className="admin-sidebar-section-label">PUBLISHING DESK</div>
            <ul className="admin-sidebar-menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`admin-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (onTabChange) onTabChange(item.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <Icon className="admin-nav-icon" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="admin-sidebar-section-label" style={{ marginTop: '1.75rem' }}>
              PUBLIC STORE
            </div>
            <ul className="admin-sidebar-menu">
              <li>
                <Link to="/" className="admin-nav-item" onClick={() => setSidebarOpen(false)}>
                  <FaGlobe className="admin-nav-icon" />
                  <span>View Public Website</span>
                </Link>
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
              <button
                type="button"
                className="admin-sidebar-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle Navigation Menu"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: 'var(--text-heading)', display: 'none' }}
              >
                <FaBars />
              </button>
              <div className="admin-page-breadcrumb">
                <span className="breadcrumb-parent">Author Portal</span>
                <span style={{ margin: '0 6px' }}>/</span>
                <span className="breadcrumb-current" style={{ color: 'var(--primary)', fontWeight: 700 }}>{getBreadcrumbTitle()}</span>
              </div>
            </div>

            <div className="admin-topbar-right">
              <Link to="/books" className="btn-insp-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                Open Store ↗
              </Link>
            </div>
          </header>

          <main style={{ padding: '2rem', flex: 1, minWidth: 0, overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
