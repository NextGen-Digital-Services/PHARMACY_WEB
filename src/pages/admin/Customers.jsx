import React, { useContext, useEffect, useState } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import formatCurrency from '../../utils/formatCurrency';
import { Search, UserCheck } from 'lucide-react';

export default function Customers() {
  const { customers } = useContext(AdminDataContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Search Header */}
      <div style={styles.actionHeader}>
        <div style={styles.searchBlock}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search patients by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.infoText}>
          Total Registered Profiles: <strong className="text-mono">{customers.length}</strong>
        </div>
      </div>

      {/* Table */}
      <div className="apothecary-card" style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          {filtered.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient Name</th>
                  <th style={styles.th}>Email Address</th>
                  <th style={styles.th}>Contact Phone</th>
                  <th style={styles.th}>Joined Date</th>
                  <th style={styles.th}>Orders Placed</th>
                  <th style={styles.th} style={{ textAlign: 'right' }}>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.nameBlock}>
                        <div style={styles.avatar}>
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <strong>{c.name}</strong>
                      </div>
                    </td>
                    <td style={styles.td} className="text-mono" style={{ fontSize: '12px' }}>{c.email}</td>
                    <td style={styles.td} className="text-mono" style={{ fontSize: '12px' }}>{c.phone}</td>
                    <td style={styles.td}>
                      {new Date(c.joinedDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td style={styles.td} className="text-mono" style={{ fontWeight: 'bold' }}>
                      {c.totalOrders} order{c.totalOrders !== 1 && 's'}
                    </td>
                    <td style={styles.td} className="price-mono" style={{ textAlign: 'right' }}>
                      {formatCurrency(c.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.empty}>
              <h4>No registered patient profiles found</h4>
              <p>Check spelling filters or try a different contact keyword search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
  },
  actionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  searchBlock: {
    position: 'relative',
    flex: '1 1 300px',
    maxWidth: '450px'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-charcoal)',
    opacity: 0.6
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px 10px 38px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    fontSize: '13px',
    backgroundColor: 'var(--color-white)'
  },
  infoText: {
    fontSize: '14px',
    color: 'var(--color-charcoal)'
  },
  tableCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    textAlign: 'left'
  },
  th: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-ink)',
    fontWeight: 'bold',
    backgroundColor: 'var(--color-mist-50)'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-charcoal)',
    verticalAlign: 'middle'
  },
  tr: {
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.01)'
    }
  },
  nameBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    color: 'var(--color-teal-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  empty: {
    padding: '48px',
    textAlign: 'center',
    color: 'var(--color-charcoal)'
  }
};
