import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ClipboardList, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function AccountSidebar({ activeTab, setActiveTab }) {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'profile', name: 'Profile Info', icon: User },
    { id: 'addresses', name: 'Address Book', icon: MapPin },
    { id: 'orders', name: 'Order History', icon: ClipboardList }
  ];

  return (
    <div className="apothecary-card" style={styles.container}>
      {/* Profile summary header */}
      <div style={styles.header}>
        <div style={styles.avatar}>
          {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
        </div>
        <div style={styles.profileText}>
          <h4 style={styles.name}>{user?.name || 'Patient User'}</h4>
          <span style={styles.joined}>Member since {user?.joinedDate || '2026'}</span>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Tabs */}
      <nav style={styles.nav}>
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                ...styles.link,
                backgroundColor: isActive ? 'var(--color-teal-700)' : 'transparent',
                color: isActive ? 'var(--color-white)' : 'var(--color-ink)'
              }}
            >
              <Icon size={16} />
              <span>{t.name}</span>
            </button>
          );
        })}
        
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    color: 'var(--color-teal-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  joined: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 16px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 'var(--font-weight-medium)',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    cursor: 'pointer'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 'var(--font-weight-medium)',
    textAlign: 'left',
    color: 'var(--color-danger)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    marginTop: '20px',
    border: '1px solid transparent',
    ':hover': {
      borderColor: 'var(--color-danger)'
    }
  }
};
