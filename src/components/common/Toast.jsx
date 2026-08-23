import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} color="var(--color-teal-700)" />;
      case 'error':
        return <AlertTriangle size={18} color="var(--color-danger)" />;
      default:
        return <Info size={18} color="var(--color-amber-600)" />;
    }
  };

  return (
    <div 
      className={`apothecary-card toast-card type-${type}`} 
      style={styles.toast}
    >
      <div style={styles.content}>
        <div style={styles.iconWrapper}>{getIcon()}</div>
        <span style={styles.text}>{message}</span>
      </div>
      <button onClick={onClose} style={styles.closeBtn} aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
}

const styles = {
  toast: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    borderLeft: '4px solid var(--color-teal-700)',
    boxShadow: 'var(--shadow-lg)',
    backgroundColor: 'var(--color-white)',
    pointerEvents: 'auto',
    gap: '12px'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-ink)'
  },
  closeBtn: {
    color: 'var(--color-charcoal)',
    opacity: 0.6,
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center'
  }
};
