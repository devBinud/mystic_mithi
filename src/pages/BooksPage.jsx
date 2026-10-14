import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCartShopping } from 'react-icons/fa6';
import { getBooks } from '../admin/adminStore';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const genres = ['All', ...new Set(books.map((b) => b.genre))];

  const filteredBooks = selectedGenre === 'All'
    ? books
    : books.filter((b) => b.genre === selectedGenre);

  return (
    <div className="insp-page-wrapper" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <div className="insp-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="insp-eyebrow">PUBLISHED WORKS & MASTERPIECES</span>
          <h1 className="insp-section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
            EXPLORE THE BOOKS.
          </h1>
          <p className="insp-section-subtitle" style={{ margin: '0 auto', maxWidth: '650px' }}>
            Immerse yourself in soul-stirring poetry, philosophical narratives, and reflective prose written by Mystic Mithi. Order your paperback or hardcover copy directly.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '3rem' }}>
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '30px',
                border: '1px solid',
                borderColor: selectedGenre === genre ? 'var(--primary)' : 'var(--border-ui)',
                background: selectedGenre === genre ? 'var(--primary)' : '#FFFFFF',
                color: selectedGenre === genre ? '#FFFFFF' : 'var(--text-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
              }}
              className="book-catalog-card"
            >
              {/* Book Cover Image */}
              <div style={{ background: 'var(--bg-secondary)', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative' }}>
                <Link to={`/books/${book.id}`}>
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      maxHeight: '340px',
                      maxWidth: '85%',
                      width: 'auto',
                      borderRadius: '6px',
                      boxShadow: '0 15px 35px -5px rgba(0,0,0,0.25)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </Link>
                {book.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'var(--primary)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px'
                    }}
                  >
                    Bestseller
                  </span>
                )}
              </div>

              {/* Book Info */}
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                    {book.genre}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#E06236', fontSize: '0.85rem' }}>
                    <FaStar size={12} />
                    <strong style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-numbers)' }}>{book.rating}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-numbers)' }}>({book.reviewsCount})</span>
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 0.35rem 0', textTransform: 'uppercase' }}>
                  <Link to={`/books/${book.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {book.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 0.75rem 0' }}>
                  {book.subtitle}
                </p>

                <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-body)', margin: '0 0 1.5rem 0', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {book.description}
                </p>

                {/* Price and Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border-ui)' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
                      ₹{book.price}
                    </span>
                    {book.originalPrice && book.originalPrice > book.price && (
                      <span style={{ fontFamily: 'var(--font-numbers)', textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                        ₹{book.originalPrice}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                      to={`/books/${book.id}`}
                      className="btn-insp-secondary"
                      style={{ fontSize: '0.78rem', padding: '0.45rem 0.65rem' }}
                    >
                      Details
                    </Link>
                    <Link
                      to={`/checkout/${book.id}`}
                      className="btn-insp-primary"
                      style={{ fontSize: '0.78rem', padding: '0.55rem 1rem' }}
                    >
                      <FaCartShopping size={12} /> Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
