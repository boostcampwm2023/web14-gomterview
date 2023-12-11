import useWindowSize from './useWindowSize';
import { breakpoints } from '@styles/_breakpoints';

type Breakpoints = {
  [K in keyof typeof breakpoints]: string;
};

const parseBreakpoint = (value: string) => parseInt(value, 10);

const useBreakpoint = () => {
  const { width } = useWindowSize();

  const isDeviceBreakpoint = (breakpoint: keyof Breakpoints) => {
    return width < parseBreakpoint(breakpoints[breakpoint]);
  };

  return isDeviceBreakpoint;
};

export default useBreakpoint;
