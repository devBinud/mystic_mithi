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

// Hide the preloader from index.html once the app has rendered and the signature has been fully written
// (index.html's inline script resolves window.mmPreloaderShown after the write animation + a short hold).
const preloader = document.getElementById('mm-preloader');
if (preloader) {
  const hide = () => {
    preloader.classList.add('mm-preloader-done');
    window.dispatchEvent(new Event('mm:preloader-done'));
    setTimeout(() => preloader.remove(), 900);
  };
  Promise.resolve(window.mmPreloaderShown).then(() => requestAnimationFrame(hide));
}
