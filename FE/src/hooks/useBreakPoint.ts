import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';
import { breakpoints } from '@styles/_breakpoints';

const useBreakpoint = () => {
  const { width } = useWindowSize();
  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    switch (true) {
      case width < Number(breakpoints.mobileS):
        setBreakpoint('mobileXS');
        break;
      case width < Number(breakpoints.mobileM):
        setBreakpoint('mobileS');
        break;
      case width < Number(breakpoints.mobileL):
        setBreakpoint('mobileM');
        break;
      case width < Number(breakpoints.tablet):
        setBreakpoint('mobileL');
        break;
      case width < Number(breakpoints.laptop):
        setBreakpoint('tablet');
        break;
      case width < Number(breakpoints.laptopL):
        setBreakpoint('laptop');
        break;
      default:
        setBreakpoint('laptopL');
        break;
    }
  }, [width]);

  return breakpoint;
};

export default useBreakpoint;
