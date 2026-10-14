import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope, FaLock } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="insp-footer">
      <div className="insp-container">
        <div className="insp-footer-main">
          <div className="insp-footer-brand">
            <span className="insp-footer-avatar" aria-hidden="true">M</span>
            <span className="insp-footer-brand-text">Mystic Mithi</span>
          </div>

          <ul className="insp-footer-links">
            <li>
              <Link to="/" className="insp-footer-link">Home</Link>
            </li>
            <li>
              <Link to="/books" className="insp-footer-link">Books</Link>
            </li>
            <li>
              <Link to="/about" className="insp-footer-link">About Author</Link>
            </li>
            <li>
              <Link to="/contact" className="insp-footer-link">Contact</Link>
            </li>
            <li>
              <Link to="/books" className="btn-insp-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}>
                Order Books
              </Link>
            </li>
          </ul>
        </div>

        <div className="insp-footer-bottom">
          <div>
            © {new Date().getFullYear()} Mystic Mithi — Inkling Ink Publishing. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href="https://wa.me/917002974378"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A0A0A0', transition: 'color 0.2s ease' }}
              title="Chat on WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href="https://www.instagram.com/mystic_mithi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A0A0A0', transition: 'color 0.2s ease' }}
              title="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/mysticmithi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A0A0A0', transition: 'color 0.2s ease' }}
              title="Facebook"
            >
              <FaFacebookF size={15} />
            </a>
            <a
              href="mailto:contact@mysticmithi.com"
              style={{ color: '#A0A0A0', transition: 'color 0.2s ease' }}
              title="Email the Author"
            >
              <FaEnvelope size={15} />
            </a>
            <Link
              to="/admin/login"
              style={{ color: '#707070', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              title="Author Admin Portal"
            >
              <FaLock size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
