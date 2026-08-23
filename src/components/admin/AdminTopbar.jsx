import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminTopbar({ title = 'Dashboard' }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header style={styles.topbar}>
      {/* Title */}
      <h2 style={styles.title}>{title}</h2>

      {/* User Actions */}
      <div style={styles.userSection}>
        <div style={styles.profile}>
          <div style={styles.avatar}>
            <User size={16} />
          </div>
          <div style={styles.profileInfo}>
            <span style={styles.name}>{user?.name || 'Administrator'}</span>
            <span style={styles.email}>{user?.email || 'admin@vitaderm.com'}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          style={styles.logoutBtn}
          title="Logout from administrator session"
          aria-label="Logout"
        >
          <LogOut size={18} />
          <span style={styles.logoutText}>Logout</span>
        </button>
      </div>
    </header>
  );
}

const styles = {
  topbar: {
    height: 'var(--header-height-main)',
    backgroundColor: 'var(--color-white)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'sticky',
    top: 0,
    zIndex: 90
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-sage-100)',
    color: 'var(--color-teal-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    fontSize: '13px',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-ink)',
    lineHeight: 1.2
  },
  email: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  },
  logoutBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-danger)',
    fontSize: '13px',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    padding: '6px 12px',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-sm)',
    transition: 'all 0.15s ease',
    ':hover': {
      border: '1px solid var(--color-danger)',
      backgroundColor: '#FADBD8'
    }
  },
  logoutText: {
    fontFamily: 'var(--font-body)'
  }
};
