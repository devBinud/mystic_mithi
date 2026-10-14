import { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope, FaPaperPlane, FaLocationDot, FaBookBookmark } from 'react-icons/fa6';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Book Order Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || (!form.email && !form.phone)) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: 'Book Order Inquiry', message: '' });
  };

  return (
    <div className="insp-page-wrapper" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <div className="insp-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="insp-eyebrow">GET IN TOUCH</span>
          <h1 className="insp-section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
            LET'S CONNECT.
          </h1>
          <p className="insp-section-subtitle" style={{ margin: '0 auto', maxWidth: '650px' }}>
            Have a question about an order, want to invite Mystic Mithi for a literary reading, or simply wish to share how a poem moved you? Send a note directly.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'start' }}>
          {/* Form */}
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-heading)', margin: '0 0 1.25rem 0', textTransform: 'uppercase' }}>
              Send a Note to Mystic Mithi
            </h2>

            {submitted ? (
              <div style={{ padding: '2rem', background: '#e6f7ec', borderRadius: '8px', color: '#166534', fontWeight: 600, textAlign: 'center' }}>
                Thank you! Your message has been delivered to Mystic Mithi’s desk. We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="insp-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-heading)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-heading)' }}>
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Subject / Purpose
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="insp-input"
                  >
                    <option value="Book Order Inquiry">Book Order Inquiry</option>
                    <option value="Reader Note & Feedback">Reader Note & Appreciation</option>
                    <option value="Book Club & Speaking Invitation">Book Club & Speaking Invitation</option>
                    <option value="Media & Interview Request">Media & Interview Request</option>
                    <option value="Publishing & Collaboration">Publishing & Collaboration (Mithi-Inkling Ink)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Write your message, inquiry, or reader thoughts..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="insp-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn-insp-primary" style={{ justifyContent: 'center', padding: '0.85rem' }}>
                  Send Message <FaPaperPlane size={13} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* WhatsApp Direct Card */}
            <div style={{ background: '#25D366', color: '#FFFFFF', padding: '2rem', borderRadius: '10px', boxShadow: '0 8px 25px rgba(37,211,102,0.25)' }}>
              <FaWhatsapp size={32} style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: '0 0 0.5rem 0' }}>
                Instant WhatsApp Chat
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 1.25rem 0', opacity: 0.95 }}>
                Want to quickly order signed copies or ask about delivery status? Message directly on WhatsApp for swift assistance.
              </p>
              <a
                href="https://wa.me/917002974378?text=Hello%20Mystic%20Mithi,%20I%20would%20like%20to%20inquire%20about%20your%20books!"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#FFFFFF',
                  color: '#128C7E',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Chat on WhatsApp (+91 70029 74378)
              </a>
            </div>

            {/* Social Channels */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-heading)', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>
                Social Profiles & Imprint
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.9rem' }}>
                <a
                  href="https://www.instagram.com/mystic_mithi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'var(--text-heading)', textDecoration: 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FCE7F3', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaInstagram size={17} />
                  </div>
                  <div>
                    <strong>Instagram (@mystic_mithi)</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Follow for daily poetry and book excerpts</div>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/mysticmithi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'var(--text-heading)', textDecoration: 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E0E7FF', color: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaFacebookF size={16} />
                  </div>
                  <div>
                    <strong>Facebook Page</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Connect with our reader community</div>
                  </div>
                </a>

                <a
                  href="mailto:contact@mysticmithi.com"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'var(--text-heading)', textDecoration: 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <strong>Email Inquiries</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>contact@mysticmithi.com</div>
                  </div>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: 'var(--text-heading)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaBookBookmark size={16} />
                  </div>
                  <div>
                    <strong>Mithi-Inkling Ink Publishing</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dibrugarh, Assam, India & Worldwide Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
