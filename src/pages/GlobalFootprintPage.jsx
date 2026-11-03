import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare, FaBuildingColumns, FaLocationDot } from 'react-icons/fa6';
import FootprintGlobe from '../components/FootprintGlobe';
import { libraryFootprint, libraryCount, footprintMarkers, worldcatRecords } from '../data/portfolio';
import { LCCNS } from '../data/author';

export default function GlobalFootprintPage() {
  const [selected, setSelected] = useState(null);
  const country = libraryFootprint.find((c) => c.country === selected);

  return (
    <div className="insp-page-wrapper mm-footprint-page">
      {/* Globe */}
      <section className="mm-footprint-hero">
        <div className="insp-container">
          <header className="mm-footprint-head">
            <span className="insp-eyebrow">GLOBAL LITERARY FOOTPRINT</span>
            <h1 className="mm-script">Words travel farther than oceans.</h1>
            <p>
              Madhushree Das&rsquo;s poetry has found its way into {libraryCount} libraries across {libraryFootprint.length} countries
              and five continents.
              Turn the globe, or choose a country to see where her books are held.
            </p>
          </header>

          <div className="mm-footprint-grid">
            <FootprintGlobe markers={footprintMarkers} focus={country?.point ?? null} />

            <div className="mm-footprint-panel">
              <div className="mm-footprint-stats">
                <div>
                  <strong>{libraryFootprint.length}</strong>
                  <span>Countries</span>
                </div>
                <div>
                  <strong>{libraryCount}</strong>
                  <span>Libraries</span>
                </div>
                <div>
                  <strong>{worldcatRecords.length}</strong>
                  <span>Books catalogued</span>
                </div>
              </div>

              <ul className="mm-footprint-countries" aria-label="Countries">
                {libraryFootprint.map((c) => (
                  <li key={c.country}>
                    <button
                      type="button"
                      className={c.country === selected ? 'is-active' : ''}
                      aria-pressed={c.country === selected}
                      onClick={() => setSelected(c.country === selected ? null : c.country)}
                    >
                      <span className="mm-footprint-dot" />
                      {c.country}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mm-footprint-card" aria-live="polite">
                {country ? (
                  <>
                    <span className="mm-footprint-card-kicker">
                      <FaLocationDot size={11} /> {country.country}
                    </span>
                    {country.libraries.length > 0 ? (
                      <ul className="mm-footprint-libraries">
                        {country.libraries.map((lib, i) => (
                          <li key={lib.name} style={{ '--i': i }}>
                            <FaBuildingColumns size={14} />
                            <span>
                              <strong>{lib.name}</strong>
                              <small>{lib.city}</small>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Her books are held in library collections in {country.country}.</p>
                    )}
                  </>
                ) : (
                  <p className="mm-footprint-card-hint">Select a country to see the libraries that hold her books.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WorldCat */}
      <section className="mm-catalogue">
        <div className="insp-container">
          <div className="mm-divider"><span>Global Library Catalogue</span></div>
          <p className="mm-catalogue-lead">
            Both collections are listed in WorldCat, the world&rsquo;s largest catalogue of library collections, and in the
            Library of Congress catalogue (LCCN {LCCNS.join(' · ')}).
          </p>

          <div className="mm-catalogue-grid">
            {worldcatRecords.map((rec) => (
              <article key={rec.bookId} className="mm-catalogue-item">
                <Link to={`/books/${rec.bookId}`} className="mm-catalogue-cover">
                  <img src={rec.image} alt={rec.title} loading="lazy" />
                </Link>
                <div>
                  <span className="mm-pub-kind">{rec.year}</span>
                  <h2>{rec.title}</h2>
                  <p>Available in the WorldCat Global Library Catalogue</p>
                  <a href={rec.url} target="_blank" rel="noopener noreferrer" className="mm-text-link">
                    View on WorldCat <FaArrowUpRightFromSquare size={11} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Journey */}
          <ol className="mm-journey">
            {worldcatRecords.map((rec) => (
              <li key={rec.bookId}>
                <span className="mm-journey-year">{rec.year}</span>
                <span className="mm-journey-text">
                  <em>{rec.title}</em> is published
                </span>
              </li>
            ))}
            <li>
              <span className="mm-journey-year">Today</span>
              <span className="mm-journey-text">On library shelves in {libraryFootprint.length} countries</span>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
