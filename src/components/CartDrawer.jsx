import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaXmark, FaMinus, FaPlus, FaTrashCan, FaBagShopping } from 'react-icons/fa6';
import { useCart } from '../cart/useCart';

export default function CartDrawer() {
  const { items, count, subtotal, setQty, removeItem, drawerOpen, closeDrawer } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeDrawer();
    window.addEventListener('keydown', onKey);
    document.body.classList.add('drawer-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('drawer-open');
    };
  }, [drawerOpen, closeDrawer]);

  const goToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <>
      <div className={`mm-cart-overlay ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer} aria-hidden="true" />
      <aside className={`mm-cart ${drawerOpen ? 'open' : ''}`} aria-label="Shopping cart" aria-hidden={!drawerOpen}>
        <header className="mm-cart-head">
          <h2>
            Your Cart <span>({count})</span>
          </h2>
          <button type="button" onClick={closeDrawer} aria-label="Close cart">
            <FaXmark size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="mm-cart-empty">
            <FaBagShopping size={34} />
            <p>Your cart is empty.</p>
            <Link to="/books" className="btn-insp-primary" onClick={closeDrawer}>
              Browse Books
            </Link>
          </div>
        ) : (
          <>
            <ul className="mm-cart-list">
              {items.map((item) => (
                <li key={item.key} className="mm-cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="mm-cart-item-info">
                    <Link to={`/books/${item.id}`} onClick={closeDrawer} className="mm-cart-item-title">
                      {item.title}
                    </Link>
                    <span className="mm-cart-item-format">{item.format}</span>
                    <div className="mm-cart-item-row">
                      <div className="mm-qty">
                        <button type="button" onClick={() => setQty(item.key, item.qty - 1)} disabled={item.qty <= 1} aria-label="Decrease quantity">
                          <FaMinus size={10} />
                        </button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => setQty(item.key, item.qty + 1)} aria-label="Increase quantity">
                          <FaPlus size={10} />
                        </button>
                      </div>
                      <strong>₹{item.price * item.qty}</strong>
                    </div>
                  </div>
                  <button type="button" className="mm-cart-remove" onClick={() => removeItem(item.key)} aria-label={`Remove ${item.title}`}>
                    <FaTrashCan size={13} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="mm-cart-foot">
              <div className="mm-cart-subtotal">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <p>Shipping is calculated at checkout.</p>
              <button type="button" className="btn-insp-primary mm-cart-checkout" onClick={goToCheckout}>
                Proceed to Checkout
              </button>
              <button type="button" className="mm-cart-continue" onClick={closeDrawer}>
                Continue Shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
