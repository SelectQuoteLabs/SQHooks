import React from 'react';

export function useLocalStorage<Type>(
  key: string,
  initialValue?: Type
): {
  storedValue: Type | undefined;
  setValue: React.Dispatch<React.SetStateAction<Type | undefined>>;
} {
  if (!key) {
    throw new Error('useLocalStorage key must not be falsy');
  }

  const [storedValue, setStoredValue] = React.useState<Type | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        return JSON.parse(item);
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  const setValue: React.Dispatch<
    React.SetStateAction<Type | undefined>
  > = React.useCallback(
    (value) => {
      try {
        const valueToStore =
          typeof value === 'function'
            ? (value as Function)(storedValue)
            : value;

        if (typeof valueToStore === 'undefined') {
          return;
        }

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setStoredValue(valueToStore);
      } catch {}
    },
    [key, storedValue]
  );

  return {storedValue, setValue};
}
