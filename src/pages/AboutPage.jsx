import { Link } from 'react-router-dom';
import { FaBookOpen, FaFeatherPointed, FaHeart, FaAward, FaArrowRight, FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6';
import authorImg from '../assets/author.jpg';
import book1Img from '../assets/book1.jpg';
import book2Img from '../assets/book2.jpg';
import book3Img from '../assets/book3.jpg';

export default function AboutPage() {
  return (
    <div className="insp-page-wrapper" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <div className="insp-container">
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="insp-eyebrow">THE VOICE BEHIND THE INK</span>
          <h1 className="insp-section-title" style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)' }}>
            MEET MYSTIC MITHI.
          </h1>
          <p className="insp-section-subtitle" style={{ margin: '0 auto', maxWidth: '680px' }}>
            Author, poet, and founder of Mithi-Inkling Ink — exploring love, solitude, emotional resilience, and the unspoken architecture of the human heart.
          </p>
        </div>

        {/* Bio Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '4.5rem', alignItems: 'center', marginBottom: '5.5rem' }}>
          <div>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.22)',
                position: 'relative'
              }}
            >
              <img
                src={authorImg}
                alt="Author Mystic Mithi"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                Mystic Mithi
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 1rem' }}>
                Bestselling Author & Literary Creator
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <a
                  href="https://wa.me/917002974378"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366' }}
                  title="WhatsApp"
                >
                  <FaWhatsapp size={17} />
                </a>
                <a
                  href="https://www.instagram.com/mystic_mithi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E1306C' }}
                  title="Instagram"
                >
                  <FaInstagram size={17} />
                </a>
                <a
                  href="https://www.facebook.com/mysticmithi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1877F2' }}
                  title="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <span className="insp-eyebrow">AUTHOR'S BIOGRAPHY</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-heading)', textTransform: 'uppercase', margin: '0 0 1.25rem 0', lineHeight: 1.2 }}>
              TURNING SILENCE INTO TIMELESS VERSES.
            </h2>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
              Known affectionately by thousands of devoted readers across the country as <strong>Mystic Mithi</strong>, she is a contemporary literary voice whose work traverses the intimate spectrum between vulnerability and strength. Her writing marries raw emotional candor with lyrical elegance.
            </p>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
              Under her independent literary imprint <strong>Mithi-Inkling Ink</strong>, she has published acclaimed collections including <em>The Whispers of Ink</em>, <em>Echoes of the Mystic Mind</em>, and <em>Between the Silence</em>. Her poems and reflections regularly circulate across social platforms, resonating with anyone navigating love, heartbreak, grief, and spiritual quietude.
            </p>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '2rem' }}>
              Whether penning contemplative verses late at night or engaging in heartfelt conversations with fellow readers, Mystic Mithi creates literature that serves as a sanctuary — reminding us that we are never truly alone in what we feel.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/books" className="btn-insp-primary">
                Browse My Books <FaArrowRight size={13} />
              </Link>
              <Link to="/contact" className="btn-insp-secondary">
                Get In Touch With Mithi
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Pillars / Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '5.5rem' }}>
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '8px' }}>
            <FaFeatherPointed size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>
              Lyrical Authenticity
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-body)', margin: 0 }}>
              Writing that doesn't shy away from human messiness, weaving poetry out of everyday sorrows and quiet triumphs.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '8px' }}>
            <FaBookOpen size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>
              Independent Publishing
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-body)', margin: 0 }}>
              Through Mithi-Inkling Ink, creating thoughtfully designed, keepsake editions printed on luxury cream paper.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '8px' }}>
            <FaHeart size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>
              Reader Community
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-body)', margin: 0 }}>
              Over 50,000 readers who find companionship, healing, and courage in her weekly verses and published works.
            </p>
          </div>
        </div>

        {/* Featured Books Preview */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="insp-eyebrow">CURATED WORKS</span>
          <h2 className="insp-section-title">BOOKS BY MYSTIC MITHI.</h2>
          <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
            Discover her celebrated collection of poetry, fiction, and reflective journals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '2rem 1.5rem', borderRadius: '10px', textAlign: 'center' }}>
            <img src={book1Img} alt="The Whispers of Ink" style={{ maxHeight: '280px', borderRadius: '6px', marginBottom: '1.25rem', boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-heading)', margin: '0 0 0.35rem 0' }}>The Whispers of Ink</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Poetry & Musings • ₹399</p>
            <Link to="/books/book-1" className="btn-insp-primary" style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}>
              View Book
            </Link>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '2rem 1.5rem', borderRadius: '10px', textAlign: 'center' }}>
            <img src={book2Img} alt="Echoes of the Mystic Mind" style={{ maxHeight: '280px', borderRadius: '6px', marginBottom: '1.25rem', boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-heading)', margin: '0 0 0.35rem 0' }}>Echoes of the Mystic Mind</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Philosophical Prose • ₹449</p>
            <Link to="/books/book-2" className="btn-insp-primary" style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}>
              View Book
            </Link>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '2rem 1.5rem', borderRadius: '10px', textAlign: 'center' }}>
            <img src={book3Img} alt="Between the Silence" style={{ maxHeight: '280px', borderRadius: '6px', marginBottom: '1.25rem', boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-heading)', margin: '0 0 0.35rem 0' }}>Between the Silence</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Literary Fiction • ₹349</p>
            <Link to="/books/book-3" className="btn-insp-primary" style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}>
              View Book
            </Link>
          </div>
        </div>

        {/* Pull Quote */}
        <section className="insp-quote-section" style={{ border: 'none', background: 'transparent', padding: '2rem 0' }}>
          <blockquote className="insp-quote-text" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
            “We write not to escape life, but to touch the parts of our soul that silence could never reach.”
          </blockquote>
          <div className="insp-quote-attribution">
            — MYSTIC MITHI, MITHI-INKLING INK
          </div>
        </section>
      </div>
    </div>
  );
}
