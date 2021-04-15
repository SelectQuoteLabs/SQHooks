import React from 'react';

/**
 * This hook supports two types of use cases --
 * 1. const [storedValue, storeValue] = useIsomorphicLocalStorage(key, weKnowThisValueUpFrontAndWantToInitializeItInLocalStorage)
 * 2. const [storedValue, storeValue] = useIsomorphicLocalStorage(key) <-- no up front value known (need to create it on backend, etc)
 * @param {string} key
 * @param {string | number | function | object | array | undefined} initialValue
 * @returns [any, function]
 */
export function useIsomorphicLocalStorage<Type>(
  key: string,
  initialValue?: Type
): {
  storedValue: string;
  storeValue: React.Dispatch<React.SetStateAction<Type | undefined>>;
  isFetching: boolean;
} {
  if (!key) {
    throw new Error('useIsomorphicLocalStorage key must not be falsy');
  }

  const [storedValue, setStoredValue] = React.useState('hello');
  const [isFetching, setIsFetching] = React.useState(true);
  const storedStringValue =
    typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;

  const storeValue: React.Dispatch<
    React.SetStateAction<Type | undefined>
  > = React.useCallback(
    (value) => {
      // Allow value to be a function so we have same API as useState
      // see usehooks.com/useLocalStorage
      const valueToStore =
        value instanceof Function ? (value as Function)(storedValue) : value;

      // save new user token into local storage
      // fall back to empty string if `value` is nullish
      window.localStorage.setItem(key, JSON.stringify(valueToStore ?? ''));

      setStoredValue(valueToStore ?? '');
    },
    [key, storedValue]
  );

  React.useEffect(() => {
    // if this is running on the server, bail out... no localStorage there!
    if (typeof window === 'undefined') {
      return;
    }

    // if localStorage is null for that key, initialize it in localStorage and in local state here as the initialValue
    if (storedStringValue === null) {
      storeValue(initialValue);
      setIsFetching(false);
      return;
    }

    const parsedValue = JSON.parse(storedStringValue);

    // if localStorage value matches initialValue, we've either invoked the hook with the default initialValue OR we've already stored the initialValue
    if (parsedValue === initialValue) {
      setIsFetching(false);
      return;
    }

    // if there's a value in localStorage, sync local state with it
    setStoredValue(parsedValue);
    setIsFetching(false);
  }, [initialValue, storeValue, storedStringValue]);

  return {storedValue, storeValue, isFetching};
}
