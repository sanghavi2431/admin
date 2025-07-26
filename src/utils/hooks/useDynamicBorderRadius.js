import { useEffect, useRef, useState } from 'react';

const useDynamicBorderRadius = (isActive = true) => {
  const elementRef = useRef(null);
  const [borderRadius, setBorderRadius] = useState(0);

  const updateBorderRadius = () => {
    if (elementRef.current) {
      const { offsetWidth, offsetHeight } = elementRef.current;
      const newRadius = Math.min(offsetWidth, offsetHeight) / 5.7;
      setBorderRadius(newRadius);
    }
  };
  
  useEffect(() => {
    if (!isActive) return; // Skip calculation if dialog is closed

    // Initial calculation
    updateBorderRadius();

    // Observe for size changes
    const resizeObserver = new ResizeObserver(updateBorderRadius);
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isActive]); // Re-run when dialog opens

  return { elementRef, borderRadius, updateBorderRadius };
};

export default useDynamicBorderRadius;
