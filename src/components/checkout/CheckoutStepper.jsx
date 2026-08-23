import React from 'react';
import { Check } from 'lucide-react';

export default function CheckoutStepper({ activeStep }) {
  const steps = [
    { num: 1, label: "Delivery Address" },
    { num: 2, label: "Payment Method" },
    { num: 3, label: "Review & Confirm" }
  ];

  return (
    <div style={styles.container}>
      {steps.map((s, idx) => {
        const isCompleted = activeStep > s.num;
        const isActive = activeStep === s.num;

        return (
          <React.Fragment key={s.num}>
            <div style={styles.stepBlock}>
              <div 
                style={{
                  ...styles.badge,
                  backgroundColor: isCompleted ? 'var(--color-teal-700)' : (isActive ? 'var(--color-amber-600)' : 'transparent'),
                  color: (isCompleted || isActive) ? 'var(--color-white)' : 'var(--color-charcoal)',
                  borderColor: (isCompleted || isActive) ? 'transparent' : 'var(--color-border)'
                }}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : <span className="text-mono">{s.num}</span>}
              </div>
              <span 
                style={{
                  ...styles.label,
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? 'var(--color-ink)' : 'var(--color-charcoal)'
                }}
              >
                {s.label}
              </span>
            </div>
            
            {idx < steps.length - 1 && (
              <div 
                style={{
                  ...styles.line,
                  backgroundColor: isCompleted ? 'var(--color-teal-700)' : 'var(--color-border)'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '40px',
    width: '100%',
    flexWrap: 'wrap'
  },
  stepBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  badge: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
    border: '1px solid'
  },
  label: {
    fontSize: '14px'
  },
  line: {
    height: '2px',
    width: '60px',
    '@media (max-width: 576px)': {
      width: '30px'
    }
  }
};
