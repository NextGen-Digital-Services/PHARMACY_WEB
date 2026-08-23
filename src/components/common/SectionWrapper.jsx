import React from 'react';

export default function SectionWrapper({ children, bg = 'mist', className = '', id }) {
  const bgClass = bg === 'sage' ? 'bg-sage' : (bg === 'teal-dark' ? 'bg-teal-dark' : 'bg-mist');

  return (
    <section 
      id={id} 
      className={`section-wrapper ${bgClass} ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}
