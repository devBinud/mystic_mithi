import { Link } from 'react-router-dom';
import { FaGoodreadsG } from 'react-icons/fa6';
import PageHeader from '../components/PageHeader';
import { reviews, AUTHOR_LINKS } from '../data/portfolio';

export default function ReviewsPage() {
  return (
    <div className="insp-page-wrapper mm-section-page">
      <div className="insp-container">
        <PageHeader eyebrow="READER EXPERIENCES" title="Reviews & Testimonials.">
          Words from readers who found solace, beauty and quiet healing in her pages.
        </PageHeader>

        <div className="mm-review-grid">
          {reviews.map((r) => (
            <figure key={r.name} className="insp-rslider-card mm-review">
              <span className="mm-review-book">{r.book}</span>
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <span className="insp-rslider-avatar">{r.name.charAt(0)}</span>
                <span>
                  <strong>{r.name}</strong>
                  <small>{r.city}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mm-page-cta">
          <p>Read one of her books? She would love to hear from you.</p>
          <div className="mm-page-cta-actions">
            <a href={AUTHOR_LINKS.goodreads} target="_blank" rel="noopener noreferrer" className="btn-insp-primary">
              <FaGoodreadsG size={14} /> Review on Goodreads
            </a>
            <Link to="/contact" className="btn-insp-secondary">
              Send a Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
