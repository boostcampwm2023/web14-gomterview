import { useEffect, useRef, useState } from 'react';

const useThrottleScroll = (delay: number, top: number): number => {
  const [scrollPosition, setScrollPosition] = useState(top);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!throttleTimeout.current) {
        throttleTimeout.current = setTimeout(() => {
          requestRef.current = requestAnimationFrame(() => {
            setScrollPosition(top + window.scrollY);
          });
          throttleTimeout.current = null;
        }, delay);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [delay, top]);

  return scrollPosition;
};

export default useThrottleScroll;
