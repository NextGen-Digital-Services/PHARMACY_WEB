import { useState, useEffect } from 'react';

export default function useCounter(targetValue, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;
    const isFloat = String(targetValue).includes('.');
    const end = parseFloat(targetValue);
    if (isNaN(end)) return;

    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      
      const currentVal = progressRatio * end;
      setCount(isFloat ? parseFloat(currentVal.toFixed(1)) : Math.floor(currentVal));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration, trigger]);

  return count;
}
