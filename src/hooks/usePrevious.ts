import React from 'react';

export function usePrevious<Type>(
  value: Type,
  initialValue?: Type
): Type | undefined {
  const ref = React.useRef(initialValue);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
