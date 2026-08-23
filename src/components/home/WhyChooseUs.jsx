import React from 'react';
import { UserCheck, FlaskConical, Leaf, PackageCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const items = [
    {
      icon: UserCheck,
      title: "Pharmacist Formulated",
      desc: "Every product batch is supervised and verified by certified pharmacy managers for pharmacological safety and concentration."
    },
    {
      icon: FlaskConical,
      title: "Clinical Lab Validated",
      desc: "Our ingredients undergo extensive gas chromatography testing to ensure 100% active concentrations with zero chemical contaminants."
    },
    {
      icon: Leaf,
      title: "Pure Vegan Integrity",
      desc: "We prioritize bio-identical active minerals and pure plant-based botanical extracts. Zero animal testing, zero cheap synthetic binders."
    },
    {
      icon: PackageCheck,
      title: "Apothecary Packaging",
      desc: "Products are stored in amber borosilicate glass or high-barrier recyclable polymer tubes to shield active ingredients from UV degradation."
    }
  ];

  return (
    <section className="section-wrapper bg-sage">
      <div className="container">
        <div style={styles.header}>
          <span className="text-mono" style={styles.eyebrow}>TRUST METRICS</span>
          <h2 style={styles.title}>The VitaDerm Standard</h2>
          <p style={styles.subtitle}>
            We combine vintage apothecary discipline with modern dermatological science.
          </p>
        </div>

        <div style={styles.grid}>
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="apothecary-card" 
                style={{ ...styles.card, '--notch-bg': 'var(--color-sage-100)' }}
              >
                <div style={styles.iconWrapper}>
                  <Icon size={24} color="var(--color-teal-900)" />
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            );
          })}
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    width: '100%'
  },
  card: {
    padding: '32px 24px',
    backgroundColor: 'var(--color-white)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-ink)',
    marginBottom: '12px',
    fontFamily: 'var(--font-body)'
  },
  cardDesc: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.5,
    opacity: 0.9
  }
};
