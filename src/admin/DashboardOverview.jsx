// src/admin/DashboardOverview.jsx — the /admin landing page
import { Link } from 'react-router-dom';
import { FaPlus, FaBookOpen, FaCartShopping, FaGear, FaArrowRight, FaBoxArchive } from 'react-icons/fa6';

// Badge colours per order status (same palette as the status dropdown on the Orders page)
const STATUS_STYLES = {
  Delivered: { background: '#e6f7ec', color: '#166534' },
  Shipped: { background: '#e0f2fe', color: '#0369a1' },
  Processing: { background: '#fef3c7', color: '#92400e' },
  Cancelled: { background: '#fee2e2', color: '#991b1b' },
};
const DEFAULT_STATUS_STYLE = { background: 'var(--bg-secondary)', color: 'var(--text-heading)' };

const QUICK_LINKS = [
  { to: '/admin/books/new', label: 'Add New Book', hint: 'Publish a new title to the store', icon: FaPlus },
  { to: '/admin/books', label: 'View All Books', hint: 'Edit details, prices and stock', icon: FaBookOpen },
  { to: '/admin/orders', label: 'Orders & Sales', hint: 'Update dispatch status', icon: FaCartShopping },
  { to: '/admin/settings', label: 'Store Settings', hint: 'Contact details and social links', icon: FaGear },
];

const RECENT_ORDER_COUNT = 5;

export default function DashboardOverview({ books, orders }) {
  const inStock = books.filter((b) => b.inStock !== false).length;
  const pendingDispatch = orders.filter((o) => o.status === 'Pending').length;
  const shippedOrDelivered = orders.filter((o) => o.status === 'Shipped' || o.status === 'Delivered').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  // createOrder() prepends, so the first orders are the newest
  const recentOrders = orders.slice(0, RECENT_ORDER_COUNT);

  const stats = [
    { label: 'Books in Catalog', value: books.length, note: `${inStock} in stock` },
    { label: 'Total Orders', value: orders.length, note: `${shippedOrDelivered} shipped or delivered` },
    { label: 'Pending Dispatch', value: pendingDispatch, note: 'Waiting to be shipped' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, note: 'Across all orders', accent: true },
  ];

  return (
    <div>
      <h1 className="dash-title">Dashboard</h1>
      <p className="dash-subtitle">Welcome back! Here&rsquo;s an overview of your books and reader orders.</p>

      <div className="dash-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="dash-card dash-stat">
            <span className="dash-stat-label">{stat.label}</span>
            <div className={`dash-stat-value ${stat.accent ? 'is-accent' : ''}`}>{stat.value}</div>
            <div className="dash-stat-note">{stat.note}</div>
          </div>
        ))}
      </div>

      <div className="dash-panels">
        <section className="dash-card dash-panel">
          <div className="dash-panel-header">
            <h2>Recent Orders</h2>
            {orders.length > 0 && (
              <Link to="/admin/orders">
                View all <FaArrowRight size={10} />
              </Link>
            )}
          </div>

          {recentOrders.length === 0 ? (
            <div className="dash-empty">
              <FaBoxArchive className="dash-empty-icon" />
              <p className="dash-empty-title">No orders yet</p>
              <p>Orders placed on your website will appear here.</p>
            </div>
          ) : (
            <ul className="dash-order-list">
              {recentOrders.map((order) => (
                <li key={order.id} className="dash-order">
                  <div className="dash-order-main">
                    <span className="dash-order-customer">{order.customerName}</span>
                    <span className="dash-order-meta">{order.bookTitle} &middot; {order.createdAt}</span>
                  </div>
                  <span className="dash-order-amount">₹{order.totalAmount}</span>
                  <span className="dash-status" style={STATUS_STYLES[order.status] || DEFAULT_STATUS_STYLE}>
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dash-card dash-panel">
          <div className="dash-panel-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="dash-quick-links">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.to} to={link.to} className="dash-quick-link">
                  <span className="dash-quick-icon"><Icon size={14} /></span>
                  <span className="dash-quick-text">
                    <span className="dash-quick-label">{link.label}</span>
                    <span className="dash-quick-hint">{link.hint}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
