import React, { Children, cloneElement, isValidElement } from 'react';

type enhanceChildElementProps<T> = {
  children: React.ReactNode;
  component: React.ComponentType<T>;
  newProps: Partial<T>;
};

const enhanceChildElement = <T>({
  children,
  component,
  newProps,
}: enhanceChildElementProps<T>) => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === component) {
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
