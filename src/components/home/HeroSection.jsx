import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Heart } from 'lucide-react';
import useCounter from '../../hooks/useCounter';

export default function HeroSection() {
  // Stats counters
  const productCount = useCounter(150, 1500);
  const customerCount = useCounter(10000, 1800);
  const ratingVal = useCounter(4.8, 1200);

  return (
    <section className="hero-section bg-mist">
      <div className="container hero-container" style={styles.container}>
        {/* Left Content Column */}
        <div style={styles.leftCol}>
          <span className="text-mono" style={styles.eyebrow}>
            DERMA · NUTRITION · CERTIFIED PHARMACY
          </span>
          <h1 style={styles.title}>
            Clinical Grade Skincare & Pure Nutrition Formulations
          </h1>
          <p style={styles.subtitle}>
            VitaDerm delivers pharmacist-curated formulations designed to target dermatological concerns and nourish your body from within. Grounded in science, certified for purity.
          </p>

          <div style={styles.ctaRow}>
            <Link to="/shop" className="btn btn-primary" style={styles.btnPrimary}>
              <span>Shop Bestsellers</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/shop/face-cleansers" className="btn btn-outline">
              Explore Derma Care
            </Link>
          </div>

          {/* Stats Bar */}
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <h3 className="text-mono" style={styles.statNum}>{productCount}+</h3>
              <span style={styles.statLabel}>Products Formulated</span>
            </div>
            <div style={styles.statBox}>
              <h3 className="text-mono" style={styles.statNum}>
                {customerCount.toLocaleString()}+
              </h3>
              <span style={styles.statLabel}>Happy Customers</span>
            </div>
            <div style={styles.statBox}>
              <h3 className="text-mono" style={styles.statNum}>
                {ratingVal.toFixed(1)}★
              </h3>
              <span style={styles.statLabel}>Average Rating</span>
            </div>
          </div>
        </div>

        {/* Right Asymmetric Collage Column */}
        <div style={styles.rightCol}>
          <div style={styles.collageWrapper}>
            {/* Card 1 - Main Skincare Lifestyle */}
            <div 
              className="apothecary-card hero-collage-card card-1" 
              style={{ ...styles.collageCard, ...styles.card1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" 
                alt="Dermatology Skin Routine" 
                style={styles.collageImg} 
              />
              <div style={styles.cardLabel}>
                <span className="text-mono" style={styles.cardMonoText}>FORMULATION NO. D-08</span>
                <span style={styles.cardBoldText}>Dermal Hydro-Cleansing</span>
              </div>
            </div>

            {/* Card 2 - Serum Active Bottle */}
            <div 
              className="apothecary-card hero-collage-card card-2" 
              style={{ ...styles.collageCard, ...styles.card2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" 
                alt="Active Retinol Serum" 
                style={styles.collageImg} 
              />
              <div style={styles.cardLabel}>
                <span className="text-mono" style={styles.cardMonoText}>ACTIVE CONCENTRATE</span>
                <span style={styles.cardBoldText}>Retinol 1% Liposomal</span>
              </div>
            </div>

            {/* Card 3 - Supplements Flatlay */}
            <div 
              className="apothecary-card hero-collage-card card-3" 
              style={{ ...styles.collageCard, ...styles.card3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80" 
                alt="Nutrition Vitamins Capsules" 
                style={styles.collageImg} 
              />
              <div style={styles.cardLabel}>
                <span className="text-mono" style={styles.cardMonoText}>NUTRITION LABS</span>
                <span style={styles.cardBoldText}>Co-Q10 Immunity Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    paddingTop: '80px',
    paddingBottom: '80px',
    flexWrap: 'wrap',
    minHeight: 'calc(100vh - var(--header-height-main) - var(--header-height-top))'
  },
  leftCol: {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  eyebrow: {
    fontSize: '12px',
    color: 'var(--color-amber-600)',
    backgroundColor: 'var(--color-amber-100)',
    padding: '4px 10px',
    border: '1px solid var(--color-amber-600)',
    borderRadius: '2px',
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: '1px',
    marginBottom: '24px'
  },
  title: {
    marginBottom: '20px',
    color: 'var(--color-ink)'
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: 1.5,
    color: 'var(--color-charcoal)',
    marginBottom: '32px'
  },
  ctaRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '48px',
    flexWrap: 'wrap'
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  statsContainer: {
    display: 'flex',
    gap: '36px',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '24px',
    width: '100%',
    flexWrap: 'wrap'
  },
  statBox: {
    flex: '1 1 120px'
  },
  statNum: {
    fontSize: '28px',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-teal-700)',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--color-charcoal)',
    fontWeight: 'var(--font-weight-medium)',
    textTransform: 'uppercase',
    letterSpacing: '0.2px'
  },
  rightCol: {
    flex: '1 1 500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '450px',
    position: 'relative'
  },
  collageWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '460px',
    height: '420px'
  },
  collageCard: {
    position: 'absolute',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    padding: '8px',
    backgroundColor: 'var(--color-white)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, z-index 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'scale(1.04) translateY(-8px)',
      zIndex: 15
    }
  },
  collageImg: {
    width: '100%',
    height: '80%',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  cardLabel: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 4px 4px'
  },
  cardMonoText: {
    fontSize: '9px',
    color: 'var(--color-charcoal)',
    opacity: 0.6
  },
  cardBoldText: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    marginTop: '2px'
  },
  card1: {
    width: '260px',
    height: '280px',
    left: '20px',
    top: '30px',
    transform: 'rotate(-4deg)',
    zIndex: 3
  },
  card2: {
    width: '190px',
    height: '220px',
    right: '20px',
    top: '10px',
    transform: 'rotate(5deg)',
    zIndex: 2
  },
  card3: {
    width: '210px',
    height: '230px',
    left: '120px',
    bottom: '10px',
    transform: 'rotate(-1deg)',
    zIndex: 4
  }
};
