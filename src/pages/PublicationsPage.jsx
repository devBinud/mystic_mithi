import { Link } from 'react-router-dom';
import { FaArrowRight, FaGoodreadsG, FaAmazon } from 'react-icons/fa6';
import PageHeader from '../components/PageHeader';
import { literaryPublications, AUTHOR_LINKS } from '../data/portfolio';

export default function PublicationsPage() {
  return (
    <div className="insp-page-wrapper mm-section-page">
      <div className="insp-container mm-narrow">
        <PageHeader eyebrow="BIBLIOGRAPHY" title="Literary Publications.">
          The complete record of Mystic Mithi&rsquo;s published work, from poetry collections to poems in print.
        </PageHeader>

        <ol className="mm-pub-list">
          {literaryPublications.map((pub) => (
            <li key={pub.id} className="mm-pub">
              <span className="mm-pub-year">{pub.year || '—'}</span>
              <div className="mm-pub-body">
                <span className="mm-pub-kind">{pub.kind}</span>
                <h2>
                  <Link to={pub.to}>{pub.title}</Link>
                </h2>
                {(pub.publisher || pub.detail) && (
                  <p>{[pub.publisher, pub.detail].filter(Boolean).join(' · ')}</p>
                )}
              </div>
              <Link to={pub.to} className="mm-pub-arrow" aria-label={`View ${pub.title}`}>
                <FaArrowRight size={13} />
              </Link>
            </li>
          ))}
        </ol>

        <div className="mm-pub-elsewhere">
          <span>Also find her work on</span>
          <a href={AUTHOR_LINKS.goodreads} target="_blank" rel="noopener noreferrer">
            <FaGoodreadsG size={14} /> Goodreads
          </a>
          <a href={AUTHOR_LINKS.amazon} target="_blank" rel="noopener noreferrer">
            <FaAmazon size={14} /> Amazon
          </a>
        </div>
      </div>
    </div>
  );
}
