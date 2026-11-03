import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Lightbox from '../components/Lightbox';
import { gallery } from '../data/portfolio';

export default function GalleryPage() {
  const [open, setOpen] = useState(-1);

  return (
    <div className="insp-page-wrapper mm-section-page">
      <div className="insp-container">
        <PageHeader eyebrow="MOMENTS" title="Gallery.">
          Book launches, readings and quiet moments from the writing life.
        </PageHeader>

        <div className="mm-gallery-grid">
          {gallery.map((photo, i) => (
            <button key={photo.id} type="button" className="mm-gallery-item" onClick={() => setOpen(i)}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              {photo.caption && <span className="mm-gallery-caption">{photo.caption}</span>}
            </button>
          ))}
        </div>
      </div>

      <Lightbox photos={gallery} index={open} onChange={setOpen} />
    </div>
  );
}
