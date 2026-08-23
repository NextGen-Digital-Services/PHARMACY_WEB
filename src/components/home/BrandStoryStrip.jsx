import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function BrandStoryStrip() {
  return (
    <section className="section-wrapper bg-mist" style={{ padding: '100px 0' }}>
      <div className="container" style={styles.container}>
        {/* Image Column */}
        <div style={styles.imgCol}>
          <div 
            className="apothecary-card" 
            style={{ ...styles.cardWrapper, '--notch-bg': 'var(--color-mist-50)' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
              alt="VitaDerm Pharmaceutical Lab Testing" 
              style={styles.img} 
            />
            <div style={styles.imgBadge}>
              <span className="text-mono" style={styles.badgeText}>SINCE 2012</span>
            </div>
          </div>
        </div>

        {/* Text Column */}
        <div style={styles.textCol}>
          <span className="text-mono" style={styles.eyebrow}>APOTHECARY HERITAGE</span>
          <h2 style={styles.title}>Science-Backed Solutions, Formulated by Specialists</h2>
          <p style={styles.paragraph}>
            VitaDerm was established by a team of clinical dermatologists and immunology pharmacists who recognized a critical gap: skincare products lacked targeted concentration, and nutritional supplements lacked clean bio-availability.
          </p>
          <p style={styles.paragraph}>
            By utilizing pharmaceutical-grade active ingredients (such as Liposomal Retinol, Zinc PCA, and standardized KSM-66 Ashwagandha) shielded in light-blocking amber containers, we deliver formulations that preserve maximum botanical and molecular potency.
          </p>
          <Link to="/about" className="btn btn-secondary" style={styles.btn}>
            <BookOpen size={16} />
            <span>Read Our Full Story</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '64px',
    flexWrap: 'wrap'
  },
  imgCol: {
    flex: '1 1 450px',
    display: 'flex',
    justifyContent: 'center'
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '480px',
    padding: '12px',
    position: 'relative',
    backgroundColor: 'var(--color-white)'
  },
  img: {
    width: '100%',
    height: '340px',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  imgBadge: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    backgroundColor: 'var(--color-teal-900)',
    color: 'var(--color-white)',
    padding: '6px 12px',
    borderRadius: '2px',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  badgeText: {
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  textCol: {
    flex: '1 1 450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '12px',
    display: 'block'
  },
  title: {
    color: 'var(--color-ink)',
    marginBottom: '20px',
    lineHeight: 1.2
  },
  paragraph: {
    fontSize: '15px',
    color: 'var(--color-charcoal)',
    marginBottom: '18px',
    lineHeight: 1.6
  },
  btn: {
    marginTop: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  }
};
