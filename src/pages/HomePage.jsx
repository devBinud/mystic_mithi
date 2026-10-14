import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaCheck,
  FaArrowRight,
  FaPlus,
  FaMinus,
  FaPaperPlane,
  FaCartShopping,
  FaWhatsapp,
  FaBookOpen,
  FaFeatherPointed
} from 'react-icons/fa6';

import authorImg from '../assets/author.jpg';
import book1Img from '../assets/book1.jpg';
import book2Img from '../assets/book2.jpg';
import book3Img from '../assets/book3.jpg';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [sampleEmail, setSampleEmail] = useState('');
  const [sampleSubmitted, setSampleSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => setNewsletterSubmitted(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleSampleSubmit = (e) => {
    e.preventDefault();
    if (sampleEmail) {
      setSampleSubmitted(true);
      setTimeout(() => setSampleSubmitted(false), 4000);
      setSampleEmail('');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 5000);
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  const faqs = [
    {
      q: 'Can I order author-signed copies directly through this website?',
      a: 'Yes, absolutely! Every book ordered directly through our official website comes personally signed by Mystic Mithi, often with a unique hand-written inscription or bookmark from Mithi-Inkling Ink.'
    },
    {
      q: 'How long does delivery take across India?',
      a: 'Orders are processed and dispatched within 24–48 hours from Dibrugarh, Assam. Standard delivery takes 3 to 6 business days depending on your location, with real-time tracking provided via SMS and WhatsApp.'
    },
    {
      q: 'Which book should I start with if I am new to Mystic Mithi?',
      a: 'If you love lyrical, soul-stirring verses, begin with "The Whispers of Ink" — her flagship bestselling poetry collection. If you prefer immersive philosophical prose and meditative stories, "Echoes of the Mystic Mind" is the ideal starting point.'
    },
    {
      q: 'Are bulk orders supported for book clubs, weddings, or literary gifting?',
      a: 'Yes! We frequently fulfill customized bulk orders with special gift packaging for book clubs, literature events, and corporate gifts. Contact us via the form or WhatsApp for customized volume pricing.'
    },
    {
      q: 'Do you ship to international readers outside India?',
      a: 'Yes, international shipping is available upon request. Please connect with our team via WhatsApp (+91 70029 74378) or email (contact@mysticmithi.com) to calculate international postage to your country.'
    }
  ];

  return (
    <div className="insp-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="insp-hero-section">
        <div className="insp-container">
          <div className="insp-hero-grid">
            <div className="insp-hero-left">
              <span className="insp-eyebrow">
                BESTSELLING CONTEMPORARY POETRY & PROSE
              </span>

              <h1 className="insp-hero-title">
                WORDS THAT STIR THE SOUL.
              </h1>
              <span className="insp-hero-title-accent">
                RECLAIM YOUR INNER TRUTH.
              </span>

              <div className="insp-author-badge">
                <img
                  src={authorImg}
                  alt="Mystic Mithi"
                  className="insp-author-badge-img"
                />
                <div className="insp-author-badge-info">
                  <h4>Mystic Mithi</h4>
                  <span>Author & Founder of Mithi-Inkling Ink</span>
                </div>
              </div>

              <p className="insp-hero-desc">
                Raw, evocative verses and contemplative prose exploring love, heartbreak, solitude, and the quiet resilience
                of the human spirit. Discover published works crafted to accompany you through every season of life.
              </p>

              <div className="insp-hero-actions">
                <Link to="/books" className="btn-insp-primary">
                  Order Your Copy <FaArrowRight size={13} />
                </Link>
                <a href="#sample-chapter" className="btn-insp-secondary">
                  Download Free Chapter
                </a>
              </div>
            </div>

            <div className="insp-hero-right">
              <div className="insp-showcase-wrapper">
                <div className="insp-showcase-card">
                  <Link to="/books/book-1">
                    <img
                      src={book1Img}
                      alt="The Whispers of Ink by Mystic Mithi"
                      className="insp-showcase-img"
                    />
                  </Link>
                </div>
                <div className="insp-review-badge-float">
                  <div className="insp-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={12} />
                    ))}
                  </div>
                  <p className="insp-review-badge-text">
                    "A masterpiece that made me weep and heal at the same time."
                  </p>
                  <p className="insp-review-badge-author">
                    — Ananya B., Verified Reader
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT YOU'LL WALK AWAY WITH */}
      <section className="insp-walkaway-section">
        <div className="insp-container">
          <div className="insp-walkaway-grid">
            <div className="insp-walkaway-visual">
              <div className="insp-book-mockup-wrapper">
                <Link to="/books/book-2">
                  <img
                    src={book2Img}
                    alt="Echoes of the Mystic Mind"
                    className="insp-book-mockup-img"
                  />
                </Link>
              </div>
            </div>

            <div className="insp-walkaway-right">
              <span className="insp-eyebrow">THE LITERARY EXPERIENCE</span>
              <h2 className="insp-section-title">
                WHAT READERS EXPERIENCE IN EVERY CHAPTER.
              </h2>
              <p className="insp-section-subtitle">
                Literature that doesn't just entertain, but mirrors the deepest, most quiet chambers of your heart.
              </p>

              <ul className="insp-checklist">
                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>Deep Emotional Catharsis:</strong> Unraveling complex human feelings — grief, longing, acceptance, and unspoken affection — with breathtaking poetic precision.
                  </div>
                </li>

                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>Philosophical Solace:</strong> Contemplative prose that offers clarity amidst modern overwhelm, guiding readers toward self-acceptance and quiet courage.
                  </div>
                </li>

                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>Keepsake Luxury Editions:</strong> Beautifully printed on archival warm cream paper by Mithi-Inkling Ink, designed to be treasured on your personal bedside table.
                  </div>
                </li>

                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>A Lifelong Sanctuary:</strong> Verses and passages you will dog-ear, underline, and return to year after year whenever your soul needs gentle companionship.
                  </div>
                </li>
              </ul>

              <Link to="/books" className="btn-insp-primary">
                Browse All Books <FaArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BAR */}
      <section className="insp-stats-section">
        <div className="insp-container">
          <div className="insp-stats-grid">
            <div className="insp-stat-item">
              <div className="insp-stat-number">50,000+</div>
              <div className="insp-stat-label">
                Copies Read & Cherished Across India & Worldwide
              </div>
            </div>
            <div className="insp-stat-item">
              <div className="insp-stat-number">3+</div>
              <div className="insp-stat-label">
                Published Bestselling Literary Masterpieces
              </div>
            </div>
            <div className="insp-stat-item">
              <div className="insp-stat-number">4.9★</div>
              <div className="insp-stat-label">
                Average Reader Rating Across All Platforms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUTHOR STORY SECTION */}
      <section className="insp-author-feature-section">
        <div className="insp-author-watermark">MYSTIC MITHI</div>
        <div className="insp-container">
          <div className="insp-author-grid">
            <div className="insp-author-left">
              <span className="insp-eyebrow">MEET THE AUTHOR</span>
              <h2 className="insp-section-title">MYSTIC MITHI</h2>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
                Mystic Mithi is an Indian author, poet, and creative soul known for her poignant, lyrical explorations
                of the unspoken human heart. Rooted in Assam and writing for a worldwide audience, her work weaves
                classical elegance with contemporary emotional resonance.
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                Through her publishing initiative <strong>Mithi-Inkling Ink</strong>, she produces collectible books
                that speak to night-thinkers, dreamers, and seekers of timeless truth.
              </p>
            </div>

            <div className="insp-author-center">
              <img
                src={authorImg}
                alt="Author Mystic Mithi"
                className="insp-author-cutout-img"
                style={{ borderRadius: '12px', boxShadow: '0 20px 45px rgba(0,0,0,0.18)' }}
              />
            </div>

            <div className="insp-author-right">
              <div className="insp-story-card">
                <h3>
                  WHEN INK TOUCHES <span>THE UNHEALED PLACES.</span>
                </h3>
                <p>
                  "We write not to escape life, but to touch the parts of our soul that silence could never reach.
                  Every poem is a bridge between two strangers who feel the exact same ache."
                </p>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  — MYSTIC MITHI
                </div>
                <Link to="/about" className="insp-text-link">
                  Read Author's Biography <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. READER REVIEWS */}
      <section className="insp-reviews-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">READER EXPERIENCES</span>
            <h2 className="insp-section-title">THESE BOOKS TOUCHED SOULS.</h2>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              Hear from readers who found solace, beauty, and quiet healing in Mystic Mithi’s published pages.
            </p>
          </div>

          <div className="insp-reviews-grid">
            <div className="insp-review-card">
              <div className="insp-review-header">
                <div className="insp-stars-row" style={{ marginBottom: '0.5rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={15} />
                  ))}
                </div>
                <h4 className="insp-reviewer-name">Debjani Sarma</h4>
              </div>
              <p className="insp-review-quote">
                "Reading 'The Whispers of Ink' felt like someone sitting beside me in the dark and holding my hand without asking why I was crying. Her words have an almost sacred gentleness to them."
              </p>
              <div className="insp-review-footer">
                <span className="insp-treatment-tag">The Whispers of Ink</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Guwahati</span>
              </div>
            </div>

            <div className="insp-review-card">
              <div className="insp-review-header">
                <div className="insp-stars-row" style={{ marginBottom: '0.5rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={15} />
                  ))}
                </div>
                <h4 className="insp-reviewer-name">Rahul Sen</h4>
              </div>
              <p className="insp-review-quote">
                "'Echoes of the Mystic Mind' is the kind of book you read with a pencil in hand. Every third sentence demands to be underlined. The packaging and paper quality from Mithi-Inkling Ink are exquisite."
              </p>
              <div className="insp-review-footer">
                <span className="insp-treatment-tag">Echoes of the Mystic Mind</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bangalore</span>
              </div>
            </div>

            <div className="insp-review-card">
              <div className="insp-review-header">
                <div className="insp-stars-row" style={{ marginBottom: '0.5rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={15} />
                  ))}
                </div>
                <h4 className="insp-reviewer-name">Priyanka Barua</h4>
              </div>
              <p className="insp-review-quote">
                "I ordered a signed copy of 'Between the Silence' as a gift for myself. It arrived beautifully packaged with an author note. It is truly one of the most poignant novellas I have read this year."
              </p>
              <div className="insp-review-footer">
                <span className="insp-treatment-tag">Between the Silence</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dibrugarh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED BOOKS SHOWCASE */}
      <section className="insp-journey-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">DIRECT AUTHOR STORE</span>
            <h2 className="insp-section-title">FEATURED BOOKS AVAILABLE NOW.</h2>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              Order author-signed copies directly from Mithi-Inkling Ink with nationwide delivery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Book 1 */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Link to="/books/book-1">
                <img src={book1Img} alt="The Whispers of Ink" style={{ maxHeight: '300px', borderRadius: '6px', marginBottom: '1.25rem', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.2)' }} />
              </Link>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Poetry & Musings
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--text-heading)' }}>
                The Whispers of Ink
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: '1.6', margin: '0 0 1.25rem 0', flex: 1 }}>
                A lyrical collection exploring light, shadows, and the unspoken confessions of the human heart.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-ui)' }}>
                <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>₹399</span>
                <Link to="/books/book-1" className="btn-insp-primary" style={{ fontSize: '0.78rem', padding: '0.5rem 1.15rem' }}>
                  <FaCartShopping size={12} /> Buy Now
                </Link>
              </div>
            </div>

            {/* Book 2 */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Link to="/books/book-2">
                <img src={book2Img} alt="Echoes of the Mystic Mind" style={{ maxHeight: '300px', borderRadius: '6px', marginBottom: '1.25rem', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.2)' }} />
              </Link>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Philosophical Prose
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--text-heading)' }}>
                Echoes of the Mystic Mind
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: '1.6', margin: '0 0 1.25rem 0', flex: 1 }}>
                Atmospheric reflections on solitude, self-discovery, and timeless existential truths.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-ui)' }}>
                <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>₹449</span>
                <Link to="/books/book-2" className="btn-insp-primary" style={{ fontSize: '0.78rem', padding: '0.5rem 1.15rem' }}>
                  <FaCartShopping size={12} /> Buy Now
                </Link>
              </div>
            </div>

            {/* Book 3 */}
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <Link to="/books/book-3">
                <img src={book3Img} alt="Between the Silence" style={{ maxHeight: '300px', borderRadius: '6px', marginBottom: '1.25rem', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.2)' }} />
              </Link>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Literary Novella
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--text-heading)' }}>
                Between the Silence
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: '1.6', margin: '0 0 1.25rem 0', flex: 1 }}>
                A delicate novella about two souls bound by an unspoken language that defies circumstance.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-ui)' }}>
                <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>₹349</span>
                <Link to="/books/book-3" className="btn-insp-primary" style={{ fontSize: '0.78rem', padding: '0.5rem 1.15rem' }}>
                  <FaCartShopping size={12} /> Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALLOUT BANNER 1 */}
      <section className="insp-banner-cta-section">
        <div className="insp-container">
          <div className="insp-banner-cta-content">
            <h2 className="insp-banner-cta-title">
              Seeking words that truly understand you?
            </h2>
            <p className="insp-banner-cta-sub">
              Immerse yourself in timeless verses and signed copies directly from author Mystic Mithi.
            </p>
            <Link to="/books" className="btn-insp-primary">
              Explore All Books <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. JOIN THE LITERARY CIRCLE (NEWSLETTER) */}
      <section className="insp-newsletter-section">
        <div className="insp-container">
          <div className="insp-newsletter-container">
            <div>
              <h3 className="insp-newsletter-title">JOIN THE LITERARY CIRCLE.</h3>
              <p className="insp-newsletter-sub">
                Receive weekly unpublished poems, intimate writing reflections, and priority notice for limited edition hardcover releases.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="insp-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="insp-input"
              />
              <button type="submit" className="btn-insp-primary" style={{ whiteSpace: 'nowrap' }}>
                {newsletterSubmitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. FROM THE LITERARY JOURNAL */}
      <section className="insp-journal-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">ESSAYS & MUSINGS</span>
            <h2 className="insp-section-title">FROM THE LITERARY JOURNAL.</h2>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              Contemplative reflections on writing, solitude, emotional honesty, and the creative craft.
            </p>
          </div>

          <div className="insp-journal-grid">
            <article className="insp-journal-card">
              <div className="insp-journal-img-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F0E8' }}>
                <FaFeatherPointed size={48} color="var(--primary)" opacity={0.6} />
              </div>
              <span className="insp-journal-tag">POETIC CRAFT</span>
              <h3 className="insp-journal-title">
                Why Vulnerability in Poetry is Our Deepest Form of Courage
              </h3>
              <p className="insp-journal-excerpt">
                We spend our days protecting ourselves from being seen. Why opening your raw wounds onto paper is the only way to heal both yourself and the reader...
              </p>
              <Link to="/about" className="insp-text-link">
                Read Essay <FaArrowRight size={11} />
              </Link>
            </article>

            <article className="insp-journal-card">
              <div className="insp-journal-img-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECE6DC' }}>
                <FaBookOpen size={48} color="var(--primary)" opacity={0.6} />
              </div>
              <span className="insp-journal-tag">PHILOSOPHY</span>
              <h3 className="insp-journal-title">
                The Art of Embracing Solitude: Reflections from Midnight Writing
              </h3>
              <p className="insp-journal-excerpt">
                Solitude is not emptiness; it is the space where our truest voice finally finds enough quiet to speak without fear of interruption...
              </p>
              <Link to="/about" className="insp-text-link">
                Read Essay <FaArrowRight size={11} />
              </Link>
            </article>

            <article className="insp-journal-card">
              <div className="insp-journal-img-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F0E8' }}>
                <FaFeatherPointed size={48} color="var(--primary)" opacity={0.6} />
              </div>
              <span className="insp-journal-tag">BEHIND THE BOOK</span>
              <h3 className="insp-journal-title">
                Between the Silence: How Two Years of Longing Became a Novella
              </h3>
              <p className="insp-journal-excerpt">
                The stories we never tell out loud often make the best literature. Here is the backstory behind the quiet characters of my recent work...
              </p>
              <Link to="/about" className="insp-text-link">
                Read Essay <FaArrowRight size={11} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 10. CALLOUT BANNER 2 */}
      <section className="insp-banner-cta-section">
        <div className="insp-container">
          <div className="insp-banner-cta-content">
            <h2 className="insp-banner-cta-title">
              A single page can alter how you see yourself.
            </h2>
            <p className="insp-banner-cta-sub">
              Order author-signed copies delivered directly to your doorstep.
            </p>
            <Link to="/books" className="btn-insp-primary">
              Order A Signed Copy <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="insp-faq-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">COMMON INQUIRIES</span>
            <h2 className="insp-section-title">FREQUENTLY ASKED QUESTIONS.</h2>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              Everything you need to know about purchasing books, delivery, and author copies.
            </p>
          </div>

          <div className="insp-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="insp-faq-item">
                <button
                  type="button"
                  className="insp-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}>
                    {openFaq === index ? <FaMinus size={13} /> : <FaPlus size={13} />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="insp-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FREE CHAPTER DOWNLOAD */}
      <section id="sample-chapter" className="insp-free-guide-section">
        <div className="insp-container">
          <div className="insp-free-guide-grid">
            <div className="insp-walkaway-visual">
              <div className="insp-book-mockup-wrapper" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <img
                  src={book1Img}
                  alt="The Whispers of Ink Free Chapter"
                  style={{ width: '100%', maxWidth: '320px', borderRadius: '6px', display: 'block', margin: '0 auto' }}
                />
              </div>
            </div>

            <div>
              <span className="insp-eyebrow">FREE DIGITAL SAMPLER</span>
              <h2 className="insp-section-title">
                DOWNLOAD THE OPENING CHAPTER OF 'THE WHISPERS OF INK'.
              </h2>
              <p className="insp-section-subtitle">
                Experience the first 25 pages of Mystic Mithi’s celebrated poetry collection. Download the beautifully formatted PDF sampler right to your device.
              </p>

              <form onSubmit={handleSampleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={sampleEmail}
                  onChange={(e) => setSampleEmail(e.target.value)}
                  required
                  className="insp-input"
                />
                <button type="submit" className="btn-insp-primary" style={{ justifyContent: 'center' }}>
                  {sampleSubmitted ? 'Chapter Sent to Your Email!' : 'Download Free Chapter (PDF)'} <FaArrowRight size={13} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 13. AUTHOR INQUIRY / CONTACT */}
      <section className="insp-contact-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">COMMUNICATE</span>
            <h2 className="insp-section-title">CONNECT WITH MYSTIC MITHI.</h2>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              For literary invitations, reader thoughts, or order assistance, write directly.
            </p>
          </div>

          <div className="insp-contact-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
                Send a Reader Note
              </h3>
              {contactSubmitted ? (
                <div style={{ padding: '2rem', background: '#e6f7ec', borderRadius: '6px', color: '#166534', fontWeight: 600 }}>
                  Thank you! Your note has been delivered to Mystic Mithi’s desk.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="insp-contact-form">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="insp-input"
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="insp-input"
                  />
                  <textarea
                    placeholder="Your thoughts, message, or question..."
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="insp-textarea"
                  ></textarea>
                  <button type="submit" className="btn-insp-primary" style={{ justifyContent: 'center' }}>
                    Send Message <FaPaperPlane size={13} />
                  </button>
                </form>
              )}
            </div>

            <div>
              <div style={{ background: 'var(--bg-main)', padding: '2.5rem', borderRadius: '8px' }}>
                <span className="insp-eyebrow">PUBLISHING IMPRINT</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
                  Mithi-Inkling Ink
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.925rem', color: 'var(--text-body)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <FaWhatsapp size={18} color="#25D366" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>WhatsApp Book Orders</strong>
                      <p style={{ margin: 0 }}>
                        <a href="https://wa.me/917002974378" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: 600 }}>
                          +91 70029 74378
                        </a>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <FaBookOpen size={18} color="var(--primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Author Signed Editions</strong>
                      <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                        All orders shipped securely with bookmark and keepsake note.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-ui)' }}>
                  <Link to="/books" className="btn-insp-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    View Full Book Catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. INSPIRATION QUOTE SECTION */}
      <section className="insp-quote-section">
        <div className="insp-container">
          <blockquote className="insp-quote-text">
            “Literature is the quiet sanctuary where the broken pieces of our heart find their original rhythm.”
          </blockquote>
          <div className="insp-quote-attribution">
            — MYSTIC MITHI, MITHI-INKLING INK
          </div>
        </div>
      </section>
    </div>
  );
}
