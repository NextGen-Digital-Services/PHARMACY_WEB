import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { LogIn, Key, HelpCircle } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo@vitaderm.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, go to account page
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate clinical validation network check
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      
      if (result.success) {
        if (result.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/account');
        }
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Patient Sign In</h2>
        <p style={styles.subtitle}>Access your medical profile & tracking logs.</p>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="demo@vitaderm.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Account Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
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
          <LogIn size={16} />
          <span>Authenticate Session</span>
        </Button>
      </form>

      {/* Demo Credentials Helper Box */}
      <div className="prescription-tag" style={styles.helperBox}>
        <div style={styles.helperHeader}>
          <HelpCircle size={16} color="var(--color-amber-600)" />
          <strong style={{ color: 'var(--color-amber-600)' }}>Demo Credentials:</strong>
        </div>
        <div style={styles.helperBody}>
          <span style={{ display: 'block' }}>Email: <code className="text-mono" style={styles.code}>demo@vitaderm.com</code></span>
          <span style={{ display: 'block' }}>Password: <code className="text-mono" style={styles.code}>demo123</code></span>
        </div>
      </div>

      <div style={styles.footer}>
        <span>New patient? </span>
        <Link to="/register" style={styles.link}>Create profile here</Link>
      </div>

      <div style={{ ...styles.footer, marginTop: '8px' }}>
        <Link to="/" style={styles.backLink}>← Return to Storefront</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%'
  },
  header: {
    marginBottom: '24px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    color: 'var(--color-ink)',
    marginBottom: '6px'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-charcoal)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  submitBtn: {
    width: '100%',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  errorBox: {
    backgroundColor: '#FADBD8',
    color: 'var(--color-danger)',
    border: '1px solid var(--color-danger)',
    padding: '12px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    marginBottom: '20px',
    fontWeight: 'var(--font-weight-medium)'
  },
  helperBox: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'var(--color-amber-100)',
    borderColor: 'var(--color-amber-600)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    width: '100%',
    gap: '6px'
  },
  helperHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px'
  },
  helperBody: {
    fontSize: '11px',
    color: 'var(--color-charcoal)'
  },
  code: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: '1px 4px',
    borderRadius: '2px',
    fontWeight: 'bold'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '13px',
    color: 'var(--color-charcoal)'
  },
  link: {
    color: 'var(--color-teal-700)',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  backLink: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    opacity: 0.8
  }
};
