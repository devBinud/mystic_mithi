// src/admin/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaUser, FaCircleExclamation, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa6';
import logoImg from '../logo.jpeg';
import { isAuthenticated, login } from './adminStore';
import './admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setError('Invalid author username or password.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-logo-wrapper" style={{ background: '#FFFFFF', padding: '6px', borderRadius: '8px' }}>
            <img src={logoImg} alt="Mystic Mithi Logo" className="admin-login-logo" style={{ maxHeight: '45px', objectFit: 'contain' }} />
          </div>
          <h1 className="admin-login-title">Author Portal</h1>
          <p className="admin-login-subtitle">Sign in to manage books, prices, and reader orders</p>
        </div>

        {error && (
          <div className="admin-error-box">
            <FaCircleExclamation />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Username</label>
            <div className="admin-input-wrapper">
              <FaUser className="admin-input-icon" />
              <input
                type="text"
                className="admin-form-input"
                placeholder="Enter username (e.g. mithi or admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-form-input has-right-icon"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn-primary" style={{ marginTop: '1.25rem', background: 'var(--primary)', borderColor: 'var(--primary)' }}>
            Sign In to Desk
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FaArrowLeft size={11} /> Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
