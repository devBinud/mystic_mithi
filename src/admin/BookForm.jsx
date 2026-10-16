// src/admin/BookForm.jsx
import { useState } from 'react';

// Form values for an existing book, or starting values for a new one
function initialFormValues(book) {
  if (!book) {
    return {
      title: '',
      subtitle: '',
      genre: 'Poetry & Musings',
      price: 399,
      originalPrice: 499,
      image: '',
      description: '',
      pages: 200,
      publisher: '',
      isbn: '978-93-5421-' + Math.floor(100 + Math.random() * 900),
      format: 'Paperback',
      inStock: true,
      featured: false
    };
  }
  return {
    title: book.title,
    subtitle: book.subtitle || '',
    genre: book.genre || 'General Literature',
    price: book.price,
    originalPrice: book.originalPrice || book.price,
    image: book.image || '',
    description: book.description || '',
    pages: book.pages || 200,
    publisher: book.publisher || '',
    isbn: book.isbn || '',
    format: book.format || 'Paperback',
    inStock: book.inStock !== false,
    featured: !!book.featured
  };
}

// Shared by the "Add New Book" page (no book) and the "Edit Book" page
export default function BookForm({ book, onSave, onCancel }) {
  const [bookForm, setBookForm] = useState(() => initialFormValues(book));

  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.price) return;
    onSave(bookForm);
  };

  return (
    <form onSubmit={handleSaveBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Book Title *</label>
        <input
          type="text"
          required
          placeholder="e.g. When the Mystic Meets a Starfish"
          value={bookForm.title}
          onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
          className="insp-input"
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Subtitle / Tagline</label>
        <input
          type="text"
          placeholder="e.g. A Journey Through Light and Shadows"
          value={bookForm.subtitle}
          onChange={(e) => setBookForm({ ...bookForm, subtitle: e.target.value })}
          className="insp-input"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Genre / Category</label>
          <input
            type="text"
            value={bookForm.genre}
            onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
            className="insp-input"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Format</label>
          <input
            type="text"
            placeholder="e.g. Paperback, Hardcover"
            value={bookForm.format}
            onChange={(e) => setBookForm({ ...bookForm, format: e.target.value })}
            className="insp-input"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Selling Price (₹) *</label>
          <input
            type="number"
            required
            min="1"
            value={bookForm.price}
            onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
            className="insp-input"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Original MRP (₹)</label>
          <input
            type="number"
            min="1"
            value={bookForm.originalPrice}
            onChange={(e) => setBookForm({ ...bookForm, originalPrice: e.target.value })}
            className="insp-input"
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Book Cover Image URL / Path</label>
        <input
          type="text"
          placeholder="URL or image path"
          value={bookForm.image}
          onChange={(e) => setBookForm({ ...bookForm, image: e.target.value })}
          className="insp-input"
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Book Description / Synopsis</label>
        <textarea
          rows="4"
          placeholder="Describe the themes, emotional journey, and chapters..."
          value={bookForm.description}
          onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
          className="insp-textarea"
        ></textarea>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Page Count</label>
          <input
            type="number"
            value={bookForm.pages}
            onChange={(e) => setBookForm({ ...bookForm, pages: e.target.value })}
            className="insp-input"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>ISBN Number</label>
          <input
            type="text"
            value={bookForm.isbn}
            onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
            className="insp-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', padding: '0.5rem 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
          <input
            type="checkbox"
            checked={bookForm.inStock}
            onChange={(e) => setBookForm({ ...bookForm, inStock: e.target.checked })}
          />
          <span>Mark as In Stock</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem' }}>
          <input
            type="checkbox"
            checked={bookForm.featured}
            onChange={(e) => setBookForm({ ...bookForm, featured: e.target.checked })}
          />
          <span>Feature on Homepage</span>
        </label>
      </div>

      <div className="admin-form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn-insp-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn-insp-primary">
          {book ? 'Save Changes' : 'Publish Book to Catalog'}
        </button>
      </div>
    </form>
  );
}
