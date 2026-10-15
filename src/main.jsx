import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CartProvider from './cart/CartProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Hide the preloader from index.html once the app has rendered (kept on screen briefly so the book animation reads).
const PRELOADER_MIN_MS = 1700;
const preloader = document.getElementById('mm-preloader');
if (preloader) {
  const elapsed = performance.now();
  const hide = () => {
    preloader.classList.add('mm-preloader-done');
    window.dispatchEvent(new Event('mm:preloader-done'));
    setTimeout(() => preloader.remove(), 900);
  };
  setTimeout(() => requestAnimationFrame(hide), Math.max(0, PRELOADER_MIN_MS - elapsed));
}
