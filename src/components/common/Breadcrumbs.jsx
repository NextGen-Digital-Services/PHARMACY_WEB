import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ paths = [] }) {
  if (!paths || paths.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb" style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      {paths.map((p, idx) => {
        const isLast = idx === paths.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={14} style={styles.separator} />
            {isLast ? (
              <span style={styles.active}>{p.name}</span>
            ) : (
              <Link to={p.url} style={styles.link}>{p.name}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '16px 0',
    fontSize: '13px',
    color: 'var(--color-charcoal)'
  },
  link: {
    color: 'var(--color-teal-700)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'color 0.15s ease'
  },
  separator: {
    color: 'var(--color-border)'
  },
  active: {
    color: 'var(--color-ink)',
    fontWeight: 'var(--font-weight-semibold)'
  }
};
