import React from 'react';
import useCounter from '../../hooks/useCounter';

export default function StatCard({ title, value, prefix = '', suffix = '', icon: Icon, color = 'var(--color-teal-700)' }) {
  // Extract number for count up animation
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ''));
  const animatedValue = useCounter(numericValue, 1500);

  // Format value back to human readable format
  const formatValue = (num) => {
    if (title.toLowerCase().includes('revenue')) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(num);
    }
    return num.toLocaleString();
  };

  return (
    <div className="apothecary-card stat-card" style={styles.card}>
      <div style={styles.content}>
        <div style={styles.textBlock}>
          <span style={styles.title}>{title}</span>
          <h3 className="text-mono" style={{ ...styles.value, color }}>
            {prefix}{formatValue(animatedValue)}{suffix}
          </h3>
        </div>
        {Icon && (
          <div style={{ ...styles.iconWrapper, backgroundColor: `${color}15`, color }}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    flex: '1 1 220px',
    '--notch-bg': 'var(--color-mist-50)'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '12px',
    color: 'var(--color-charcoal)',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 'bold',
    marginBottom: '6px'
  },
  value: {
    fontSize: '26px',
    fontWeight: 'bold',
    lineHeight: 1.2
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
};
