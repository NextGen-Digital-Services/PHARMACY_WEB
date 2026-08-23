import React from 'react';

export default function Loader({ size = 32, message = "Loading apothecary data..." }) {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.spinner, width: size, height: size }} />
      <span className="text-mono" style={styles.message}>{message}</span>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '16px'
  },
  spinner: {
    border: '3px solid var(--color-border)',
    borderTop: '3px solid var(--color-teal-700)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  message: {
    fontSize: '13px',
    color: 'var(--color-charcoal)'
  }
};

// We will inject the keyframes for spin in global CSS or inline
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
