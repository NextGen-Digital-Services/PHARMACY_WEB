import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';

export default function ProfileForm({ onSaveComplete }) {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate database updates
    setTimeout(() => {
      setLoading(false);
      if (onSaveComplete) {
        onSaveComplete("Profile information updated successfully!");
      }
    }, 800);
  };

  return (
    <div className="apothecary-card" style={styles.card}>
      <h3 style={styles.title}>Patient Profile Settings</h3>
      <div style={styles.divider} />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input text-mono"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Joined Date</label>
          <input
            type="text"
            value={user?.joinedDate || '2026-02-20'}
            className="form-input text-mono"
            style={{ backgroundColor: 'var(--color-mist-50)', cursor: 'not-allowed' }}
            disabled
          />
        </div>

        <div style={styles.btnWrapper}>
          <Button type="submit" variant="secondary" loading={loading} style={styles.btn}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  card: {
    padding: '28px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 20px'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '16px'
  },
  btn: {
    width: '100%',
    maxWidth: '180px'
  }
};
