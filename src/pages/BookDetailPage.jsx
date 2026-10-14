import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaCartShopping, FaArrowLeft, FaTruck, FaShieldHalved } from 'react-icons/fa6';
import { getBookById } from '../admin/adminStore';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('Paperback');
  useEffect(() => {
    const found = getBookById(id);
    if (found) {
      setBook(found);
    }
  }, [id]);

  if (!book) {
    return (
      <div className="insp-page-wrapper" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="insp-container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Book Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The book you are looking for does not exist or has been removed.</p>
          <Link to="/books" className="btn-insp-primary">
            <FaArrowLeft size={12} /> Return to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="insp-page-wrapper" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <div className="insp-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/books" className="insp-text-link" style={{ fontSize: '0.82rem', gap: '6px' }}>
            <FaArrowLeft size={11} /> Back to All Books
          </Link>
        </div>

        {/* 2-Column Book Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '4.5rem', alignItems: 'start' }}>
          {/* Left Column: Cover & Quick Buy */}
          <div>
            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: '3rem 2rem',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 20px 45px -10px rgba(0,0,0,0.12)',
                position: 'relative'
              }}
            >
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  borderRadius: '6px',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>

            {/* Guarantees Box */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FaTruck size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontWeight: 600 }}>Fast Doorstep Delivery</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FaShieldHalved size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontWeight: 600 }}>Author Signed Copy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div>
            <span className="insp-eyebrow">{book.genre}</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 0.5rem 0', textTransform: 'uppercase', lineHeight: 1.15 }}>
              {book.title}
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 1.25rem 0' }}>
              {book.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-ui)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#E06236', fontSize: '0.95rem' }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
                <strong style={{ color: 'var(--text-heading)', marginLeft: '4px' }}>{book.rating}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>({book.reviewsCount} reader reviews)</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                By <strong style={{ color: 'var(--text-heading)' }}>{book.author}</strong>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#166534', background: '#e6f7ec', padding: '0.2rem 0.65rem', borderRadius: '4px', fontWeight: 700 }}>
                {book.inStock ? 'In Stock (Direct Dispatch)' : 'Out of Stock'}
              </div>
            </div>

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                ₹{book.price}
              </span>
              {book.originalPrice && book.originalPrice > book.price && (
                <>
                  <span style={{ fontFamily: 'var(--font-numbers)', textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                    ₹{book.originalPrice}
                  </span>
                  <span style={{ fontFamily: 'var(--font-numbers)', background: 'var(--accent-light)', color: 'var(--primary)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
                    Save {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Format Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.65rem', color: 'var(--text-heading)' }}>
                Select Format:
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['Paperback', 'Hardcover Edition'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: selectedFormat === fmt ? 'var(--primary)' : 'var(--border-ui)',
                      background: selectedFormat === fmt ? '#FFFFFF' : 'var(--bg-main)',
                      color: selectedFormat === fmt ? 'var(--primary)' : 'var(--text-heading)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: selectedFormat === fmt ? '0 4px 12px rgba(224,98,54,0.15)' : 'none'
                    }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <Link
                to={`/checkout/${book.id}?format=${encodeURIComponent(selectedFormat)}`}
                className="btn-insp-primary"
                style={{ padding: '0.85rem 2.25rem', fontSize: '0.925rem' }}
              >
                <FaCartShopping size={14} /> Buy This Book Now
              </Link>
              <a
                href={`https://wa.me/917002974378?text=${encodeURIComponent(`Hello Mystic Mithi, I would like to order a copy of "${book.title}" (${selectedFormat}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-insp-secondary"
                style={{ padding: '0.85rem 1.5rem', fontSize: '0.85rem' }}
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Synopsis */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                Book Synopsis
              </h3>
              <p style={{ fontSize: '0.985rem', lineHeight: '1.8', color: 'var(--text-body)', whiteSpace: 'pre-line' }}>
                {book.description}
              </p>
            </div>

            {/* Book Specifications */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '8px', marginBottom: '2.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-heading)', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>
                Publication Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Publisher</span>
                  <strong style={{ color: 'var(--text-heading)' }}>{book.publisher}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Pages</span>
                  <strong style={{ color: 'var(--text-heading)' }}>{book.pages} Pages</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Language</span>
                  <strong style={{ color: 'var(--text-heading)' }}>{book.language}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>ISBN</span>
                  <strong style={{ color: 'var(--text-heading)' }}>{book.isbn}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
