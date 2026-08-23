import React from 'react';
import { ShieldCheck, ClipboardCheck, Sparkles, Award } from 'lucide-react';

export default function TrustStatsBar() {
  const points = [
    { icon: ShieldCheck, title: "WHO-GMP Standards", desc: "Pharmaceutical manufacturing" },
    { icon: ClipboardCheck, title: "Lab Validated", desc: "Every batch third-party tested" },
    { icon: Sparkles, title: "Clinical Skincare", desc: "Dermatologist recommended" },
    { icon: Award, title: "Pure Nutrition", desc: "No synthetic binders or fillers" }
  ];

  return (
    <div style={styles.bar}>
      <div className="container" style={styles.container}>
        {points.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} style={styles.item}>
              <div style={styles.iconWrapper}>
                <Icon size={20} color="var(--color-teal-700)" />
              </div>
              <div>
                <h4 style={styles.itemTitle}>{p.title}</h4>
                <p style={styles.itemDesc}>{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  bar: {
    backgroundColor: 'var(--color-white)',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    padding: '24px 0',
    width: '100%',
    position: 'relative',
    zIndex: 10
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '24px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '1 1 200px'
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-ink)',
    marginBottom: '2px'
  },
  itemDesc: {
    fontSize: '12px',
    color: 'var(--color-charcoal)',
    opacity: 0.8,
    lineHeight: 1.3
  }
};
