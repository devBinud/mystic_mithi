// src/admin/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaUser, FaCircleExclamation, FaEye, FaEyeSlash } from 'react-icons/fa6';
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
          <Link to="/" className="admin-login-brand" aria-label="Mystic Mithi home">Mystic Mithi</Link>
          <span className="admin-login-rule" aria-hidden="true" />
          <h1 className="admin-login-title">Admin Portal</h1>
        </div>

        {error && (
          <div className="admin-error-box">
            <FaCircleExclamation />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-username">Username</label>
            <div className="admin-input-wrapper">
              <FaUser className="admin-input-icon" />
              <input
                id="admin-username"
                type="text"
                className="admin-form-input"
                placeholder="Enter your username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-password">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-input-icon" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="admin-form-input has-right-icon"
                placeholder="Enter password"
                autoComplete="current-password"
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

          <button type="submit" className="admin-btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
