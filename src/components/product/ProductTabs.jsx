import React, { useState } from 'react';
import RatingStars from '../common/RatingStars';

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return null;

  const { fullDescription, rating, category, dosage } = product;

  // Mock Reviews
  const mockReviewsList = [
    {
      name: "Dr. Rakesh Sen",
      rating: 5,
      date: "2026-08-10",
      comment: "Highly stable formulation. I have prescribed this specific batch concentration to patients with excellent recovery on skin texture."
    },
    {
      name: "Pooja Hegde",
      rating: 4,
      date: "2026-08-15",
      comment: "Very gentle on my skin, non-sticky and absorbs quickly. Seeing a visible difference in dark spots after two weeks of morning application."
    },
    {
      name: "Kabir Dev",
      rating: 5,
      date: "2026-08-20",
      comment: "Exactly what my doctor ordered. Clean ingredients, no synthetic smells, and standard clinical packaging. Fully satisfied."
    }
  ];

  // Clinical Directions & Facts based on category type
  const isNutrition = category.includes('vitamin') || category.includes('protein') || category.includes('wellness') || category.includes('nutrition');

  return (
    <div style={styles.container}>
      {/* Tab Selectors */}
      <div style={styles.tabHeaders}>
        <button
          onClick={() => setActiveTab('description')}
          style={{
            ...styles.tabBtn,
            color: activeTab === 'description' ? 'var(--color-teal-700)' : 'var(--color-charcoal)',
            borderBottomColor: activeTab === 'description' ? 'var(--color-teal-700)' : 'transparent'
          }}
        >
          Clinical Description
        </button>
        <button
          onClick={() => setActiveTab('ingredients')}
          style={{
            ...styles.tabBtn,
            color: activeTab === 'ingredients' ? 'var(--color-teal-700)' : 'var(--color-charcoal)',
            borderBottomColor: activeTab === 'ingredients' ? 'var(--color-teal-700)' : 'transparent'
          }}
        >
          {isNutrition ? 'Nutrition Facts & Dosage' : 'Ingredients & Directions'}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          style={{
            ...styles.tabBtn,
            color: activeTab === 'reviews' ? 'var(--color-teal-700)' : 'var(--color-charcoal)',
            borderBottomColor: activeTab === 'reviews' ? 'var(--color-teal-700)' : 'transparent'
          }}
        >
          Patient Reviews ({mockReviewsList.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div className="apothecary-card tab-panel-card" style={styles.tabPanel}>
        {activeTab === 'description' && (
          <div style={styles.panelContent}>
            <p style={styles.text}>{fullDescription}</p>
            <div style={styles.cautionBox}>
              <h4 style={styles.cautionTitle}>Clinical Advisory Note:</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-charcoal)' }}>
                Keep away from direct sunlight. Store in a cool, dry place. Perform a patch test behind the ear 24 hours prior to full application. Discontinue use if redness or inflammation occurs.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div style={styles.panelContent}>
            <h4 style={styles.subTitle}>{isNutrition ? 'Suggested Dosage Protocol' : 'Directions for Clinical Application'}</h4>
            <p style={styles.text}>
              {isNutrition 
                ? `Take 1 portion (${dosage}) daily dissolved in water or milk, preferably post-meals, or as directed by your physician. Do not exceed the recommended daily allowance.`
                : `Dispense 2-3 drops of formulation onto clean skin. Press gently into the epidermis, avoiding the eye contour area. Follow with broad-spectrum SPF 50 sunscreen in morning routines.`
              }
            </p>
            
            <div style={styles.divider} />
            
            <h4 style={styles.subTitle}>{isNutrition ? 'Active Composition Facts' : 'Composition list (Active Ingredients)'}</h4>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.tdLabel}>Primary Active Formula</td>
                  <td style={styles.tdVal}>{product.name.split(' ').slice(1, 3).join(' ')}</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Excipients & Base</td>
                  <td style={styles.tdVal}>Purified Water, Glycerin, Phenoxyethanol, Ethylhexylglycerin (USP Grade)</td>
                </tr>
                <tr>
                  <td style={styles.tdLabel}>Preservation Standard</td>
                  <td style={styles.tdVal}>Shielded Borosilicate Glass protection (UV Blocker)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={styles.panelContent}>
            <div style={styles.reviewsSummary}>
              <div style={styles.ratingBig}>
                <h2>{rating}</h2>
                <RatingStars rating={rating} size={18} />
                <span>Verified Patient Average</span>
              </div>
            </div>

            <div style={styles.reviewsList}>
              {mockReviewsList.map((rev, idx) => (
                <div key={idx} style={styles.reviewItem}>
                  <div style={styles.reviewHeader}>
                    <h5 style={styles.reviewerName}>{rev.name}</h5>
                    <span className="text-mono" style={styles.reviewDate}>{rev.date}</span>
                  </div>
                  <div style={styles.reviewStars}>
                    <RatingStars rating={rev.rating} size={12} />
                  </div>
                  <p style={styles.reviewComment}>"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    marginTop: '40px'
  },
  tabHeaders: {
    display: 'flex',
    borderBottom: '1px solid var(--color-border)',
    gap: '24px',
    marginBottom: '-1px'
  },
  tabBtn: {
    padding: '12px 8px',
    fontSize: '14px',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    transition: 'all 0.15s ease',
    fontFamily: 'var(--font-body)'
  },
  tabPanel: {
    backgroundColor: 'var(--color-white)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: '32px',
    '--notch-bg': 'var(--color-mist-50)'
  },
  panelContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  text: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: 'var(--color-charcoal)'
  },
  cautionBox: {
    backgroundColor: 'var(--color-sage-100)',
    borderLeft: '4px solid var(--color-amber-600)',
    padding: '16px',
    borderRadius: 'var(--radius-sm)',
    marginTop: '12px'
  },
  cautionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    marginBottom: '6px'
  },
  subTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    marginBottom: '8px'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '8px 0'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  tdLabel: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--color-border)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-ink)',
    width: '40%',
    backgroundColor: 'var(--color-mist-50)'
  },
  tdVal: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-charcoal)'
  },
  reviewsSummary: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'var(--color-mist-50)',
    padding: '24px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    marginBottom: '24px'
  },
  ratingBig: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    h2: {
      fontSize: '36px',
      color: 'var(--color-teal-900)'
    },
    span: {
      fontSize: '12px',
      color: 'var(--color-charcoal)',
      opacity: 0.8
    }
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  reviewItem: {
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '16px',
    ':last-of-type': {
      borderBottom: 'none',
      paddingBottom: 0
    }
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  reviewerName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  reviewDate: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.6
  },
  reviewStars: {
    marginBottom: '8px'
  },
  reviewComment: {
    fontSize: '13px',
    lineHeight: 1.5,
    color: 'var(--color-charcoal)',
    fontStyle: 'italic'
  }
};
