import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={styles.container}>
      {/* Form Content Side */}
      <div style={styles.formSide}>
        <div style={styles.formWrapper}>
          <Outlet />
        </div>
      </div>

      {/* Visual Image Side */}
      <div style={styles.imageSide}>
        <div style={styles.overlay} />
        <img 
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80" 
          alt="VitaDerm Clinical Care" 
          style={styles.image} 
        />
        <div style={styles.textBlock}>
          <span className="text-mono" style={styles.tag}>CERTIFIED PHARMACY</span>
          <h1 style={styles.title}>Scientifically Formulated, Clinically Proven.</h1>
          <p style={styles.desc}>
            Bridging the gap between active dermatology and nutritional immunology. Trusted by certified medical professionals.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'var(--color-mist-50)'
  },
  formSide: {
    flex: '1 1 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    backgroundColor: 'var(--color-white)'
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px'
  },
  imageSide: {
    flex: '1 1 50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '60px',
    color: 'var(--color-white)',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 33, 29, 0.4)',
    zIndex: 1
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0
  },
  textBlock: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '500px'
  },
  tag: {
    fontSize: '12px',
    color: 'var(--color-amber-600)',
    backgroundColor: 'var(--color-amber-100)',
    padding: '4px 10px',
    borderRadius: '2px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    color: 'var(--color-white)',
    marginTop: '16px',
    marginBottom: '12px',
    lineHeight: 1.25
  },
  desc: {
    color: 'var(--color-white)',
    opacity: 0.9,
    fontSize: '15px'
  }
};
