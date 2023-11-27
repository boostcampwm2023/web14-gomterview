import React, { Children, cloneElement, isValidElement } from 'react';

type EnhanceChildElementProps<T> = {
  children: React.ReactNode;
  component?: React.ComponentType<T>;
  newProps: Partial<T>;
};

const enhanceChildElement = <T>({
  children,
  component,
  newProps,
}: EnhanceChildElementProps<T>) => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && (!component || child.type === component)) {
      return cloneElement(
        child as React.ReactElement<T>,
        {
          ...child.props,
          ...newProps,
        } as Partial<T>
      );
    }
    return child;
  });
};

export default enhanceChildElement;
