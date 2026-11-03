import { useEffect } from 'react';
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

// Full-screen image viewer. `index` is the open photo (-1 = closed); photos are { src, alt, caption }.
export default function Lightbox({ photos, index, onChange }) {
  const isOpen = index >= 0;
  const count = photos.length;

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onChange(-1);
      if (e.key === 'ArrowLeft' && count > 1) onChange((i) => (i - 1 + count) % count);
      if (e.key === 'ArrowRight' && count > 1) onChange((i) => (i + 1) % count);
    };
    document.body.classList.add('drawer-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('drawer-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, count, onChange]);

  const current = photos[index];
  if (!current) return null;

  const step = (dir) => (e) => {
    e.stopPropagation();
    onChange((i) => (i + dir + count) % count);
  };

  return (
    <div className="mm-lightbox" role="dialog" aria-modal="true" aria-label={current.alt} onClick={() => onChange(-1)}>
      <button type="button" className="mm-lightbox-close" onClick={() => onChange(-1)} aria-label="Close">
        <FaXmark size={20} />
      </button>
      {count > 1 && (
        <>
          <button type="button" className="mm-lightbox-nav is-prev" onClick={step(-1)} aria-label="Previous photo">
            <FaChevronLeft size={18} />
          </button>
          <button type="button" className="mm-lightbox-nav is-next" onClick={step(1)} aria-label="Next photo">
            <FaChevronRight size={18} />
          </button>
        </>
      )}
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.alt} />
        {current.caption && <figcaption>{current.caption}</figcaption>}
      </figure>
    </div>
  );
}
