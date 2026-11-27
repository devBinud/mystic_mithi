import { Link } from 'react-router-dom';
import { FaArrowRight, FaInstagram, FaWhatsapp, FaFacebookF, FaCheck, FaEarthAmericas } from 'react-icons/fa6';
import authorImg from '../assets/updated-author.jpg';
import { getBooks } from '../admin/adminStore';
import BookCard from '../components/BookCard';
import {
  AUTHOR,
  ABOUT_PARAGRAPHS,
  SIGNATURE_QUOTE,
  PHILOSOPHY,
  THEMES,
  WRITING_STYLE,
  CRAFT,
  READER_QUALITIES,
  INFLUENCES,
  COLLABORATIONS,
  AUTHOR_STATEMENT,
  LCCNS
} from '../data/author';
import { libraryFootprint, libraryCount } from '../data/portfolio';

const PROFILE = [
  ['Name', AUTHOR.name],
  ['Poetic name', AUTHOR.poeticName],
  ['Pen name', AUTHOR.penName],
  ['Profession', AUTHOR.profession],
  ['Nationality', AUTHOR.nationality],
  ['Education', AUTHOR.education]
];

const HIGHLIGHT_LIBRARIES = [
  'Harvard University Library',
  'Bodleian Libraries, Oxford',
  'Cambridge University Library',
  'Library of Congress',
  'The British Library',
  'Bibliotheca Alexandrina'
];

const SOCIALS = [
  { href: 'https://www.instagram.com/mystic_mithi25', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/mysticmithi', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://wa.me/917002974378', label: 'WhatsApp', Icon: FaWhatsapp }
];

export default function AboutPage() {
  const books = getBooks();

  return (
    <div className="insp-page-wrapper mm-about-page">
      <div className="insp-container">
        {/* Header */}
        <header className="mm-page-head">
          <span className="insp-eyebrow">{AUTHOR.roles.toUpperCase()}</span>
          <h1 className="insp-section-title">{AUTHOR.name}.</h1>
          <p className="insp-section-subtitle">
            Indian poet known to her readers as {AUTHOR.poeticName}, writing under the pen name {AUTHOR.penName}.
          </p>
        </header>

        {/* Bio */}
        <section className="mm-about-grid">
          <div className="mm-about-portrait">
            <img src={authorImg} alt={AUTHOR.name} />
            <div className="mm-about-portrait-caption">
              <strong>{AUTHOR.name}</strong>
              <span>{AUTHOR.roles}</span>
              <div className="mm-about-socials">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mm-about-bio">
            <span className="insp-eyebrow">ABOUT THE AUTHOR</span>
            <h2>Turning silence into timeless verses.</h2>
            {ABOUT_PARAGRAPHS.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote className="mm-about-signature">&ldquo;{SIGNATURE_QUOTE}&rdquo;</blockquote>
            <div className="mm-about-actions">
              <Link to="/books" className="btn-insp-primary">
                Browse Her Books <FaArrowRight size={13} />
              </Link>
              <Link to="/contact" className="btn-insp-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Profile */}
        <dl className="mm-about-profile">
          {PROFILE.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Literary philosophy */}
      <section className="mm-about-band">
        <div className="insp-container mm-about-split">
          <div>
            <span className="insp-eyebrow">LITERARY PHILOSOPHY</span>
            <h2 className="mm-script">A bridge between the soul and the infinite.</h2>
          </div>
          <div>
            {PHILOSOPHY.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="mm-chip-list" aria-label="Literary themes">
              {THEMES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="insp-container">
        {/* Writing style */}
        <section className="mm-about-section mm-about-split">
          <div>
            <span className="insp-eyebrow">WRITING STYLE</span>
            <h2 className="mm-about-heading">Rhetorical elegance, rhythmic cadence, philosophical depth.</h2>
            <ul className="mm-chip-list is-light" aria-label="Literary devices">
              {CRAFT.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="mm-about-prose">
            {WRITING_STYLE.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* Why readers connect */}
        <section className="mm-about-section">
          <div className="mm-about-center">
            <span className="insp-eyebrow">WHY READERS CONNECT</span>
            <h2 className="mm-about-heading">More than beautifully written verses.</h2>
            <p>
              Her poetry offers an experience of reflection, discovery and transformation. Her collections appeal to
              readers who appreciate poetry that is:
            </p>
          </div>
          <ul className="mm-about-qualities">
            {READER_QUALITIES.map((q) => (
              <li key={q}>
                <FaCheck size={13} /> {q}
              </li>
            ))}
          </ul>
          <p className="mm-about-center mm-about-note">
            Each poem invites readers to slow down, embrace introspection and uncover new meanings with every reading.
          </p>
        </section>

        {/* Influences */}
        <section className="mm-about-influences">
          <div className="mm-divider"><span>Influences</span></div>
          <p>
            {INFLUENCES.map((name, i) => (
              <span key={name}>
                {name}
                {i < INFLUENCES.length - 1 && <i aria-hidden="true">✦</i>}
              </span>
            ))}
          </p>
        </section>

        {/* Global recognition */}
        <section className="mm-about-recognition">
          <FaEarthAmericas size={26} />
          <span className="insp-eyebrow">SELECTED LITERARY RECOGNITION</span>
          <h2 className="mm-about-heading">
            Catalogued in {libraryCount} libraries across {libraryFootprint.length} countries.
          </h2>
          <p>
            Her collections sit in distinguished university, national and research library collections around the world,
            including:
          </p>
          <ul className="mm-chip-list is-light">
            {HIGHLIGHT_LIBRARIES.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="mm-about-lccn">Library of Congress Control Numbers: {LCCNS.join(' · ')}</p>
          <Link to="/global-footprint" className="mm-text-link">
            Explore her Global Literary Footprint <FaArrowRight size={11} />
          </Link>
        </section>

        {/* Books */}
        <section className="mm-about-section">
          <div className="mm-divider"><span>Published Books</span></div>
          <div className="insp-product-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Collaborations */}
        <section className="mm-about-collab">
          <div>
            <span className="insp-eyebrow">COLLABORATIONS</span>
            <h2 className="mm-about-heading">Invite Madhushree to your event.</h2>
            <p>She is available for readings, conversations and creative collaborations.</p>
            <Link to="/contact" className="btn-insp-primary">
              Send an Invitation <FaArrowRight size={12} />
            </Link>
          </div>
          <ul className="mm-chip-list is-light">
            {COLLABORATIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Author statement */}
      <section className="mm-about-statement">
        <div className="insp-container">
          <span className="insp-eyebrow">AUTHOR STATEMENT</span>
          <blockquote>&ldquo;{AUTHOR_STATEMENT}&rdquo;</blockquote>
          <span className="mm-about-statement-name">{AUTHOR.name}</span>
        </div>
      </section>
    </div>
  );
}
