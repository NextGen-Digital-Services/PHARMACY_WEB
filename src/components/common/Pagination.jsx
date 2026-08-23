import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prescription-tag"
        style={{ ...styles.btn, opacity: currentPage === 1 ? 0.5 : 1 }}
      >
        <ChevronLeft size={16} />
        <span className="text-mono">Prev</span>
      </button>

      <div style={styles.pageGroup}>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`prescription-tag ${currentPage === page ? 'active' : ''}`}
            style={{ 
              ...styles.pageBtn, 
              backgroundColor: currentPage === page ? 'var(--color-teal-700)' : 'var(--color-mist-50)',
              color: currentPage === page ? 'var(--color-white)' : 'var(--color-ink)',
              borderColor: currentPage === page ? 'var(--color-teal-700)' : 'var(--color-border)'
            }}
          >
            <span className="text-mono">{page}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="prescription-tag"
        style={{ ...styles.btn, opacity: currentPage === totalPages ? 0.5 : 1 }}
      >
        <span className="text-mono">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '32px',
    width: '100%'
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer'
  },
  pageGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  pageBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0
  }
};
