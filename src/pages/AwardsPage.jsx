import { useState } from 'react';
import { FaAward, FaMagnifyingGlassPlus } from 'react-icons/fa6';
import PageHeader, { EmptyNote } from '../components/PageHeader';
import Lightbox from '../components/Lightbox';
import { awards } from '../data/portfolio';

const certificates = awards
  .filter((a) => a.image)
  .map((a) => ({ src: a.image, alt: a.imageAlt || a.title, caption: `${a.title} · ${a.presenter}` }));

export default function AwardsPage() {
  const [open, setOpen] = useState(-1);

  return (
    <div className="insp-page-wrapper mm-section-page">
      <div className="insp-container">
        <PageHeader eyebrow="HONOURS" title="Poetry Awards & Certificates.">
          Honours and recognition received for her poetry.
        </PageHeader>

        {awards.length === 0 ? (
          <EmptyNote>Awards and honours will be listed here soon.</EmptyNote>
        ) : (
          <div className="mm-award-list">
            {awards.map((award) => (
              <article key={award.id} className={`mm-award ${award.image ? 'has-image' : ''}`}>
                {award.image ? (
                  <button
                    type="button"
                    className="mm-award-media"
                    onClick={() => setOpen(certificates.findIndex((c) => c.src === award.image))}
                    aria-label={`View certificate: ${award.title}`}
                  >
                    <img src={award.image} alt={award.imageAlt || award.title} loading="lazy" />
                    <span className="mm-award-zoom"><FaMagnifyingGlassPlus size={15} /></span>
                  </button>
                ) : (
                  <span className="mm-award-icon"><FaAward size={22} /></span>
                )}

                <div className="mm-award-body">
                  {award.year && <span className="mm-award-year">{award.date || award.year}</span>}
                  <h2>{award.title}</h2>
                  {award.presenter && <p className="mm-award-presenter">{award.presenter}</p>}
                  {award.citation && <p className="mm-award-citation">&ldquo;{award.citation}&rdquo;</p>}
                  {award.note && <p>{award.note}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Lightbox photos={certificates} index={open} onChange={setOpen} />
    </div>
  );
}
