import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';

export default function AddressForm({ address, setAddress, onNext }) {
  const { user } = useContext(AuthContext);

  // Auto pre-populate address if user is logged in
  useEffect(() => {
    if (user && !address.name) {
      setAddress((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user, address.name, setAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      address.name.trim() &&
      address.email.trim() &&
      address.phone.trim() &&
      address.street.trim() &&
      address.city.trim() &&
      address.state.trim() &&
      address.pincode.trim()
    ) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="apothecary-card" style={styles.card}>
      <h3 style={styles.title}>1. Shipping & Contact Information</h3>
      <div style={styles.divider} />

      <div style={styles.row}>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="form-input"
            required
          />
        </div>
      </div>

      <div style={styles.row}>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="form-input"
            required
          />
        </div>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="form-input"
            required
          />
        </div>
      </div>

      <div style={styles.row}>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">Street Address / Apartment</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Apt 402, Block B, Silver Palms"
            className="form-input"
            required
          />
        </div>
      </div>

      <div style={styles.row}>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="Bengaluru"
            className="form-input"
            required
          />
        </div>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="Karnataka"
            className="form-input"
            required
          />
        </div>
        <div className="form-group" style={{ ...styles.col, flex: 1 }}>
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="560037"
            className="form-input text-mono"
            required
          />
        </div>
      </div>

      <div style={styles.btnWrapper}>
        <Button type="submit" variant="secondary" style={styles.btn}>
          Continue to Payment Method →
        </Button>
      </div>
    </form>
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
  row: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  col: {
    minWidth: '200px'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '12px'
  },
  btn: {
    width: '100%',
    maxWidth: '280px'
  }
};
