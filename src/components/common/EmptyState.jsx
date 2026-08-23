import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = HelpCircle, 
  title = "No Items Found", 
  message = "We couldn't find what you were looking for. Please try again or check other sections.",
  actionLink, 
  actionText = "Go back to Home" 
}) {
  return (
    <div className="empty-state-container bg-mist apothecary-card" style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
      <div className="empty-state-icon-wrapper" style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'var(--color-sage-100)', color: 'var(--color-teal-700)', marginBottom: '20px' }}>
        <Icon size={40} />
      </div>
      <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title}</h3>
      <p style={{ color: 'var(--color-charcoal)', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>{message}</p>
      {actionLink && (
        <Link to={actionLink} className="btn btn-secondary">
          {actionText}
        </Link>
      )}
    </div>
  );
}
