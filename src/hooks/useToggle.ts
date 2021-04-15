import React from 'react';

export function useToggle(initialState = false) {
  const [value, setValue] = React.useState(initialState);

  const toggle = React.useCallback(() => setValue((state) => !state), []);

  return {value, toggle};
}
