import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContext';
import { getBooks } from '../admin/adminStore';

const CART_STORAGE_KEY = 'mystic_cart';
const MAX_QTY = 20;

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Drop books that no longer exist and refresh title/price/cover from the catalogue.
    const books = new Map(getBooks().map((b) => [b.id, b]));
    return parsed
      .filter((item) => books.has(item.id))
      .map((item) => {
        const book = books.get(item.id);
        return { ...item, title: book.title, image: book.image, price: Number(book.price) || 0 };
      });
  } catch {
    return [];
  }
}

const lineKey = (id, format) => `${id}::${format}`;

export default function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private mode) — cart still works for this session
    }
  }, [items]);

  const addItem = useCallback((book, format = 'Paperback', qty = 1, { openDrawer = true } = {}) => {
    const key = lineKey(book.id, format);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i));
      }
      return [
        ...prev,
        { key, id: book.id, title: book.title, image: book.image, price: Number(book.price) || 0, format, qty }
      ];
    });
    if (openDrawer) setDrawerOpen(true);
  }, []);

  const setQty = useCallback((key, qty) => {
    const next = Math.max(1, Math.min(MAX_QTY, Number(qty) || 1));
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: next } : i)));
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return {
      items,
      count,
      subtotal,
      addItem,
      setQty,
      removeItem,
      clearCart,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false)
    };
  }, [items, drawerOpen, addItem, setQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
