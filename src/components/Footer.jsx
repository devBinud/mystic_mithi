import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="insp-footer mm-footer">
      <div className="insp-container">
        <div className="mm-footer-main">
          <span className="mm-logo-script mm-footer-logo">Mystic Mithi</span>
          <p className="mm-footer-tagline">Poetry and prose for the quiet, unspoken parts of you.</p>

          <ul className="mm-footer-links">
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="mm-footer-social">
            <a href="https://wa.me/917002974378" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
              <FaWhatsapp size={16} />
            </a>
            <a href="https://www.instagram.com/mystic_mithi25" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram size={16} />
            </a>
            <a href="https://www.facebook.com/mysticmithi" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebookF size={15} />
            </a>
            <a href="mailto:mystic.mithi25@gmail.com" title="Email the Author">
              <FaEnvelope size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="mm-footer-bottom">
        <span>© {new Date().getFullYear()} Mystic Mithi · _Inkling Ink</span>
        <span>
          Designed &amp; Developed by{' '}
          <a href="https://www.binudsoftwaresolutions.in" target="_blank" rel="noopener noreferrer">
            Binud Software Solutions
          </a>
        </span>
      </div>
    </footer>
  )
}
