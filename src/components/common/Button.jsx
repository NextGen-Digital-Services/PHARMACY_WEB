import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  loading = false, 
  type = 'button',
  className = '',
  ...props
}) {
  const variantClass = variant === 'secondary' ? 'btn-secondary' : (variant === 'outline' ? 'btn-outline' : 'btn-primary');
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${variantClass} ${sizeClass} ${isDisabled ? 'btn-disabled' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-loader" style={styles.spinner} />
          <span>Processing...</span>
        </>
      ) : children}
    </button>
  );
}

const styles = {
  spinner: {
    width: '14px',
    height: '14px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid currentColor',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.6s linear infinite',
    marginRight: '6px'
  }
};
