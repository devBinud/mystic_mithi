import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import PageHeader from '../components/PageHeader';
import { interviews } from '../data/portfolio';

export default function InterviewsPage() {
  return (
    <div className="insp-page-wrapper mm-section-page">
      <div className="insp-container">
        <PageHeader eyebrow="IN CONVERSATION" title="Interviews & Features.">
          Conversations with literary platforms about poetry, mysticism and the writing life.
        </PageHeader>

        <div className="mm-feature-list">
          {interviews.map((item) => (
            <article key={item.id} className="mm-feature">
              <div className="mm-feature-quote">
                <blockquote>&ldquo;{item.quotes[0]}&rdquo;</blockquote>
                <span>Madhushree Das (Mystic Mithi)</span>
              </div>

              <div className="mm-feature-body">
                <span className="mm-feature-kind">
                  {item.kind} &middot; {item.outlet}
                </span>
                <h2>{item.title}</h2>
                <p className="mm-feature-meta">
                  {item.outletNote}
                  {item.date && ` · ${item.date}`}
                </p>
                <p>{item.summary}</p>

                {item.topics?.length > 0 && (
                  <>
                    <h3 className="mm-feature-subhead">In this interview</h3>
                    <ul className="mm-feature-topics">
                      {item.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </>
                )}

                {item.quotes.length > 1 && (
                  <div className="mm-feature-more-quotes">
                    {item.quotes.slice(1).map((q) => (
                      <blockquote key={q}>&ldquo;{q}&rdquo;</blockquote>
                    ))}
                  </div>
                )}

                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-insp-primary">
                  Read the Interview <FaArrowUpRightFromSquare size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
