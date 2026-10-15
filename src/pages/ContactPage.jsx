import { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope, FaPaperPlane, FaCheck } from 'react-icons/fa6';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: 'Book Order Inquiry',
  message: ''
};

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="insp-page-wrapper mm-contact-page">
      <div className="insp-container">
        <header className="mm-contact-head">
          <span className="insp-eyebrow">GET IN TOUCH</span>
          <h1 className="insp-section-title">Let&rsquo;s Connect.</h1>
          <p className="insp-section-subtitle">
            Have a question about an order, want to invite Mystic Mithi for a literary reading, or simply wish to share
            how a poem moved you? Send a note directly.
          </p>
        </header>

        <div className="mm-contact-grid">
          {/* Form */}
          <div className="mm-checkout-card mm-contact-form-card">
            <h2>Send a note</h2>

            {submitted ? (
              <div className="mm-contact-sent">
                <span><FaCheck size={16} /></span>
                <p>Thank you! Your message has been delivered. You&rsquo;ll hear back soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mm-contact-form">
                <label className="mm-field">
                  <span>Your name *</span>
                  <input type="text" required placeholder="Full name" value={form.name} onChange={update('name')} />
                </label>

                <div className="mm-contact-row">
                  <label className="mm-field">
                    <span>Email *</span>
                    <input type="email" required placeholder="you@example.com" value={form.email} onChange={update('email')} />
                  </label>
                  <label className="mm-field">
                    <span>Phone</span>
                    <input type="tel" placeholder="Mobile number" value={form.phone} onChange={update('phone')} />
                  </label>
                </div>

                <label className="mm-field">
                  <span>Subject</span>
                  <select value={form.subject} onChange={update('subject')}>
                    <option value="Book Order Inquiry">Book Order Inquiry</option>
                    <option value="Reader Note & Feedback">Reader Note &amp; Appreciation</option>
                    <option value="Book Club & Speaking Invitation">Book Club &amp; Speaking Invitation</option>
                    <option value="Media & Interview Request">Media &amp; Interview Request</option>
                    <option value="Publishing & Collaboration">Publishing &amp; Collaboration</option>
                  </select>
                </label>

                <label className="mm-field">
                  <span>Message *</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message, inquiry, or reader thoughts..."
                    value={form.message}
                    onChange={update('message')}
                  />
                </label>

                <button type="submit" className="btn-insp-primary mm-contact-submit">
                  Send Message <FaPaperPlane size={13} />
                </button>
              </form>
            )}
          </div>

          {/* Side column */}
          <aside className="mm-contact-side">
            <div className="mm-contact-wa">
              <FaWhatsapp size={30} />
              <h3>Prefer to chat?</h3>
              <p>Ask about books, orders or delivery &mdash; message directly on WhatsApp.</p>
              <a
                href="https://wa.me/917002974378?text=Hello%20Mystic%20Mithi,%20I%20would%20like%20to%20inquire%20about%20your%20books!"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mm-checkout-card mm-contact-links">
              <h2>Find her online</h2>
              <a href="https://www.instagram.com/mystic_mithi25" target="_blank" rel="noopener noreferrer">
                <span className="mm-contact-icon"><FaInstagram size={17} /></span>
                <span>
                  <strong>Instagram</strong>
                  <small>@mystic_mithi25 &middot; poetry and book excerpts</small>
                </span>
              </a>
              <a href="https://www.facebook.com/mysticmithi" target="_blank" rel="noopener noreferrer">
                <span className="mm-contact-icon"><FaFacebookF size={15} /></span>
                <span>
                  <strong>Facebook</strong>
                  <small>Connect with the reader community</small>
                </span>
              </a>
              <a href="mailto:mystic.mithi25@gmail.com">
                <span className="mm-contact-icon"><FaEnvelope size={15} /></span>
                <span>
                  <strong>Email</strong>
                  <small>mystic.mithi25@gmail.com</small>
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
