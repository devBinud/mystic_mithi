import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheck,
  FaArrowRight,
  FaPaperPlane,
  FaEnvelope,
  FaInstagram
} from 'react-icons/fa6';

import authorImg from '../assets/author.jpg';
import caravanImg from '../assets/books/caravan_of_the_cosmos.jpeg';
import { getBooks } from '../admin/adminStore';
import BookCard from '../components/BookCard';
import { reviews, interviews, publishedPoems, awards, libraryFootprint, libraryCount, footprintMarkers } from '../data/portfolio';
import FootprintGlobe from '../components/FootprintGlobe';
import VideoTestimonial from '../components/VideoTestimonial';

// Lines taken from the author's own notes on her books.
const excerpts = [
  {
    text: 'Words can solve the puzzle of restless hearts, and magically enlighten our hearts with a new light.',
    book: 'When the Mystic Meets a Starfish',
    piece: "author's note"
  },
  {
    text: 'For getting a pearl, you have to dive into the deep ocean.',
    book: 'When the Mystic Meets a Starfish',
    piece: "author's note"
  },
  {
    text: 'Traverse through the infinite darkness and feel the mystical light till eternity.',
    book: 'When the Mystic Meets a Starfish',
    piece: "author's note"
  },
  {
    text: 'A panacea for all the aching hearts who lost their hope in divinity.',
    book: 'When the Mystic Meets a Starfish',
    piece: "author's note"
  },
  {
    text: 'It feels as if you are travelling through the ocean crust and experiencing outer space.',
    book: 'Caravan to the Cosmos',
    piece: 'about the book'
  },
  {
    text: 'A mélange of melodic poems rendering the philosophy of the cosmos and its harmony.',
    book: 'Caravan to the Cosmos',
    piece: 'about the book'
  }
];

function usePerView() {
  const get = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 700) return 2;
    return 1;
  };
  const [perView, setPerView] = useState(get);
  useEffect(() => {
    const onResize = () => setPerView(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return perView;
}

function ReviewSlider({ reviews }) {
  const perView = usePerView();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const pages = Math.max(reviews.length - perView + 1, 1);
  const current = Math.min(index, pages - 1);

  const go = (i) => setIndex((i + pages) % pages);

  useEffect(() => {
    if (paused || pages < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (Math.min(i, pages - 1) + 1) % pages), 5000);
    return () => clearInterval(id);
  }, [paused, pages]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div
      className="insp-rslider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(current - 1);
        if (e.key === 'ArrowRight') go(current + 1);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Reader reviews"
      tabIndex={0}
    >
      <div className="insp-rslider-viewport">
        <div
          className="insp-rslider-track"
          style={{ transform: `translateX(-${(current * 100) / perView}%)` }}
        >
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="insp-rslider-slide"
              style={{ flexBasis: `${100 / perView}%` }}
              aria-hidden={i < current || i >= current + perView}
            >
              <figure className="insp-rslider-card">
                <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption>
                  <span className="insp-rslider-avatar">{r.name.charAt(0)}</span>
                  <span>
                    <strong>{r.name}</strong>
                    <small>{r.city}</small>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {pages > 1 && (
        <div className="insp-rslider-dots">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={i === current ? 'is-active' : ''}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [featuredBooks] = useState(() => getBooks().filter((b) => b.featured).slice(0, 3));
  const [contactForm, setContactForm] = useState({ name: '', email: '', topic: 'Book order', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 5000);
      setContactForm({ name: '', email: '', topic: 'Book order', message: '' });
    }
  };

  return (
    <div className="insp-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="mm-hero">
        <div className="mm-hero-media">
          <img src={authorImg} alt="Author Mystic Mithi" />
        </div>
        <div className="mm-hero-copy">
          <h1 className="mm-hero-title">
            My words are here
            <br />
            to hold the quiet,
            <span className="mm-script mm-hero-script">unspoken parts of you</span>
            so you never feel
            <br />
            alone in them.
          </h1>
          <div className="mm-hero-actions">
            <Link to="/books" className="btn-insp-primary">
              Order Your Copy
            </Link>
            <Link to="/about" className="btn-insp-secondary">
              Meet the Author
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HI, I'M MITHI */}
      <section className="mm-hello">
        <div className="mm-hello-card">
          <h2 className="mm-script mm-hello-title">Hi, I&rsquo;m Mithi.</h2>
          <p>And I write for everyone who has ever felt a little too much.</p>
        </div>
        <div className="mm-hello-body">
          <p>
            I&rsquo;m <strong>Madhushree Das</strong>, an Indian poet writing as <strong>_Inkling Ink</strong>. An engineer by
            degree, I found my true voice in poetry &mdash; in <em>When the Mystic Meets a Starfish</em> and
            <em> Caravan to the Cosmos</em>, now held in libraries across {libraryFootprint.length} countries.
          </p>
          <p className="mm-hello-statement">
            &ldquo;Poetry allows us to witness both the silence within and the vastness beyond. I hope that my words become
            companions to readers &mdash; offering comfort during uncertainty, courage during transformation, and wonder
            throughout life&rsquo;s journey.&rdquo;
          </p>
          <Link to="/about" className="mm-hello-link">
            Read my story <FaArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* 6. FEATURED BOOKS SHOWCASE */}
      <section className="insp-journey-section mm-books">
        <div className="insp-container">
          <div className="mm-divider"><span>Explore the Books</span></div>

          <div className="insp-product-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. MY LATEST BOOK */}
      <section className="insp-walkaway-section">
        <div className="insp-container">
          <h2 className="mm-script mm-section-script">My Latest Book</h2>
          <div className="insp-walkaway-grid">
            <div className="insp-walkaway-visual">
              <div className="insp-book-mockup-wrapper">
                <Link to="/books/caravan-to-the-cosmos">
                  <img
                    src={caravanImg}
                    alt="Caravan to the Cosmos"
                    className="insp-book-mockup-img"
                  />
                </Link>
              </div>
            </div>

            <div className="insp-walkaway-right">
              <h3 className="mm-book-title">
                Caravan to the
                <span className="mm-script">Cosmos</span>
              </h3>
              <p className="insp-section-subtitle">
                A mélange of melodic poems rendering the philosophy of the cosmos and its harmony &mdash; a stroll that
                feels like travelling through the ocean crust and out into space.
              </p>

              <ul className="insp-checklist">
                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>Cosmic philosophy:</strong> Poems on the harmony
                    of the universe, set against the panorama of the galaxies.
                  </div>
                </li>

                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>Many worlds in one book:</strong> Rooted in
                    theology, science, psychology, mythology, history, art and renaissance discovery.
                  </div>
                </li>

                <li className="insp-checklist-item">
                  <FaCheck className="insp-check-icon" size={16} />
                  <div>
                    <strong style={{ color: 'var(--text-heading)' }}>Melodic verse:</strong> Rhapsodies written to be
                    read slowly, and returned to again and again.
                  </div>
                </li>
              </ul>

              <Link to="/books/caravan-to-the-cosmos" className="btn-insp-primary">
                Get the Book
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BAR */}
      <section className="mm-stats">
        <div className="insp-container">
          <div className="mm-divider mm-divider-light"><span>The poet in numbers</span></div>
          <div className="mm-stats-grid">
            <div>
              <strong>2</strong>
              <span>Published poetry collections</span>
            </div>
            <div>
              <strong>{libraryCount}</strong>
              <span>Libraries holding her books</span>
            </div>
            <div>
              <strong>{libraryFootprint.length}</strong>
              <span>Countries, five continents</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FROM HER PAGES (EXCERPTS) */}
      <section className="insp-excerpts-section" style={{ backgroundImage: `url(${caravanImg})` }}>
        <div className="insp-container">
          <div className="insp-excerpts-panel">
            <div className="insp-excerpts-col">
              <h2 className="insp-excerpts-title">From Her Pages</h2>
              <span className="insp-excerpts-rule" />
              {excerpts.slice(0, 3).map((ex) => (
                <figure key={ex.text} className="insp-excerpt">
                  <blockquote>‘{ex.text}’</blockquote>
                  <figcaption>
                    <em>{ex.book}</em>{ex.piece && `, ${ex.piece}`}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="insp-excerpts-col">
              {excerpts.slice(3).map((ex) => (
                <figure key={ex.text} className="insp-excerpt">
                  <blockquote>‘{ex.text}’</blockquote>
                  <figcaption>
                    <em>{ex.book}</em>{ex.piece && `, ${ex.piece}`}
                  </figcaption>
                </figure>
              ))}
              <Link to="/books" className="insp-text-link">
                Read the full collections <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IN THE PRESS & IN PRINT */}
      <section className="mm-press">
        <div className="insp-container">
          <div className="mm-divider"><span>In the press &amp; in print</span></div>
          <div className="mm-press-grid">
            <Link to="/interviews" className="mm-press-feature">
              <span className="mm-press-kind">{interviews[0].kind} &middot; {interviews[0].outlet}</span>
              <blockquote>&ldquo;{interviews[0].quotes[0]}&rdquo;</blockquote>
              <span className="mm-text-link">
                Read the interview <FaArrowRight size={11} />
              </span>
            </Link>

            <div className="mm-press-side">
              <Link to="/poems" className="mm-press-item">
                <span className="mm-press-kind">Published poem &middot; {publishedPoems[0].publication}</span>
                <strong className="mm-script">{publishedPoems[0].title}</strong>
              </Link>
              <Link to="/publications" className="mm-press-item">
                <span className="mm-press-kind">Bibliography</span>
                <strong>Literary Publications</strong>
              </Link>
              <Link to="/awards" className="mm-press-item">
                <span className="mm-press-kind">Award &middot; {awards[0].presenter}, {awards[0].year}</span>
                <strong>{awards[0].title}</strong>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL LITERARY FOOTPRINT */}
      <section className="mm-footprint-band">
        <div className="insp-container mm-footprint-band-grid">
          <div className="mm-footprint-band-copy">
            <span className="insp-eyebrow">GLOBAL LITERARY FOOTPRINT</span>
            <h2 className="mm-script">Words travel farther than oceans.</h2>
            <p>
              Her poetry now rests on the shelves of {libraryCount} libraries in {libraryFootprint.length} countries
              &mdash; from Harvard and Oxford&rsquo;s Bodleian to the Bibliotheca Alexandrina, Singapore and Taiwan.
            </p>
            <Link to="/global-footprint" className="btn-insp-primary">
              Explore the Global Journey <FaArrowRight size={12} />
            </Link>
          </div>
          <FootprintGlobe markers={footprintMarkers} interactive={false} />
        </div>
      </section>

      {/* 5. READER REVIEWS */}
      <section className="insp-reviews-section">
        <div className="insp-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="insp-eyebrow">READER EXPERIENCES</span>
            <h2 className="insp-section-title">THESE BOOKS TOUCHED SOULS.</h2>
            <p className="insp-section-subtitle" style={{ margin: '0 auto' }}>
              Hear from readers who found solace, beauty, and quiet healing in Madhushree Das’s published pages.
            </p>
          </div>

          <VideoTestimonial />

          <ReviewSlider reviews={reviews} />

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/reviews" className="mm-text-link">
              Read all reviews <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. AUTHOR INQUIRY / CONTACT */}
      <section className="insp-letter-section">
        <div className="insp-container">
          <div className="insp-letter-grid">
            <div className="insp-letter-intro">
              <span className="insp-eyebrow">GET IN TOUCH</span>
              <h2 className="insp-letter-heading">Contact Mystic Mithi</h2>
              <p className="insp-letter-lead">
                For book orders, events, interviews, or a note about her work. Every message is read and answered
                personally.
              </p>

              <div className="insp-letter-contacts">
                <a href="mailto:mystic.mithi25@gmail.com">
                  <span className="insp-letter-icon"><FaEnvelope size={15} /></span>
                  <span>
                    <small>Email</small>
                    mystic.mithi25@gmail.com
                  </span>
                </a>
                <a href="https://www.instagram.com/mystic_mithi25" target="_blank" rel="noopener noreferrer">
                  <span className="insp-letter-icon"><FaInstagram size={16} /></span>
                  <span>
                    <small>Instagram</small>
                    @mystic_mithi25
                  </span>
                </a>
              </div>
            </div>

            <div className="insp-letter-form-wrap">
              {contactSubmitted ? (
                <div className="insp-letter-sent">
                  <span><FaCheck size={16} /></span>
                  <h3>Message sent.</h3>
                  <p>Thank you for reaching out. You&rsquo;ll receive a reply by email soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="insp-letter-form">
                  <h3 className="insp-letter-form-title">Send a message</h3>
                  <label className="insp-letter-field">
                    <span>What&rsquo;s this about?</span>
                    <select
                      value={contactForm.topic}
                      onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                    >
                      <option>Book order</option>
                      <option>Event or interview</option>
                      <option>Reader message</option>
                      <option>Something else</option>
                    </select>
                  </label>

                  <div className="insp-letter-row">
                    <label className="insp-letter-field">
                      <span>Name</span>
                      <input
                        type="text"
                        placeholder="Your full name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </label>
                    <label className="insp-letter-field">
                      <span>Email</span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </label>
                  </div>
                  <label className="insp-letter-field">
                    <span>Message</span>
                    <textarea
                      rows={4}
                      placeholder="Tell us a little about what you need..."
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </label>
                  <button type="submit" className="insp-letter-submit">
                    Send Message <FaPaperPlane size={12} />
                  </button>
                  <p className="insp-letter-note">Your details are never shared.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
