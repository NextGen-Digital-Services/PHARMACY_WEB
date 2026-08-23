import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { Phone, Mail, MapPin, Clock, Send, ShieldAlert } from 'lucide-react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Skincare Advice', message: '' });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate pharmacist response scheduling
    setTimeout(() => {
      setLoading(false);
      setToastMessage("Message logged! Our certified pharmacist care team will email you within 2-4 hours.");
      setForm({ name: '', email: '', subject: 'Skincare Advice', message: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-us-page bg-mist" style={{ paddingBottom: '100px' }}>
      <div className="container">
        <Breadcrumbs paths={[{ name: 'Contact Care Team', url: '/contact' }]} />

        <div style={styles.header}>
          <span className="text-mono" style={styles.eyebrow}>GET IN TOUCH</span>
          <h1 style={styles.title}>Contact Pharmacist Support</h1>
          <p style={styles.subtitle}>
            Have an active ingredient query, batch issue, or need personalized dermal advice? Reach our pharmacy desk.
          </p>
        </div>

        <div style={styles.layout}>
          {/* Form Block */}
          <div style={styles.formCol}>
            <form onSubmit={handleSubmit} className="apothecary-card" style={styles.formCard}>
              <h3 style={styles.cardTitle}>Submit Formulation Query</h3>
              <div style={styles.divider} />

              <div style={styles.row}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Query Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Skincare Advice">Dermatological / Skincare Advice</option>
                  <option value="Supplement Dosage">Supplement / Nutrition Dosage</option>
                  <option value="Order Tracking">Prescription Order / Tracking Issue</option>
                  <option value="Batch Testing">Lab Batch / WHO-GMP Certificates</option>
                  <option value="Other">Other Inquiries</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your skin profile or supplement queries in detail..."
                  rows="5"
                  className="form-textarea"
                  required
                />
              </div>

              <Button type="submit" variant="secondary" loading={loading} style={styles.submitBtn}>
                <Send size={14} />
                <span>Submit Query to Pharmacist</span>
              </Button>
            </form>
          </div>

          {/* Details & Map Block */}
          <div style={styles.infoCol}>
            {/* Info Box */}
            <div className="apothecary-card" style={styles.infoCard}>
              <h3 style={styles.cardTitle}>Dispensary Desk</h3>
              <div style={styles.divider} />

              <div style={styles.infoList}>
                <div style={styles.infoItem}>
                  <Phone size={18} color="var(--color-teal-700)" />
                  <div>
                    <span style={styles.infoLabel}>Pharmacist Hotline:</span>
                    <span className="text-mono" style={styles.infoVal}>+91 80 4991 2280</span>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Mail size={18} color="var(--color-teal-700)" />
                  <div>
                    <span style={styles.infoLabel}>Support Inbox:</span>
                    <span style={styles.infoVal}>care@vitaderm.com</span>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <MapPin size={18} color="var(--color-teal-700)" />
                  <div>
                    <span style={styles.infoLabel}>Laboratory Headquarters:</span>
                    <span style={styles.infoVal}>7B, Electronic City Phase 1, Indiranagar Sector 4, Bengaluru - 560100</span>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Clock size={18} color="var(--color-teal-700)" />
                  <div>
                    <span style={styles.infoLabel}>Response Hours:</span>
                    <span style={styles.infoVal}>Monday - Saturday: 09:00 AM - 07:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Block */}
            <div className="apothecary-card" style={styles.mapCard}>
              <div style={styles.mapOverlay}>
                <MapPin size={24} color="var(--color-amber-600)" />
                <span className="text-mono" style={styles.mapLabel}>VITADERM CENTRAL LABS</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" 
                alt="VitaDerm Location Map Grid representation" 
                style={styles.mapImg} 
              />
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="toast-container" style={styles.toastWrapper}>
          <Toast message={toastMessage} onClose={() => setToastMessage('')} />
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '36px',
    marginTop: '16px'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    display: 'block',
    marginBottom: '8px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    color: 'var(--color-ink)',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--color-charcoal)',
    maxWidth: '650px'
  },
  layout: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  formCol: {
    flex: '1 1 500px'
  },
  infoCol: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formCard: {
    padding: '32px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 20px'
  },
  row: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  submitBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '12px'
  },
  infoCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  infoItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  infoLabel: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 'bold',
    color: 'var(--color-charcoal)',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  infoVal: {
    fontSize: '13px',
    color: 'var(--color-ink)',
    lineHeight: 1.4,
    fontWeight: 'var(--font-weight-medium)'
  },
  mapCard: {
    height: '180px',
    overflow: 'hidden',
    position: 'relative',
    padding: 0,
    border: '1px solid var(--color-border)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  mapImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(1) contrast(1.1) brightness(0.95)'
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 74, 63, 0.2)',
    zIndex: 2,
    gap: '6px'
  },
  mapLabel: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-white)',
    padding: '4px 8px',
    borderRadius: '2px',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)'
  },
  toastWrapper: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1100,
    pointerEvents: 'none'
  }
};
