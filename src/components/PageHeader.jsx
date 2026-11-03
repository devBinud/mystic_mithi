// Centred page heading shared by the portfolio section pages.
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="mm-page-head">
      <span className="insp-eyebrow">{eyebrow}</span>
      <h1 className="insp-section-title">{title}</h1>
      {children && <p className="insp-section-subtitle">{children}</p>}
    </header>
  );
}

// Shown when a section has no entries yet.
export function EmptyNote({ children }) {
  return <p className="mm-empty-note">{children}</p>;
}
