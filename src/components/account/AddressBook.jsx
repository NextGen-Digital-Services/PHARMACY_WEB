import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit } from 'lucide-react';
import Button from '../common/Button';

export default function AddressBook({ onSaveComplete }) {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Demo Customer",
      street: "Flat 402, Block A, Green Meadows Apartments",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560037",
      phone: "+91 98765 00000",
      isDefault: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });

  const handleAddAddress = (e) => {
    e.preventDefault();
    const addressWithId = {
      ...newAddress,
      id: Date.now()
    };

    let updated = [...addresses];
    if (newAddress.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    updated.push(addressWithId);

    setAddresses(updated);
    setShowForm(false);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      isDefault: false
    });
    
    if (onSaveComplete) {
      onSaveComplete("New shipping address added successfully.");
    }
  };

  const handleDelete = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    if (onSaveComplete) {
      onSaveComplete("Address removed from book.");
    }
  };

  return (
    <div className="apothecary-card" style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Registered Addresses</h3>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="prescription-tag text-mono" style={styles.addBtn}>
            <Plus size={14} />
            <span>Add Address</span>
          </button>
        )}
      </div>
      <div style={styles.divider} />

      {showForm ? (
        <form onSubmit={handleAddAddress} style={styles.form}>
          <div className="form-group">
            <label className="form-label">Recipient Name</label>
            <input
              type="text"
              className="form-input"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              className="form-input"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              required
            />
          </div>
          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-input"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-input"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                required
              />
            </div>
          </div>
          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-input text-mono"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Contact Phone</label>
              <input
                type="text"
                className="form-input text-mono"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group" style={styles.checkGroup}>
            <label style={styles.checkLabel}>
              <input
                type="checkbox"
                checked={newAddress.isDefault}
                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                style={styles.checkbox}
              />
              <span>Set as default shipping address</span>
            </label>
          </div>
          <div style={styles.formBtns}>
            <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>
              Cancel
            </button>
            <Button type="submit" variant="secondary" style={styles.submitBtn}>
              Save Address
            </Button>
          </div>
        </form>
      ) : (
        <div style={styles.grid}>
          {addresses.map((a) => (
            <div key={a.id} style={styles.addrCard}>
              <div style={styles.addrHeader}>
                <div style={styles.addrTitleBlock}>
                  <MapPin size={16} color="var(--color-teal-700)" />
                  <span style={styles.addrName}>{a.name}</span>
                </div>
                {a.isDefault && <span className="prescription-tag text-mono" style={styles.defBadge}>DEFAULT</span>}
              </div>
              <p style={styles.addrText}>
                {a.street}<br />
                {a.city}, {a.state} - <span className="text-mono">{a.pincode}</span><br />
                Phone: <span className="text-mono">{a.phone}</span>
              </p>
              
              <div style={styles.addrActions}>
                <button 
                  onClick={() => handleDelete(a.id)} 
                  style={styles.actionBtn}
                  disabled={addresses.length === 1}
                  title="Delete Address"
                >
                  <Trash2 size={14} color="var(--color-danger)" />
                  <span style={{ color: 'var(--color-danger)' }}>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: '28px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 20px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  addrCard: {
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px',
    backgroundColor: 'var(--color-mist-50)',
    position: 'relative'
  },
  addrHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  addrTitleBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  addrName: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'var(--color-ink)'
  },
  defBadge: {
    backgroundColor: 'var(--color-sage-100)',
    color: 'var(--color-teal-700)',
    borderColor: 'var(--color-teal-700)',
    fontSize: '10px',
    padding: '2px 6px'
  },
  addrText: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.4,
    marginBottom: '12px'
  },
  addrActions: {
    display: 'flex',
    gap: '16px',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '10px'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  row: {
    display: 'flex',
    gap: '12px'
  },
  checkGroup: {
    margin: '10px 0'
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    cursor: 'pointer'
  },
  checkbox: {
    accentColor: 'var(--color-teal-700)'
  },
  formBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px'
  },
  cancelBtn: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    cursor: 'pointer'
  },
  submitBtn: {
    width: '100%',
    maxWidth: '160px'
  }
};
