import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaMinus, FaPlus, FaTrashCan, FaLock } from 'react-icons/fa6';
import { createOrder } from '../admin/adminStore';
import { useCart } from '../cart/useCart';
import { SHIPPING_FEE } from '../cart/cartContext';
import { startOnlinePayment, ONLINE_PAYMENTS_ENABLED } from '../cart/payment';

const PAYMENT_OPTIONS = [
  {
    value: 'Online Payment',
    label: 'Pay Online',
    hint: ONLINE_PAYMENTS_ENABLED ? 'UPI, cards & netbanking' : 'UPI, cards & netbanking — coming soon',
    disabled: !ONLINE_PAYMENTS_ENABLED
  },
  { value: 'Cash on Delivery (COD)', label: 'Cash on Delivery', hint: 'Pay when your books arrive' }
];

const EMPTY_FORM = {
  customerName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: ONLINE_PAYMENTS_ENABLED ? 'Online Payment' : 'Cash on Delivery (COD)'
};

export default function CheckoutPage() {
  const { items, subtotal, setQty, removeItem, clearCart } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const shipping = items.length ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length || placing) return;
    setPlacing(true);
    setError('');

    const order = createOrder({
      ...form,
      items: items.map(({ id, title, format, price, qty }) => ({ id, title, format, price, qty })),
      bookId: items.map((i) => i.id).join(','),
      bookTitle: items.map((i) => `${i.title} (${i.format}) ×${i.qty}`).join(', '),
      bookPrice: subtotal,
      quantity: items.reduce((n, i) => n + i.qty, 0),
      shipping,
      totalAmount: total
    });

    try {
      if (form.paymentMethod === 'Online Payment') {
        await startOnlinePayment(order);
      }
      clearCart();
      setPlacedOrder(order);
      window.scrollTo(0, 0);
    } catch {
      setError('Payment could not be completed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="insp-page-wrapper mm-checkout">
        <div className="insp-container" style={{ maxWidth: '620px' }}>
          <div className="mm-checkout-card mm-checkout-done">
            <span className="mm-checkout-done-icon"><FaCheck size={22} /></span>
            <h1 className="mm-script">Thank you!</h1>
            <p>
              Your order <strong>{placedOrder.id}</strong> has been placed, {placedOrder.customerName}.
              {placedOrder.email && <> A confirmation will be sent to <strong>{placedOrder.email}</strong>.</>}
            </p>
            <dl className="mm-checkout-done-meta">
              <div><dt>Items</dt><dd>{placedOrder.bookTitle}</dd></div>
              <div><dt>Total</dt><dd>₹{placedOrder.totalAmount}</dd></div>
              <div><dt>Payment</dt><dd>{placedOrder.paymentMethod}</dd></div>
              <div><dt>Shipping to</dt><dd>{placedOrder.city}, {placedOrder.pincode}</dd></div>
            </dl>
            <Link to="/books" className="btn-insp-primary">Continue Browsing</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="insp-page-wrapper mm-checkout">
        <div className="insp-container" style={{ maxWidth: '620px' }}>
          <div className="mm-checkout-card mm-checkout-done">
            <h1 className="mm-script">Your cart is empty</h1>
            <p>Add a book to your cart to check out.</p>
            <Link to="/books" className="btn-insp-primary">Browse Books</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="insp-page-wrapper mm-checkout">
      <div className="insp-container">
        <Link to="/books" className="mm-checkout-back">
          <FaArrowLeft size={11} /> Continue shopping
        </Link>
        <h1 className="insp-section-title mm-checkout-title">Checkout</h1>

        <div className="checkout-grid">
          <form onSubmit={handleSubmit} className="mm-checkout-card mm-checkout-form">
            <h2>Delivery details</h2>

            <label className="mm-field">
              <span>Full name *</span>
              <input type="text" required value={form.customerName} onChange={update('customerName')} placeholder="Your full name" />
            </label>

            <div className="checkout-row">
              <label className="mm-field">
                <span>Phone *</span>
                <input type="tel" required pattern="[0-9+\s-]{10,15}" value={form.phone} onChange={update('phone')} placeholder="10-digit mobile" />
              </label>
              <label className="mm-field">
                <span>Email *</span>
                <input type="email" required value={form.email} onChange={update('email')} placeholder="For your order receipt" />
              </label>
            </div>

            <label className="mm-field">
              <span>Address *</span>
              <textarea required rows={3} value={form.address} onChange={update('address')} placeholder="House / flat no., street, landmark" />
            </label>

            <div className="checkout-row">
              <label className="mm-field">
                <span>City *</span>
                <input type="text" required value={form.city} onChange={update('city')} placeholder="City / town" />
              </label>
              <label className="mm-field">
                <span>PIN code *</span>
                <input type="text" required inputMode="numeric" pattern="[0-9]{6}" value={form.pincode} onChange={update('pincode')} placeholder="6-digit PIN" />
              </label>
            </div>

            <label className="mm-field">
              <span>State *</span>
              <input type="text" required value={form.state} onChange={update('state')} placeholder="e.g. Maharashtra" />
            </label>

            <h2 className="mm-checkout-subhead">Payment</h2>
            <div className="mm-pay-options">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`mm-pay-option ${form.paymentMethod === opt.value ? 'is-active' : ''} ${opt.disabled ? 'is-disabled' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={form.paymentMethod === opt.value}
                    disabled={opt.disabled}
                    onChange={update('paymentMethod')}
                  />
                  <span>
                    <strong>{opt.label}</strong>
                    <small>{opt.hint}</small>
                  </span>
                </label>
              ))}
            </div>

            {error && <p className="mm-checkout-error">{error}</p>}

            <button type="submit" className="btn-insp-primary mm-checkout-submit" disabled={placing}>
              <FaLock size={12} /> {placing ? 'Placing order…' : `Place Order · ₹${total}`}
            </button>
          </form>

          <aside className="checkout-summary mm-checkout-card">
            <h2>Order summary</h2>
            <ul className="mm-summary-list">
              {items.map((item) => (
                <li key={item.key}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.format} · ₹{item.price}</small>
                    <div className="mm-qty mm-qty-sm">
                      <button type="button" onClick={() => setQty(item.key, item.qty - 1)} disabled={item.qty <= 1} aria-label="Decrease quantity">
                        <FaMinus size={9} />
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => setQty(item.key, item.qty + 1)} aria-label="Increase quantity">
                        <FaPlus size={9} />
                      </button>
                    </div>
                  </div>
                  <div className="mm-summary-right">
                    <strong>₹{item.price * item.qty}</strong>
                    <button type="button" onClick={() => removeItem(item.key)} aria-label={`Remove ${item.title}`}>
                      <FaTrashCan size={12} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mm-summary-totals">
              <div><span>Subtotal</span><span>₹{subtotal}</span></div>
              {SHIPPING_FEE > 0 && <div><span>Shipping</span><span>₹{shipping}</span></div>}
              <div className="mm-summary-total"><span>Total</span><strong>₹{total}</strong></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
