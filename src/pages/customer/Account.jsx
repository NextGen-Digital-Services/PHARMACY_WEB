import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AdminDataContext } from '../../context/AdminDataContext';
import AccountSidebar from '../../components/account/AccountSidebar';
import ProfileForm from '../../components/account/ProfileForm';
import AddressBook from '../../components/account/AddressBook';
import OrderHistoryTable from '../../components/account/OrderHistoryTable';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Toast from '../../components/common/Toast';

export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useContext(AuthContext);
  const { orders } = useContext(AdminDataContext);

  // Set default active tab based on path
  const getInitialTab = () => {
    if (location.pathname.includes('/orders')) {
      return 'orders';
    }
    return 'profile';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Redirect if not logged in
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.pathname.includes('/orders')) {
      setActiveTab('orders');
    } else {
      setActiveTab('profile');
    }
  }, [location.pathname]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  // Filter orders placed by this specific demo customer email
  const userOrders = orders.filter((o) => o.customerEmail === user.email);

  const handleShowToast = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <Breadcrumbs paths={[{ name: 'Account Dashboard', url: '/account' }]} />

      <div style={styles.header}>
        <span className="text-mono" style={styles.eyebrow}>PATIENT CONSOLE</span>
        <h1 style={styles.title}>Welcome back, {user.name}</h1>
        <p style={styles.subtitle}>Manage your profile details and monitor live chemical formulations.</p>
      </div>

      <div style={styles.layout}>
        {/* Sidebar panel */}
        <div style={styles.sidebarCol}>
          <AccountSidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              if (tab === 'orders') navigate('/account/orders');
              else navigate('/account');
            }} 
          />
        </div>

        {/* Content panel */}
        <div style={styles.contentCol}>
          {activeTab === 'profile' && (
            <ProfileForm onSaveComplete={handleShowToast} />
          )}

          {activeTab === 'addresses' && (
            <AddressBook onSaveComplete={handleShowToast} />
          )}

          {activeTab === 'orders' && (
            <OrderHistoryTable orders={userOrders} />
          )}
        </div>
      </div>

      {/* Floating toast notification */}
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
    color: 'var(--color-charcoal)'
  },
  layout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  sidebarCol: {
    flex: '1 1 240px',
    maxWidth: '280px'
  },
  contentCol: {
    flex: '1 1 600px'
  },
  toastWrapper: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1100,
    pointerEvents: 'none'
  }
};
