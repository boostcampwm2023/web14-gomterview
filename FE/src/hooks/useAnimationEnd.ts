import { RefObject, useEffect } from 'react';

const useAnimationEnd = (
  nodeRef: RefObject<HTMLElement>,
  onEndCallback: () => void,
  deps: unknown[] = []
) => {
  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      node.addEventListener('animationend', onEndCallback);

      return () => {
        node.removeEventListener('animationend', onEndCallback);
      };
    }
  }, [nodeRef, onEndCallback, ...deps]);
};

export default useAnimationEnd;
