import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';
import { breakpoints } from '@styles/_breakpoints';

const parseBreakpoint = (value: string) => parseInt(value, 10);

const useBreakpoint = () => {
  const { width } = useWindowSize();
  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    switch (true) {
      case width < parseBreakpoint(breakpoints.mobileS):
        setBreakpoint('mobileXS');
        break;
      case width < parseBreakpoint(breakpoints.mobileM):
        setBreakpoint('mobileS');
        break;
      case width < parseBreakpoint(breakpoints.mobileL):
        setBreakpoint('mobileM');
        break;
      case width < parseBreakpoint(breakpoints.tablet):
        setBreakpoint('mobileL');
        break;
      case width < parseBreakpoint(breakpoints.laptop):
        setBreakpoint('tablet');
        break;
      case width < parseBreakpoint(breakpoints.laptopL):
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
