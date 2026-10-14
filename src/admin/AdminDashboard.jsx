import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaBookOpen, FaCartShopping, FaPlus, FaTrash, FaPenToSquare,
  FaFileCsv, FaMagnifyingGlass, FaWhatsapp, FaCheck, FaXmark,
  FaArrowUpRightFromSquare, FaTruckFast, FaClock, FaBoxArchive
} from 'react-icons/fa6';
import AdminLayout from './AdminLayout';
import {
  isAuthenticated,
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  resetBooks,
  getOrders,
  updateOrderStatus,
  deleteOrder
} from './adminStore';
import './admin.css';
// Updated for Mystic Mithi Author & Books Management
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  // Search & Filters
  const [bookSearch, setBookSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Book Modal (Add / Edit)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [bookForm, setBookForm] = useState({
    title: '',
    subtitle: '',
    genre: 'Poetry & Musings',
    price: 399,
    originalPrice: 499,
    image: '',
    description: '',
    pages: 200,
    publisher: 'Mithi-Inkling Ink Publishing',
    isbn: '',
    format: 'Paperback',
    inStock: true,
    featured: false
  });

  // Settings State
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [authorSettings, setAuthorSettings] = useState({
    authorName: 'Mystic Mithi',
    imprintName: 'Mithi-Inkling Ink Publishing',
    phone: '+91 70029 74378',
    whatsapp: '+91 70029 74378',
    email: 'contact@mysticmithi.com',
    dispatchCity: 'Dibrugarh, Assam, India — 786001',
    instagramUrl: 'https://www.instagram.com/mystic_mithi',
    facebookUrl: 'https://www.facebook.com/mysticmithi'
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setBooks(getBooks());
    setOrders(getOrders());
  }, [navigate]);

  // Refresh lists
  const refreshData = () => {
    setBooks(getBooks());
    setOrders(getOrders());
  };

  // ================= BOOKS ACTIONS =================
  const handleOpenAddBook = () => {
    setEditingBookId(null);
    setBookForm({
      title: '',
      subtitle: '',
      genre: 'Poetry & Musings',
      price: 399,
      originalPrice: 499,
      image: '',
      description: '',
      pages: 200,
      publisher: 'Mithi-Inkling Ink Publishing',
      isbn: '978-93-5421-' + Math.floor(100 + Math.random() * 900),
      format: 'Paperback',
      inStock: true,
      featured: false
    });
    setIsBookModalOpen(true);
  };

  const handleOpenEditBook = (book) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title,
      subtitle: book.subtitle || '',
      genre: book.genre || 'General Literature',
      price: book.price,
      originalPrice: book.originalPrice || book.price,
      image: book.image || '',
      description: book.description || '',
      pages: book.pages || 200,
      publisher: book.publisher || 'Mithi-Inkling Ink Publishing',
      isbn: book.isbn || '',
      format: book.format || 'Paperback',
      inStock: book.inStock !== false,
      featured: !!book.featured
    });
    setIsBookModalOpen(true);
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.price) return;

    if (editingBookId) {
      updateBook(editingBookId, bookForm);
    } else {
      addBook(bookForm);
    }

    refreshData();
    setIsBookModalOpen(false);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book from the catalog?')) {
      deleteBook(id);
      refreshData();
    }
  };

  const handleQuickPriceChange = (book) => {
    const newPrice = window.prompt(`Enter new selling price for "${book.title}":`, book.price);
    if (newPrice !== null && !isNaN(newPrice) && Number(newPrice) > 0) {
      updateBook(book.id, { price: Number(newPrice) });
      refreshData();
    }
  };

  // ================= ORDERS ACTIONS =================
  const handleOrderStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    refreshData();
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Delete this customer order record?')) {
      deleteOrder(orderId);
      refreshData();
    }
  };

  const handleExportCSV = () => {
    if (!orders.length) {
      alert('No orders available to export.');
      return;
    }
    const headers = ['Order ID', 'Customer Name', 'Phone', 'Email', 'Book Title', 'Qty', 'Total (INR)', 'Payment Mode', 'Status', 'Address', 'City', 'Pincode', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      `"${(o.customerName || '').replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.email}"`,
      `"${(o.bookTitle || '').replace(/"/g, '""')}"`,
      o.quantity,
      o.totalAmount,
      `"${o.paymentMethod}"`,
      o.status,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${o.city}"`,
      `"${o.pincode}"`,
      `"${o.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mystic_mithi_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters
  const filteredBooks = useMemo(() => {
    if (!bookSearch) return books;
    const q = bookSearch.toLowerCase();
    return books.filter((b) => b.title.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q));
  }, [books, bookSearch]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !orderSearch ||
        (o.customerName || '').toLowerCase().includes(orderSearch.toLowerCase()) ||
        (o.id || '').toLowerCase().includes(orderSearch.toLowerCase()) ||
        (o.phone || '').includes(orderSearch);

      const matchesStatus =
        orderStatusFilter === 'All' || o.status === orderStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  }, [orders]);

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.5rem 0' }}>
        {/* ================= TAB 1: BOOKS ================= */}
        {activeTab === 'books' && (
          <div>
            {/* Top Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--text-heading)', margin: '0 0 0.35rem 0' }}>
                  Books Catalog & Pricing
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  Manage published book titles, update cover images, set prices, and control inventory.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleOpenAddBook}
                  className="btn-insp-primary"
                  style={{ fontSize: '0.82rem', padding: '0.65rem 1.25rem' }}
                >
                  <FaPlus size={12} /> Add New Book
                </button>
              </div>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Books in Catalog</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>
                  {books.length}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Active in Stock</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: '#166534', marginTop: '4px' }}>
                  {books.filter(b => b.inStock !== false).length}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Orders Placed</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
                  {orders.length}
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '360px' }}>
              <input
                type="text"
                placeholder="Search books by title or genre..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="insp-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* Books Table */}
            <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid var(--border-ui)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-ui)' }}>
                      <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Book</th>
                      <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Genre</th>
                      <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Price</th>
                      <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
                      <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book.id} style={{ borderBottom: '1px solid var(--border-ui)' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img
                            src={book.image}
                            alt={book.title}
                            style={{ width: '45px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-ui)' }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-heading)' }}>{book.title}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{book.subtitle}</div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-body)' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                            {book.genre}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-numbers)' }}>
                            ₹{book.price}
                          </div>
                          {book.originalPrice > book.price && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', fontFamily: 'var(--font-numbers)' }}>
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            background: book.inStock ? '#e6f7ec' : '#fee2e2',
                            color: book.inStock ? '#166534' : '#991b1b'
                          }}>
                            {book.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => handleQuickPriceChange(book)}
                              title="Quick Change Price"
                              style={{ padding: '0.4rem 0.65rem', border: '1px solid var(--border-ui)', borderRadius: '4px', background: '#FFFFFF', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                            >
                              ₹ Change Price
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditBook(book)}
                              title="Edit Book Details"
                              style={{ padding: '0.4rem 0.65rem', border: '1px solid var(--border-ui)', borderRadius: '4px', background: '#FFFFFF', cursor: 'pointer', color: 'var(--text-heading)' }}
                            >
                              <FaPenToSquare size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBook(book.id)}
                              title="Delete Book"
                              style={{ padding: '0.4rem 0.65rem', border: '1px solid #fecaca', borderRadius: '4px', background: '#fef2f2', cursor: 'pointer', color: '#dc2626' }}
                            >
                              <FaTrash size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div>
            {/* Orders Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--text-heading)', margin: '0 0 0.35rem 0' }}>
                  Orders & Book Sales
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  Review reader orders, update dispatch status, contact customers on WhatsApp, and export sales.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="btn-insp-secondary"
                  style={{ fontSize: '0.82rem', padding: '0.65rem 1.25rem' }}
                >
                  <FaFileCsv size={13} /> Export CSV
                </button>
              </div>
            </div>

            {/* Orders Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Orders</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
                  {orders.length}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Pending Dispatch</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
                  {orders.filter(o => o.status === 'Pending').length}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Shipped / Delivered</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: '#166534', marginTop: '4px' }}>
                  {orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered').length}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Revenue</span>
                <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>
                  ₹{totalRevenue}
                </div>
              </div>
            </div>

            {/* Filter / Search Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search by order ID, reader name, or phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="insp-input"
                style={{ maxWidth: '380px' }}
              />

              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderStatusFilter(st)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: orderStatusFilter === st ? 'var(--primary)' : 'var(--border-ui)',
                      background: orderStatusFilter === st ? 'var(--primary)' : '#FFFFFF',
                      color: orderStatusFilter === st ? '#FFFFFF' : 'var(--text-heading)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '3.5rem', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
                <FaBoxArchive size={38} color="var(--border-ui)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>
                  No Orders Found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                  Customer book orders placed on the public website will show up here in real time.
                </p>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid var(--border-ui)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-ui)' }}>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Order ID / Date</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Customer</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Book Ordered</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Amount</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Shipping To</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border-ui)' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: 'var(--text-heading)' }}>{order.id}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.createdAt}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{order.customerName}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{order.phone}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{order.bookTitle}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {order.quantity} • {order.paymentMethod}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <strong style={{ fontFamily: 'var(--font-numbers)', fontSize: '1.15rem', color: 'var(--primary)' }}>
                              ₹{order.totalAmount}
                            </strong>
                          </td>
                          <td style={{ padding: '1rem', fontSize: '0.82rem', color: 'var(--text-body)', maxWidth: '200px' }}>
                            <div>{order.address}</div>
                            <div style={{ color: 'var(--text-muted)' }}>{order.city}, {order.pincode}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatus(order.id, e.target.value)}
                              style={{
                                padding: '0.35rem 0.65rem',
                                borderRadius: '4px',
                                border: '1px solid var(--border-ui)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                background:
                                  order.status === 'Delivered' ? '#e6f7ec' :
                                  order.status === 'Shipped' ? '#e0f2fe' :
                                  order.status === 'Processing' ? '#fef3c7' : '#FFFFFF',
                                color:
                                  order.status === 'Delivered' ? '#166534' :
                                  order.status === 'Shipped' ? '#0369a1' :
                                  order.status === 'Processing' ? '#92400e' : 'var(--text-heading)',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <a
                                href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${order.customerName}, this is Mystic Mithi's publishing desk regarding your order #${order.id} for "${order.bookTitle}".`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Contact on WhatsApp"
                                style={{
                                  padding: '0.4rem 0.65rem',
                                  borderRadius: '4px',
                                  background: '#25D366',
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  textDecoration: 'none'
                                }}
                              >
                                <FaWhatsapp size={14} />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteOrder(order.id)}
                                title="Delete Order"
                                style={{ padding: '0.4rem 0.65rem', border: '1px solid #fecaca', borderRadius: '4px', background: '#fef2f2', cursor: 'pointer', color: '#dc2626' }}
                              >
                                <FaTrash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '780px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--text-heading)', margin: '0 0 0.35rem 0' }}>
              Author & Publishing Settings
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Configure your author profile, publishing imprint details, contact WhatsApp, and social media channels.
            </p>

            {settingsSaved && (
              <div style={{ padding: '1rem 1.5rem', background: '#e6f7ec', color: '#166534', borderRadius: '6px', fontWeight: 600, marginBottom: '1.5rem' }}>
                Settings updated successfully!
              </div>
            )}

            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid var(--border-ui)' }}>
              <form onSubmit={(e) => { e.preventDefault(); setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Author Pen Name</label>
                    <input
                      type="text"
                      value={authorSettings.authorName}
                      onChange={(e) => setAuthorSettings({ ...authorSettings, authorName: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Publishing Imprint</label>
                    <input
                      type="text"
                      value={authorSettings.imprintName}
                      onChange={(e) => setAuthorSettings({ ...authorSettings, imprintName: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>WhatsApp Number for Orders</label>
                    <input
                      type="text"
                      value={authorSettings.whatsapp}
                      onChange={(e) => setAuthorSettings({ ...authorSettings, whatsapp: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Public Contact Email</label>
                    <input
                      type="email"
                      value={authorSettings.email}
                      onChange={(e) => setAuthorSettings({ ...authorSettings, email: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Dispatch Location & Address</label>
                  <input
                    type="text"
                    value={authorSettings.dispatchCity}
                    onChange={(e) => setAuthorSettings({ ...authorSettings, dispatchCity: e.target.value })}
                    className="insp-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Instagram Profile URL</label>
                    <input
                      type="url"
                      value={authorSettings.instagramUrl}
                      onChange={(e) => setAuthorSettings({ ...authorSettings, instagramUrl: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Facebook Page URL</label>
                    <input
                      type="url"
                      value={authorSettings.facebookUrl}
                      onChange={(e) => setAuthorSettings({ ...authorSettings, facebookUrl: e.target.value })}
                      className="insp-input"
                    />
                  </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-ui)' }}>
                  <button type="submit" className="btn-insp-primary">
                    Save Publishing Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ================= ADD / EDIT BOOK MODAL ================= */}
      {isBookModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem',
            backdropFilter: 'blur(3px)'
          }}
          onClick={() => setIsBookModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.25rem',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <FaXmark size={20} />
            </button>

            <span className="insp-eyebrow">CATALOG MANAGEMENT</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-heading)', margin: '0 0 1.5rem 0' }}>
              {editingBookId ? 'Edit Book Details' : 'Add New Book'}
            </h2>

            <form onSubmit={handleSaveBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Book Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Whispers of Ink"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="btn-insp-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-insp-primary">
                  {editingBookId ? 'Save Changes' : 'Publish Book to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
