import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="section-wrapper bg-teal-dark" style={{ padding: '80px 0' }}>
      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <span className="text-mono" style={styles.eyebrow}>NEWSLETTER SIGNUP</span>
          <h2 style={styles.title}>Join the VitaDerm Apothecary Network</h2>
          <p style={styles.desc}>
            Receive pharmacist-curated health digests, skincare clinical breakdowns, and early access to newly designed wellness formulations.
          </p>
        </div>

        <div style={styles.formBlock}>
          {subscribed ? (
            <div className="apothecary-card" style={styles.successCard}>
              <div style={styles.successHeader}>
                <Check size={20} color="var(--color-teal-700)" />
                <h4 style={{ color: 'var(--color-ink)' }}>Subscription Activated</h4>
              </div>
              <p style={styles.successText}>
                We've registered your email. You'll receive a 10% coupon code and pharmacist advice shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" className="btn btn-primary" style={styles.btn}>
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              <span className="text-mono" style={styles.privacyNote}>
                * Clinical privacy guaranteed. We never sell or share patient records.
              </span>
            </form>
          )}
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
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  content: {
    flex: '1 1 500px',
    maxWidth: '550px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '12px'
  },
  title: {
    color: 'var(--color-white)',
    marginBottom: '16px'
  },
  desc: {
    color: 'var(--color-white)',
    opacity: 0.9,
    fontSize: '15px',
    lineHeight: 1.6
  },
  formBlock: {
    flex: '1 1 400px',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%'
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    minWidth: '220px',
    padding: '12px 16px',
    border: '1px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    outline: 'none',
    transition: 'var(--transition-fast)',
    ':focus': {
      borderColor: 'var(--color-amber-600)'
    }
  },
  btn: {
    whiteSpace: 'nowrap'
  },
  privacyNote: {
    fontSize: '11px',
    color: 'var(--color-white)',
    opacity: 0.6,
    marginTop: '6px'
  },
  successCard: {
    backgroundColor: 'var(--color-white)',
    padding: '24px',
    borderLeft: '4px solid var(--color-teal-700)',
    '--notch-bg': 'var(--color-teal-900)'
  },
  successHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  successText: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.4
  }
};
