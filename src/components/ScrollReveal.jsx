import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Elements that fade/slide in as they scroll into view, on every page.
// Direct children of any CSS grid inside <main> (card rows, form columns) are added automatically.
const SELECTORS = [
  '.mm-hero-media',
  '.mm-hero-title',
  '.mm-hero-actions',
  '.mm-hello-card',
  '.mm-hello-body',
  '.mm-divider',
  '.mm-section-script',
  '.insp-eyebrow',
  '.insp-section-title',
  '.insp-section-subtitle',
  '.mm-book-title',
  '.insp-checklist-item',
  '.insp-excerpts-panel',
  '.insp-rslider',
  '.insp-faq-item',
  '.insp-letter-contacts > *',
  '.mm-checkout-card',
  'main h1',
  'main h2'
].join(',');

// Never animate inside these (they move on their own or are off-screen by design).
const SKIP_INSIDE = '.insp-rslider-track, .mm-cart, .insp-faq-answer';

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 4;

function collectTargets(root) {
  const found = new Set(root.querySelectorAll(SELECTORS));

  root.querySelectorAll('div, ul, section, form').forEach((el) => {
    if (getComputedStyle(el).display === 'grid') {
      Array.from(el.children).forEach((child) => found.add(child));
    }
  });

  const candidates = Array.from(found).filter(
    (el) => !el.dataset.reveal && !el.closest(SKIP_INSIDE) && el.offsetParent !== null
  );

  // If an ancestor is already animating, let it carry its children.
  return candidates.filter(
    (el) => !candidates.some((other) => other !== el && other.contains(el))
      && !el.parentElement?.closest('[data-reveal="pending"]')
  );
}

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const finish = (el) => {
      el.dataset.reveal = 'done';
      el.classList.remove('mm-reveal', 'is-visible');
      el.style.removeProperty('--reveal-delay');
    };

    const fallbackTimers = [];

    const reveal = (el) => {
      observer.unobserve(el);
      el.classList.add('is-visible');
      el.addEventListener('transitionend', () => finish(el), { once: true });
      // Fallback in case transitionend never fires (e.g. tab hidden)
      fallbackTimers.push(setTimeout(() => finish(el), 1600));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );

    const scan = () => {
      const targets = collectTargets(main);
      const stepByParent = new Map();
      targets.forEach((el) => {
        const step = stepByParent.get(el.parentElement) || 0;
        stepByParent.set(el.parentElement, step + 1);
        el.style.setProperty('--reveal-delay', `${Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
        el.dataset.reveal = 'pending';
        el.classList.add('mm-reveal');
        observer.observe(el);
      });

      // Safety net: never leave on-screen content hidden if the observer is slow to report.
      fallbackTimers.push(setTimeout(() => {
        targets.forEach((el) => {
          if (el.dataset.reveal !== 'pending' || el.classList.contains('is-visible')) return;
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) reveal(el);
        });
      }, 900));
    };

    // On first load, wait for the preloader to lift so the hero animates in visibly.
    let frame;
    const startScan = () => {
      frame = requestAnimationFrame(scan);
    };
    const waitingForPreloader = document.getElementById('mm-preloader')
      && !document.getElementById('mm-preloader').classList.contains('mm-preloader-done');
    if (waitingForPreloader) {
      window.addEventListener('mm:preloader-done', startScan, { once: true });
    } else {
      startScan();
    }
    let timer;
    const mutations = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(scan);
      }, 60);
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mm:preloader-done', startScan);
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      fallbackTimers.forEach(clearTimeout);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
