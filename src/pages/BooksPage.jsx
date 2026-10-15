import { useState } from 'react';
import { getBooks } from '../admin/adminStore';
import BookCard from '../components/BookCard';

export default function BooksPage() {
  const [books] = useState(getBooks);
  const [selectedGenre, setSelectedGenre] = useState('All');

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
        <div className="insp-product-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

    </div>
  );
}
