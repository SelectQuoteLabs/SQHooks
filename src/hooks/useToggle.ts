import React from 'react';

export function useToggle(initialState = false) {
  const [value, setIsOn] = React.useState(initialState);

  const toggle = React.useCallback(() => setIsOn((state) => !state), []);

  return {value, toggle};
}
