import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating, size = 14, max = 5 }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= max; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star 
          key={i} 
          size={size} 
          fill="var(--color-amber-600)" 
          stroke="var(--color-amber-600)" 
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <StarHalf 
          key={i} 
          size={size} 
          fill="var(--color-amber-600)" 
          stroke="var(--color-amber-600)" 
        />
      );
    } else {
      stars.push(
        <Star 
          key={i} 
          size={size} 
          fill="transparent" 
          stroke="var(--color-border)" 
        />
      );
    }
  }

  return (
    <div style={styles.container}>
      {stars}
    </div>
  );
}

const styles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px'
  }
};
