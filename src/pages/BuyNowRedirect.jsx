import { useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getBookById } from '../admin/adminStore';
import { useCart } from '../cart/useCart';
import { BOOK_FORMATS } from '../cart/cartContext';

// Old /checkout/:id links: add that book to the cart, then show the cart checkout.
export default function BuyNowRedirect() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const done = useRef(false);
  const book = getBookById(id);
  const format = BOOK_FORMATS.includes(searchParams.get('format')) ? searchParams.get('format') : 'Paperback';

  useEffect(() => {
    if (!book || done.current) return;
    done.current = true;
    addItem(book, format, 1, { openDrawer: false });
    navigate('/checkout', { replace: true });
  }, [book, format, addItem, navigate]);

  if (!book) return <Navigate to="/books" replace />;
  return null;
}
