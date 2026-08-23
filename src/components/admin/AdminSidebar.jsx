import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  FileText, 
  CreditCard, 
  Truck, 
  Users, 
  ExternalLink 
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Orders', path: '/admin/orders', icon: FileText },
    { name: 'Payment Status', path: '/admin/payments', icon: CreditCard },
    { name: 'Tracking Mgmt', path: '/admin/tracking', icon: Truck },
    { name: 'Customers', path: '/admin/customers', icon: Users }
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Brand Header */}
      <div style={styles.brand}>
        <div style={styles.logoBadge}>+</div>
        <div>
          <span style={styles.brandName}>VitaDerm</span>
          <span style={styles.adminTitle}>Admin Control</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={isActive ? 'active' : ''}
              style={{
                ...styles.link,
                backgroundColor: isActive ? 'var(--color-teal-700)' : 'transparent',
                color: isActive ? 'var(--color-white)' : 'var(--color-sage-100)'
              }}
            >
              <Icon size={18} style={{ opacity: isActive ? 1 : 0.8 }} />
              <span style={styles.linkText}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Return link */}
      <div style={styles.footer}>
        <Link to="/" style={styles.storefrontBtn}>
          <ExternalLink size={16} />
          <span>View Storefront</span>
        </Link>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: 'var(--color-teal-900)',
    color: 'var(--color-white)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderRight: '1px solid rgba(255,255,255,0.1)'
  },
  brand: {
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.08)'
  },
  logoBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    backgroundColor: 'var(--color-amber-600)',
    color: 'var(--color-white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  brandName: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'var(--font-weight-bold)',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.5px'
  },
  adminTitle: {
    display: 'block',
    fontSize: '10px',
    color: 'var(--color-amber-100)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 'bold',
    marginTop: '-2px'
  },
  nav: {
    flex: 1,
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 'var(--font-weight-medium)',
    textDecoration: 'none',
    transition: 'all 0.15s ease'
  },
  linkText: {
    letterSpacing: '0.2px'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.08)'
  },
  storefrontBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'background-color 0.15s ease'
  }
};
