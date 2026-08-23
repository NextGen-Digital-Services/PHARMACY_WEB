import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { Lock, HelpCircle } from 'lucide-react';

export default function AdminLogin() {
  const { login, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@vitaderm.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already admin, redirect to admin dashboard
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      
      if (result.success && result.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Access Denied. Admin credentials required.');
      }
    }, 800);
  };

  return (
    <div style={styles.outer}>
      <div className="apothecary-card" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <Lock size={20} color="var(--color-white)" />
          </div>
          <h2 style={styles.title}>Admin Control Portal</h2>
          <p style={styles.subtitle}>Enter credentials to access catalogue and fulfillment logs.</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input text-mono"
              placeholder="admin@vitaderm.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input text-mono"
              placeholder="••••••••"
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="secondary" 
            loading={loading}
            style={styles.submitBtn}
          >
            Authorize Admin Console
          </Button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="prescription-tag" style={styles.helperBox}>
          <div style={styles.helperHeader}>
            <HelpCircle size={14} color="var(--color-amber-600)" />
            <strong style={{ color: 'var(--color-amber-600)' }}>Admin Demo Login:</strong>
          </div>
          <div style={styles.helperBody}>
            <span>Email: <code style={styles.code}>admin@vitaderm.com</code></span><br />
            <span>Password: <code style={styles.code}>admin123</code></span>
          </div>
        </div>

        <div style={styles.footer}>
          <Link to="/" style={styles.storeLink}>← Back to Storefront</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'var(--color-mist-50)',
    padding: '24px'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '36px 30px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px'
  },
  iconCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-teal-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    color: 'var(--color-ink)',
    marginBottom: '6px'
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.4
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  submitBtn: {
    width: '100%',
    marginTop: '12px'
  },
  errorBox: {
    backgroundColor: '#FADBD8',
    color: 'var(--color-danger)',
    border: '1px solid var(--color-danger)',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  helperBox: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'var(--color-amber-100)',
    borderColor: 'var(--color-amber-600)',
    padding: '12px 14px',
    borderRadius: 'var(--radius-sm)',
    width: '100%',
    gap: '4px',
    fontSize: '12px'
  },
  helperHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  helperBody: {
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    marginTop: '2px'
  },
  code: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: '1px 3px',
    borderRadius: '2px',
    fontWeight: 'bold',
    fontFamily: 'var(--font-mono)'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  storeLink: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    textDecoration: 'none',
    opacity: 0.8
  }
};
import { Link } from 'react-router-dom';
