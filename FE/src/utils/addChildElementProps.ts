import React, { Children, cloneElement, isValidElement } from 'react';

type AddChildElementProps<T> = {
  children: React.ReactNode;
  newProps: Partial<T>;
};

const addChildElementProps = <T>({
  children,
  newProps,
}: AddChildElementProps<T>) => {
  return Children.map(
    children,
    (child: React.ReactNode) =>
      isValidElement(child) &&
      cloneElement(child, { ...child.props, ...newProps } as Partial<T>)
  );
};

export default addChildElementProps;
