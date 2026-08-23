import React from 'react';
import { mockTestimonials } from '../../data/mockTestimonials';
import RatingStars from '../common/RatingStars';

export default function Testimonials() {
  return (
    <section className="section-wrapper bg-sage">
      <div className="container">
        <div style={styles.header}>
          <span className="text-mono" style={styles.eyebrow}>PATIENT FEEDBACK</span>
          <h2 style={styles.title}>Dermatologist Approved, Customer Trusted</h2>
          <p style={styles.subtitle}>
            Read what medical experts and verified customers say about our clinical formulas.
          </p>
        </div>

        <div style={styles.grid}>
          {mockTestimonials.map((t) => (
            <div 
              key={t.id} 
              className="apothecary-card testimonial-card" 
              style={{ ...styles.card, '--notch-bg': 'var(--color-sage-100)' }}
            >
              <div style={styles.ratingRow}>
                <RatingStars rating={t.rating} />
                <span className="text-mono" style={styles.ratingVal}>{t.rating.toFixed(1)}</span>
              </div>
              
              <p style={styles.text}>"{t.text}"</p>
              
              <div style={styles.divider} />
              
              <div style={styles.customer}>
                <img src={t.avatar} alt={t.name} style={styles.avatar} />
                <div>
                  <h4 style={styles.name}>{t.name}</h4>
                  <span className="text-mono" style={styles.role}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '56px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-teal-700)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '8px'
  },
  title: {
    color: 'var(--color-ink)',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--color-charcoal)',
    maxWidth: '500px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    width: '100%'
  },
  card: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '220px'
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  },
  ratingVal: {
    fontSize: '12px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold'
  },
  text: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.5,
    fontStyle: 'italic',
    marginBottom: '20px',
    flex: 1
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0'
  },
  customer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '4px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid var(--color-border)'
  },
  name: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-ink)'
  },
  role: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.7
  }
};
