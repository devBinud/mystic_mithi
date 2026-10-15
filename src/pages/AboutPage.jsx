import { Link } from 'react-router-dom';
import { FaBookOpen, FaFeatherPointed, FaHeart, FaArrowRight, FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa6';
import authorImg from '../assets/author.jpg';
import { getBooks } from '../admin/adminStore';
import BookCard from '../components/BookCard';

export default function AboutPage() {
  const books = getBooks();
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
            Poet writing as _Inkling Ink — exploring mystical love, life, the cosmos and the quiet depths of the human heart.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="mm-about-grid">
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
                Poet &middot; writing as _Inkling Ink
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
                  href="https://www.instagram.com/mystic_mithi25"
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
              <strong>Mystic Mithi</strong>, who writes as <strong>_Inkling Ink</strong>, has always been fascinated with
              words and the depth of life. She believes words can solve the puzzle of restless hearts and enlighten them
              with a new light. Her inspiration is Jalāl ad-Dīn Muhammad Rūmī, whose grace and magic led her to write about
              mystical love, life and inspiration.
            </p>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
              A deep thinker and keen observer, an empath, perpetually poetic and a worshipper of words, she reads Rumi,
              John Keats, Pablo Neruda, Edgar Allan Poe, Franz Kafka and Rabindranath Tagore. She has published two poetry
              collections: <em>When the Mystic Meets a Starfish</em> and <em>Caravan to the Cosmos</em>.
            </p>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '2rem' }}>
              Beyond poetry, she loves exploring new places and cuisines, every genre of music, and the latest in
              technology. She strongly trusts in goodness and humbleness &mdash; and wants only to share &ldquo;the
              deepness&rdquo; with her readers.
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
        <div className="mm-about-values">
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
              Published Poet
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-body)', margin: 0 }}>
              Two published poetry collections: When the Mystic Meets a Starfish and Caravan to the Cosmos.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '8px' }}>
            <FaHeart size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>
              Reader Community
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-body)', margin: 0 }}>
              Readers who find companionship, healing and courage in her verses &mdash; follow along on Instagram @mystic_mithi25.
            </p>
          </div>
        </div>

        {/* Featured Books Preview */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="insp-eyebrow">CURATED WORKS</span>
          <h2 className="insp-section-title">BOOKS BY MYSTIC MITHI.</h2>
          <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
            Two collections of mystical, cosmic and soulful poetry.
          </p>
        </div>

        <div className="insp-product-grid" style={{ marginBottom: '4rem' }}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Pull Quote */}
        <section className="insp-quote-section" style={{ border: 'none', background: 'transparent', padding: '2rem 0' }}>
          <blockquote className="insp-quote-text" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
            “For getting a pearl, you have to dive into the deep ocean.”
          </blockquote>
          <div className="insp-quote-attribution">
            — _INKLING INK, WHEN THE MYSTIC MEETS A STARFISH
          </div>
        </section>
      </div>
    </div>
  );
}
