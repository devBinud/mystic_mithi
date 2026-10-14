// src/admin/adminStore.js
import book1Img from '../assets/book1.jpg';
import book2Img from '../assets/book2.jpg';
import book3Img from '../assets/book3.jpg';

const BOOKS_STORAGE_KEY = 'mystic_author_books';
const ORDERS_STORAGE_KEY = 'mystic_author_orders';
const AUTH_STORAGE_KEY = 'mystic_author_auth';

export const INITIAL_BOOKS = [
  {
    id: 'book-1',
    title: 'The Whispers of Ink',
    subtitle: 'A Journey Through Light, Shadows, and Unspoken Words',
    genre: 'Poetry & Literary Musings',
    author: 'Mystic Mithi',
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 128,
    image: book1Img,
    description: 'A soulful, bestselling collection of verses and lyrical musings exploring the tender intersections of love, heartbreak, solitude, and rebirth. Written in evocative poetic rhythm by Mystic Mithi, each page serves as a mirror to the quietest corners of the human heart.',
    pages: 214,
    publisher: 'Mithi-Inkling Ink Publishing',
    publishedYear: '2025',
    isbn: '978-93-5421-102-4',
    language: 'English',
    format: 'Paperback & Hardcover',
    inStock: true,
    featured: true
  },
  {
    id: 'book-2',
    title: 'Echoes of the Mystic Mind',
    subtitle: 'Reflections on Solitude, Self-Discovery and Timeless Truths',
    genre: 'Philosophical Fiction & Prose',
    author: 'Mystic Mithi',
    price: 449,
    originalPrice: 550,
    rating: 4.8,
    reviewsCount: 94,
    image: book2Img,
    description: 'An immersive, atmospheric exploration of human consciousness and internal storms. Echoes of the Mystic Mind offers solace to thinkers, dreamers, and seekers wandering the alleys of contemporary existence.',
    pages: 268,
    publisher: 'Mithi-Inkling Ink Publishing',
    publishedYear: '2025',
    isbn: '978-93-5421-204-8',
    language: 'English',
    format: 'Hardcover Collector Edition',
    inStock: true,
    featured: true
  },
  {
    id: 'book-3',
    title: 'Between the Silence',
    subtitle: 'When unspoken words speak louder than confessions',
    genre: 'Contemporary Literary Fiction',
    author: 'Mystic Mithi',
    price: 349,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 76,
    image: book3Img,
    description: 'A poignant narrative of two souls whose paths cross amidst misty hills, bound by an unspoken language that defies circumstance and time. A delicate, unforgettable meditation on longing and redemption.',
    pages: 196,
    publisher: 'Mithi-Inkling Ink Publishing',
    publishedYear: '2024',
    isbn: '978-93-5421-309-1',
    language: 'English',
    format: 'Paperback',
    inStock: true,
    featured: true
  }
];

// Initialize books in localStorage
export function getBooks() {
  try {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_BOOKS;
  }
}

export function saveBooks(books) {
  try {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  } catch (e) {
    console.error('Error saving books:', e);
  }
}

export function getBookById(id) {
  const books = getBooks();
  return books.find((b) => String(b.id) === String(id)) || null;
}

export function addBook(newBookData) {
  const books = getBooks();
  const id = `book-${Date.now().toString().slice(-4)}`;
  const book = {
    id,
    title: newBookData.title || 'Untitled Book',
    subtitle: newBookData.subtitle || '',
    genre: newBookData.genre || 'General Literature',
    author: newBookData.author || 'Mystic Mithi',
    price: Number(newBookData.price) || 299,
    originalPrice: Number(newBookData.originalPrice) || Number(newBookData.price) || 399,
    rating: Number(newBookData.rating) || 5.0,
    reviewsCount: Number(newBookData.reviewsCount) || 1,
    image: newBookData.image || book1Img,
    description: newBookData.description || 'No description provided.',
    pages: Number(newBookData.pages) || 200,
    publisher: newBookData.publisher || 'Mithi-Inkling Ink Publishing',
    publishedYear: newBookData.publishedYear || new Date().getFullYear().toString(),
    isbn: newBookData.isbn || 'N/A',
    language: newBookData.language || 'English',
    format: newBookData.format || 'Paperback',
    inStock: newBookData.inStock !== false,
    featured: !!newBookData.featured
  };
  const updated = [book, ...books];
  saveBooks(updated);
  return book;
}

export function updateBook(id, updatedData) {
  const books = getBooks();
  const updated = books.map((b) => (String(b.id) === String(id) ? { ...b, ...updatedData } : b));
  saveBooks(updated);
  return updated;
}

export function deleteBook(id) {
  const books = getBooks();
  const updated = books.filter((b) => String(b.id) !== String(id));
  saveBooks(updated);
  return updated;
}

export function resetBooks() {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
  return INITIAL_BOOKS;
}

// ================= ORDERS MANAGEMENT =================

export function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders:', e);
  }
}

export function createOrder(orderData) {
  const orders = getOrders();
  const id = `MM-ORD-${Date.now().toString().slice(-5)}`;
  const nowStr = new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const fullOrder = {
    id,
    customerName: orderData.customerName || 'Anonymous Reader',
    phone: orderData.phone || '',
    email: orderData.email || '',
    address: orderData.address || '',
    city: orderData.city || '',
    state: orderData.state || 'Assam',
    pincode: orderData.pincode || '',
    bookId: orderData.bookId || '',
    bookTitle: orderData.bookTitle || 'Book Order',
    bookPrice: Number(orderData.bookPrice) || 0,
    quantity: Number(orderData.quantity) || 1,
    totalAmount: Number(orderData.totalAmount) || (Number(orderData.bookPrice) * (Number(orderData.quantity) || 1)),
    paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
    status: 'Pending',
    notes: orderData.notes || '',
    createdAt: nowStr
  };

  const updated = [fullOrder, ...orders];
  saveOrders(updated);
  return fullOrder;
}

export function updateOrderStatus(id, newStatus) {
  const orders = getOrders();
  const updated = orders.map((o) => (String(o.id) === String(id) ? { ...o, status: newStatus } : o));
  saveOrders(updated);
  return updated;
}

export function deleteOrder(id) {
  const orders = getOrders();
  const updated = orders.filter((o) => String(o.id) !== String(id));
  saveOrders(updated);
  return updated;
}

// ================= AUTHENTICATION =================

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function login(username, password) {
  const trimmedUser = (username || '').trim().toLowerCase();
  const trimmedPass = (password || '').trim();

  const validUsers = ['admin', 'mithi', 'mysticmithi', 'author'];
  const validPass = ['mithi2026', 'admin123', '@dminCureo#2026', 'cureo2026', 'password'];

  if (validUsers.some(u => trimmedUser.includes(u)) && validPass.includes(trimmedPass)) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    return { success: true };
  }
  return { success: false, message: 'Invalid username or password' };
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

// Backward compatibility stubs for legacy appointment imports
export function getAppointments() { return []; }
export function addAppointment(data) { return data; }
export function updateAppointmentStatus() { return []; }
export function deleteAppointment() { return []; }
export function initAppointments() {}
export function resetMockData() { return []; }
