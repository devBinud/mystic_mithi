// src/admin/adminStore.js
import starfishImg from '../assets/books/when_mystic_meets_starfish.jpeg';
import caravanImg from '../assets/books/caravan_of_the_cosmos.jpeg';

const BOOKS_STORAGE_KEY = 'mystic_author_books';
const BOOKS_VERSION_KEY = 'mystic_author_books_version';
// Bump this whenever INITIAL_BOOKS changes so browsers drop their cached copy.
const BOOKS_VERSION = '2';
const ORDERS_STORAGE_KEY = 'mystic_author_orders';
const AUTH_STORAGE_KEY = 'mystic_author_auth';

// TODO: confirm price, page count, ISBN and year for both books (editable from the admin dashboard).
export const INITIAL_BOOKS = [
  {
    id: 'when-the-mystic-meets-a-starfish',
    title: 'When the Mystic Meets a Starfish',
    subtitle: 'Poems of mystical love, life and inspiration',
    genre: 'Poetry',
    author: '_Inkling Ink',
    price: 299,
    originalPrice: null,
    rating: null,
    reviewsCount: 0,
    image: starfishImg,
    description: `I have always been fascinated with words and the depth of life. I believe words can solve the puzzle of restless hearts, and magically enlighten our hearts with a new light that can take us all to a different universe — to feel and live soulfully.

My inspiration is Jalāl ad-Dīn Muhammad Rūmī. The grace and magic of Rumi's poems inspired me to write about mystical love, life and inspiration. As a poetic soul who has carried an immense love for poetry all along, I began to pen poetry with the fragrance of words.

"When the Mystic Meets a Starfish" is a collection of stirring and enchanting poems. In a world where we have lost the feeling of the magic of true love, these poems aim to be a panacea for all the aching hearts who have lost their hope in divinity — to inspire readers to traverse the infinite darkness and feel the mystical light till eternity.

I only wanted to convey and share "The Deepness" with readers. I encourage everyone to know the deepness as a way of life — for getting a pearl, you have to dive into the deep ocean.`,
    pages: null,
    publisher: '',
    publishedYear: '',
    isbn: '',
    language: 'English',
    format: 'Paperback',
    formats: ['Paperback'],
    inStock: true,
    featured: true
  },
  {
    id: 'caravan-to-the-cosmos',
    title: 'Caravan to the Cosmos',
    subtitle: 'Melodic poems on the philosophy and harmony of the cosmos',
    genre: 'Poetry',
    author: 'Madhushree Das',
    price: 349,
    originalPrice: null,
    rating: null,
    reviewsCount: 0,
    image: caravanImg,
    description: `The second book of the author, "Caravan to the Cosmos" is a mélange of melodic poems rendering the philosophy of the cosmos and its harmony.

While taking a stroll through the poems, it feels as if you are travelling through the ocean crust and experiencing outer space. The atoms of each poem are beautifully blended over the panorama of the galactic peripherals. The scales of the rhapsodies are encompassed around the stratosphere, where you hold sway over the gravity of the acrostic dimensions.

The stems of the literary compositions in this collection are resplendently engraved in theology, science, psychology, mythology, history, geography, philosophy, literature, art, and medieval and renaissance discoveries.`,
    pages: null,
    publisher: 'The Write Order',
    publishedYear: '',
    isbn: '',
    language: 'English',
    format: 'Paperback',
    formats: ['Paperback'],
    inStock: true,
    featured: true
  }
];

// Initialize books in localStorage
export function getBooks() {
  try {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
    const version = localStorage.getItem(BOOKS_VERSION_KEY);
    if (!raw || version !== BOOKS_VERSION) {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
      localStorage.setItem(BOOKS_VERSION_KEY, BOOKS_VERSION);
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
    image: newBookData.image || starfishImg,
    description: newBookData.description || 'No description provided.',
    pages: Number(newBookData.pages) || 200,
    publisher: newBookData.publisher || '',
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
    items: Array.isArray(orderData.items) ? orderData.items : [],
    shipping: Number(orderData.shipping) || 0,
    totalAmount: Number(orderData.totalAmount) || (Number(orderData.bookPrice) * (Number(orderData.quantity) || 1)),
    paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
    status: orderData.paymentMethod === 'Online Payment' ? 'Awaiting Payment' : 'Pending',
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
