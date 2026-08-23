import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all medical profile fields.');
      return;
    }

    setLoading(true);

    // Simulate database signup delay
    setTimeout(() => {
      const res = register(name, email, password);
      setLoading(false);
      if (res.success) {
        navigate('/account');
      } else {
        setError('Registration failed. Try again.');
      }
    }, 800);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Register Patient Profile</h2>
        <p style={styles.subtitle}>Create your VitaDerm account for quick order dispatch.</p>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Jane Doe"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="jane.doe@example.com"
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
            placeholder="Minimum 6 characters"
            minLength="6"
            required
          />
        </div>

        <Button 
          type="submit" 
          variant="secondary" 
          loading={loading}
          style={styles.submitBtn}
        >
          <UserPlus size={16} />
          <span>Register Account</span>
        </Button>
      </form>

      <div style={styles.footer}>
        <span>Already have a profile? </span>
        <Link to="/login" style={styles.link}>Sign in here</Link>
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
