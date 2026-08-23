import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, HelpCircle } from 'lucide-react';

const trustLines = [
  "Free shipping over ₹999 on all orders",
  "100% Genuine Skincare & Nutrition Products",
  "Certified Pharmacists available for consultation"
];

export default function TopUtilityBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trustLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.bar}>
      <div className="container" style={styles.container}>
        <div style={styles.trustTicker}>
          <CheckCircle size={14} style={styles.icon} />
          <span style={styles.tickerText}>{trustLines[currentIndex]}</span>
        </div>
        <div style={styles.links}>
          <Link to="/contact" style={styles.link}>
            <Phone size={14} style={styles.icon} />
            Support
          </Link>
          <span style={styles.divider}>|</span>
          <Link to="/about" style={styles.link}>
            <HelpCircle size={14} style={styles.icon} />
            FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    backgroundColor: 'var(--color-teal-900)',
    color: 'var(--color-white)',
    fontSize: '12px',
    height: 'var(--header-height-top)',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    zIndex: 100,
    position: 'relative'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  trustTicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    overflow: 'hidden'
  },
  tickerText: {
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: '0.2px'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--color-white)',
    opacity: 0.9,
    transition: 'opacity 0.15s ease'
  },
  divider: {
    opacity: 0.3
  },
  icon: {
    color: 'var(--color-amber-600)'
  }
};
