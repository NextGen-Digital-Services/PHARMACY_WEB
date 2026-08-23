import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AdminSidebar from '../admin/AdminSidebar';
import AdminTopbar from '../admin/AdminTopbar';

export default function AdminLayout() {
  const { user, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not authenticated or not admin, redirect to admin login
    if (!isAuthenticated || !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Determine title based on location
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) return 'Dashboard Overview';
    if (path.includes('/admin/products')) return 'Catalogue Management';
    if (path.includes('/admin/categories')) return 'Category Management';
    if (path.includes('/admin/orders/VD-')) return 'Order Details';
    if (path.includes('/admin/orders')) return 'Order Management';
    if (path.includes('/admin/payments')) return 'Payment Reconciliation';
    if (path.includes('/admin/tracking')) return 'Shipment & Tracking Management';
    if (path.includes('/admin/customers')) return 'Customer Database';
    return 'Admin Panel';
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Return null while redirecting
  }

  return (
    <div style={styles.container}>
      <AdminSidebar />
      
      <div style={styles.mainContent}>
        <AdminTopbar title={getPageTitle()} />
        <main style={styles.pageBody}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--color-mist-50)',
    color: 'var(--color-ink)'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden'
  },
  pageBody: {
    flex: 1,
    padding: '32px',
    backgroundColor: 'var(--color-mist-50)',
    width: '100%',
    maxWidth: '1600px'
  }
};
