import { FunctionParamsType } from '@/types/utils';
import { useCallback, useEffect, useRef } from 'react';

const useDebounce = <T extends (...args: FunctionParamsType<T>) => void>(
  func: T,
  wait: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  return useCallback(
    (...args: FunctionParamsType<T>) => {
      cleanup();
      timeoutRef.current = setTimeout(() => func(...args), wait);
    },
    [func, wait]
  );
};

export default useDebounce;
