import { Link } from 'react-router-dom';
import { useCart } from '../cart/useCart';

// Shared book card used on the home page and the /books page.
export default function BookCard({ book }) {
  const { addItem } = useCart();

  return (
    <article className="insp-product-card">
      <Link to={`/books/${book.id}`} className="insp-product-media">
        <img src={book.image} alt={book.title} />
      </Link>

      <div className="insp-product-body">
        <h3 className="insp-product-title">
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h3>
        <p className="insp-product-subtitle">{book.subtitle}</p>

        <div className="insp-product-actions">
          <Link to={`/books/${book.id}`} className="insp-product-btn-ghost">
            About the Book
          </Link>
          <button type="button" className="insp-product-btn" onClick={() => addItem(book)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
