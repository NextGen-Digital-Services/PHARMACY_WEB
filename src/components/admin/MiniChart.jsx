import React from 'react';

export default function MiniChart() {
  // Sales data for past 7 days
  const data = [
    { day: "Mon", sales: 4800 },
    { day: "Tue", sales: 5900 },
    { day: "Wed", sales: 8100 },
    { day: "Thu", sales: 7400 },
    { day: "Fri", sales: 9800 },
    { day: "Sat", sales: 12400 },
    { day: "Sun", sales: 14100 }
  ];

  // SVG dimensions
  const width = 500;
  const height = 180;
  const padding = 30;

  // Chart coordinates math
  const maxSales = Math.max(...data.map(d => d.sales));
  const minSales = 0;
  
  const getX = (index) => {
    return padding + (index * (width - 2 * padding) / (data.length - 1));
  };

  const getY = (val) => {
    const scale = (val - minSales) / (maxSales - minSales);
    return height - padding - scale * (height - 2 * padding);
  };

  // Generate SVG path for polyline
  const points = data.map((d, i) => `${getX(i)},${getY(d.sales)}`).join(' ');

  return (
    <div className="apothecary-card" style={styles.card}>
      <h4 style={styles.title}>Weekly Sales Revenue (INR)</h4>
      <div style={styles.divider} />
      
      <div style={styles.chartWrapper}>
        <svg viewBox={`0 0 ${width} ${height}`} style={styles.svg}>
          {/* Grid lines */}
          <line x1={padding} y1={getY(3000)} x2={width - padding} y2={getY(3000)} stroke="var(--color-border)" strokeDasharray="4 4" />
          <line x1={padding} y1={getY(7000)} x2={width - padding} y2={getY(7000)} stroke="var(--color-border)" strokeDasharray="4 4" />
          <line x1={padding} y1={getY(11000)} x2={width - padding} y2={getY(11000)} stroke="var(--color-border)" strokeDasharray="4 4" />

          {/* Area under the line */}
          <path
            d={`M ${getX(0)} ${height - padding} 
                ${data.map((d, i) => `L ${getX(i)} ${getY(d.sales)}`).join(' ')} 
                L ${getX(data.length - 1)} ${height - padding} Z`}
            fill="var(--color-sage-100)"
            opacity="0.5"
          />

          {/* Trend Line */}
          <polyline
            fill="none"
            stroke="var(--color-teal-700)"
            strokeWidth="3"
            points={points}
          />

          {/* Data Nodes */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(d.sales)}
                r="5"
                fill="var(--color-white)"
                stroke="var(--color-amber-600)"
                strokeWidth="2.5"
              />
              {/* Tooltip price indicator */}
              <text
                x={getX(i)}
                y={getY(d.sales) - 10}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fontWeight="bold"
                fill="var(--color-ink)"
              >
                ₹{(d.sales / 1000).toFixed(1)}k
              </text>
              {/* Day label */}
              <text
                x={getX(i)}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-body)"
                fontWeight="var(--font-weight-medium)"
                fill="var(--color-charcoal)"
              >
                {d.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    width: '100%',
    height: '270px',
    '--notch-bg': 'var(--color-mist-50)'
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-ink)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '12px 0 16px'
  },
  chartWrapper: {
    width: '100%',
    height: '100%',
    maxHeight: '180px'
  },
  svg: {
    width: '100%',
    height: '100%',
    overflow: 'visible'
  }
};
