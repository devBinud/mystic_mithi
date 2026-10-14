import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTruck, FaShieldHalved } from 'react-icons/fa6';
import { getBookById, createOrder } from '../admin/adminStore';

const FORMATS = ['Paperback', 'Hardcover Edition'];

const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--text-heading)' };

export default function CheckoutPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialFormat = FORMATS.includes(searchParams.get('format')) ? searchParams.get('format') : 'Paperback';

  const book = useMemo(() => getBookById(id), [id]);
  const [selectedFormat, setSelectedFormat] = useState(initialFormat);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Assam',
    pincode: '',
    quantity: 1,
    paymentMethod: 'Cash on Delivery (COD)'
  });

  if (!book) {
    return (
      <div className="insp-page-wrapper" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="insp-container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Book Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The book you are trying to order does not exist or has been removed.</p>
          <Link to="/books" className="btn-insp-primary">
            <FaArrowLeft size={12} /> Return to Books
          </Link>
        </div>
      </div>
    );
  }

  const quantity = Number(orderForm.quantity) || 1;
  const total = Number(book.price) * quantity;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.customerName || !orderForm.phone || !orderForm.address) return;

    const newOrder = createOrder({
      ...orderForm,
      bookId: book.id,
      bookTitle: `${book.title} (${selectedFormat})`,
      bookPrice: book.price,
      totalAmount: total
    });

    setOrderSuccess(newOrder);
    window.scrollTo(0, 0);
  };

  if (orderSuccess) {
    return (
      <div className="insp-page-wrapper" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
        <div className="insp-container" style={{ maxWidth: '620px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e6f7ec', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <FaCheck size={24} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
              Order Confirmed!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Thank you, <strong>{orderSuccess.customerName}</strong>! Your order for <strong>{orderSuccess.bookTitle}</strong> has been received by Mystic Mithi’s desk.
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: '8px', textAlign: 'left', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong>{orderSuccess.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <strong style={{ color: 'var(--primary)' }}>₹{orderSuccess.totalAmount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
                <span>{orderSuccess.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping To:</span>
                <span>{orderSuccess.city}, {orderSuccess.pincode}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/917002974378?text=${encodeURIComponent(`Hello Mystic Mithi, I placed Order #${orderSuccess.id} for "${orderSuccess.bookTitle}" (Total: ₹${orderSuccess.totalAmount}). Please confirm shipment!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-insp-primary"
                style={{ justifyContent: 'center', background: '#25D366' }}
              >
                Confirm via WhatsApp
              </a>
              <Link to="/books" className="btn-insp-secondary" style={{ justifyContent: 'center' }}>
                Continue Browsing Books
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="insp-page-wrapper" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <div className="insp-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to={`/books/${book.id}`} className="insp-text-link" style={{ fontSize: '0.82rem', gap: '6px' }}>
            <FaArrowLeft size={11} /> Back to Book Details
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="insp-eyebrow">DIRECT AUTHOR PURCHASE</span>
          <h1 className="insp-section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', margin: '0 0 0.5rem 0' }}>
            CHECKOUT.
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
            Author signed copy delivered directly to your doorstep across India.
          </p>
        </div>

        <div className="checkout-grid">
          {/* Left: Delivery Form */}
          <form
            onSubmit={handleOrderSubmit}
            style={{ background: '#FFFFFF', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-heading)', margin: '0 0 0.25rem 0', textTransform: 'uppercase' }}>
              Delivery Details
            </h2>

            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={orderForm.customerName}
                onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                className="insp-input"
              />
            </div>

            <div className="checkout-row">
              <div>
                <label style={labelStyle}>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="insp-input"
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="For tracking receipt"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                  className="insp-input"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Delivery Street Address *</label>
              <textarea
                required
                placeholder="House/Flat No, Landmark, Area"
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                className="insp-textarea"
                style={{ minHeight: '80px' }}
              ></textarea>
            </div>

            <div className="checkout-row">
              <div>
                <label style={labelStyle}>City *</label>
                <input
                  type="text"
                  required
                  placeholder="City / Town"
                  value={orderForm.city}
                  onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                  className="insp-input"
                />
              </div>
              <div>
                <label style={labelStyle}>Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="6-digit PIN"
                  value={orderForm.pincode}
                  onChange={(e) => setOrderForm({ ...orderForm, pincode: e.target.value })}
                  className="insp-input"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Payment Method</label>
              <select
                value={orderForm.paymentMethod}
                onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                className="insp-input"
              >
                <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                <option value="UPI / QR Code / WhatsApp Pay">UPI / QR Code / WhatsApp Pay</option>
                <option value="Direct Bank Transfer">Direct Bank Transfer</option>
              </select>
            </div>

            <button type="submit" className="btn-insp-primary" style={{ justifyContent: 'center', width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}>
              Confirm & Place Book Order
            </button>
          </form>

          {/* Right: Order Summary */}
          <aside className="checkout-summary" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-heading)', margin: '0 0 1.25rem 0', textTransform: 'uppercase' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <img src={book.image} alt={book.title} style={{ width: '64px', height: '88px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 6px 15px rgba(0,0,0,0.15)' }} />
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>{book.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>₹{book.price} per copy</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Format</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    style={{
                      padding: '0.5rem 0.9rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: selectedFormat === fmt ? 'var(--primary)' : 'var(--border-ui)',
                      background: selectedFormat === fmt ? '#FFFFFF' : 'var(--bg-main)',
                      color: selectedFormat === fmt ? 'var(--primary)' : 'var(--text-heading)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Quantity</label>
              <input
                type="number"
                min="1"
                max="20"
                value={orderForm.quantity}
                onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                className="insp-input"
                style={{ maxWidth: '110px' }}
              />
            </div>

            <div style={{ fontSize: '0.9rem', borderTop: '1px solid var(--border-ui)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal ({quantity} × ₹{book.price})</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-ui)', paddingTop: '0.85rem' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-heading)', fontWeight: 700 }}>Total to Pay</span>
                <strong style={{ fontSize: '1.6rem', color: 'var(--primary)', fontFamily: 'var(--font-numbers)', fontWeight: 800 }}>
                  ₹{total}
                </strong>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.65rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--text-body)', fontWeight: 600 }}>
                <FaTruck size={16} color="var(--primary)" /> Fast Doorstep Delivery
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--text-body)', fontWeight: 600 }}>
                <FaShieldHalved size={16} color="var(--primary)" /> Author Signed Copy
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
