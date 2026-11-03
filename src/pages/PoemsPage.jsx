import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import PageHeader from '../components/PageHeader';
import { publishedPoems } from '../data/portfolio';

export default function PoemsPage() {
  return (
    <div className="insp-page-wrapper mm-section-page">
      <div className="insp-container">
        <PageHeader eyebrow="IN PRINT" title="Published Poems.">
          Individual poems by Mystic Mithi that have found a home in literary magazines and journals.
        </PageHeader>

        <div className="mm-poem-list">
          {publishedPoems.map((poem) => (
            <article key={poem.id} className="mm-poem">
              <span className="mm-poem-meta">
                {poem.publication}
                {poem.date && ` · ${poem.date}`}
              </span>
              <h2 className="mm-poem-title mm-script">{poem.title}</h2>
              {poem.excerpt && <blockquote className="mm-poem-excerpt">{poem.excerpt}</blockquote>}
              {poem.link && (
                <a href={poem.link} target="_blank" rel="noopener noreferrer" className="mm-text-link">
                  Read the poem <FaArrowUpRightFromSquare size={11} />
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="mm-page-cta">
          <p>Looking for more of her verse?</p>
          <Link to="/books" className="btn-insp-primary">
            Explore the Collections <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
