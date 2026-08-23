import React from 'react';

export default function Badge({ text, type = 'amber' }) {
  let style = {};
  
  switch(type) {
    case 'teal':
      style = {
        backgroundColor: 'var(--color-sage-100)',
        color: 'var(--color-teal-700)',
        border: '1px solid var(--color-teal-500)'
      };
      break;
    case 'danger':
      style = {
        backgroundColor: '#FADBD8',
        color: 'var(--color-danger)',
        border: '1px solid var(--color-danger)'
      };
      break;
    case 'success':
      style = {
        backgroundColor: '#D4EFDF',
        color: 'var(--color-teal-900)',
        border: '1px solid var(--color-teal-700)'
      };
      break;
    case 'amber':
    default:
      style = {
        backgroundColor: 'var(--color-amber-100)',
        color: 'var(--color-amber-600)',
        border: '1px solid var(--color-amber-600)'
      };
  }

  return (
    <span 
      className="text-mono" 
      style={{
        display: 'inline-flex',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 'var(--font-weight-semibold)',
        borderRadius: '2px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {text}
    </span>
  );
}
