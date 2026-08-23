import React, { useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SectionWrapper from '../../components/common/SectionWrapper';
import { ShieldCheck, Heart, Users, ClipboardCheck } from 'lucide-react';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-page bg-mist" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs paths={[{ name: 'Our Story', url: '/about' }]} />
      </div>

      {/* Hero Banner Section */}
      <SectionWrapper bg="mist" style={{ paddingTop: '20px' }}>
        <div style={styles.heroRow}>
          <div style={styles.heroText}>
            <span className="text-mono" style={styles.eyebrow}>THE SCIENTIFIC PROTOCOL</span>
            <h1 style={styles.title}>Vintage Apothecary Integrity Met by Modern Molecular Biology</h1>
            <p style={styles.subtitle}>
              At VitaDerm, we believe that dermatology and nutrition are two faces of the same biological shield.
            </p>
          </div>
          <div style={styles.heroImgWrapper}>
            <div className="apothecary-card" style={{ padding: '8px', backgroundColor: 'var(--color-white)' }}>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
                alt="VitaDerm Certified Pharmacist at Lab" 
                style={styles.heroImg} 
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision Row */}
      <SectionWrapper bg="sage">
        <div style={styles.missionRow}>
          <div style={styles.missionCol}>
            <div style={styles.iconCircle}>
              <ClipboardCheck size={24} color="var(--color-teal-900)" />
            </div>
            <h3 style={styles.sectionTitle}>Our Formulation Mission</h3>
            <p style={styles.sectionDesc}>
              To eliminate cheap synthetic binders and chemical fillers from daily skincare and wellness routines. We replace them with bio-identical active minerals, protected in UV-barrier amber borosilicate packaging to preserve maximum freshness and active concentration.
            </p>
          </div>

          <div style={styles.missionCol}>
            <div style={styles.iconCircle}>
              <ShieldCheck size={24} color="var(--color-teal-900)" />
            </div>
            <h3 style={styles.sectionTitle}>Our Batch Integrity</h3>
            <p style={styles.sectionDesc}>
              Every raw botanical ingredient is gas chromatography tested prior to laboratory synthesis. Our in-house pharmacy team supervises every single formulation batch, signing off each prescription box with batch numbers and purity percentages.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Heritage Split Row */}
      <SectionWrapper bg="mist">
        <div style={styles.heritageRow}>
          <div style={styles.heritageImgCol}>
            <div className="apothecary-card" style={{ padding: '8px', backgroundColor: 'var(--color-white)' }}>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                alt="Purity validation lab testing" 
                style={styles.heritageImg} 
              />
            </div>
          </div>
          <div style={styles.heritageTextCol}>
            <span className="text-mono" style={styles.eyebrow}>WHO-GMP LAB STANDARDS</span>
            <h2 style={styles.h2Title}>Clean-Room Synthesis Protocols</h2>
            <p style={styles.bodyText}>
              All VitaDerm dermatology products are formulated in certified Class 10,000 clean rooms, ensuring that environmental pollutants never compromise skincare serum stability. 
            </p>
            <p style={styles.bodyText}>
              Our nutritional supplements follow the same strict discipline. By leveraging chelated mineral pathways, we ensure our Magnesium, Zinc, and Vitamin D3 capsules bypass gastrointestinal degradation, arriving directly at cellular receptors for maximum bio-availability.
            </p>
            <div style={styles.highlights}>
              <div style={styles.highlightItem}>
                <strong>100%</strong>
                <span>Preservative-Free Actives</span>
              </div>
              <div style={styles.highlightItem}>
                <strong>Class 10k</strong>
                <span>Clean-Room Synthesis</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

const styles = {
  heroRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '48px',
    flexWrap: 'wrap'
  },
  heroText: {
    flex: '1 1 500px'
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
    marginBottom: '20px',
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: 1.5,
    color: 'var(--color-charcoal)'
  },
  heroImgWrapper: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center'
  },
  heroImg: {
    width: '100%',
    height: '360px',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  missionRow: {
    display: 'flex',
    gap: '48px',
    flexWrap: 'wrap'
  },
  missionCol: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  iconCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    border: '1.5px solid var(--color-teal-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    marginBottom: '12px'
  },
  sectionDesc: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.6
  },
  heritageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '64px',
    flexWrap: 'wrap-reverse'
  },
  heritageImgCol: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center'
  },
  heritageImg: {
    width: '100%',
    height: '340px',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  heritageTextCol: {
    flex: '1 1 500px'
  },
  h2Title: {
    fontFamily: 'var(--font-display)',
    fontSize: '30px',
    color: 'var(--color-ink)',
    marginBottom: '20px'
  },
  bodyText: {
    fontSize: '15px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.6,
    marginBottom: '16px'
  },
  highlights: {
    display: 'flex',
    gap: '32px',
    marginTop: '24px',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '20px'
  },
  highlightItem: {
    display: 'flex',
    flexDirection: 'column',
    strong: {
      fontSize: '24px',
      color: 'var(--color-teal-700)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'bold'
    },
    span: {
      fontSize: '12px',
      color: 'var(--color-charcoal)'
    }
  }
};
