import React from 'react';

export function useToggle(initialState = false) {
  const [isOn, setIsOn] = React.useState(initialState);

  const toggle = React.useCallback(() => setIsOn((state) => !state), []);

  return {isOn, toggle};
}
