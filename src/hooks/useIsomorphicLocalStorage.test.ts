import {act, renderHook} from '@testing-library/react-hooks';
import 'jest-localstorage-mock';
import {useIsomorphicLocalStorage} from '.';

describe('useIsomorphicLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should retrieve an existing item from localStorage', () => {
    const expectedResult = 'abc123';
    localStorage.setItem('ID', `"${expectedResult}"`);
    const {result} = renderHook(() => useIsomorphicLocalStorage('ID'));
    const {storedValue, isFetching} = result.current;

    expect(storedValue).toEqual(expectedResult);
    expect(isFetching).toBe(false);
  });

  it('should return initialValue if the provided localStorage key is empty and set that item to localStorage', () => {
    const expectedResult = 'abc123';
    const {result} = renderHook(() =>
      useIsomorphicLocalStorage('ID', expectedResult)
    );
    const {storedValue, isFetching} = result.current;

    expect(storedValue).toEqual(expectedResult);
    expect(localStorage.__STORE__.ID).toEqual(`"${expectedResult}"`);
    expect(isFetching).toBe(false);
  });

  it('should use existing value over initial state', () => {
    const expectedResult = 'abc123';
    localStorage.setItem('ID', `"${expectedResult}"`);
    const {result} = renderHook(() =>
      useIsomorphicLocalStorage('ID', 'def456')
    );
    const {storedValue, isFetching} = result.current;

    expect(storedValue).toEqual(expectedResult);
    expect(isFetching).toBe(false);
  });

  it('should not overwrite existing localStorage value with initialState', () => {
    const expectedResult = 'abc123';
    localStorage.setItem('ID', `"${expectedResult}"`);
    renderHook(() => useIsomorphicLocalStorage('ID', 'def456'));

    expect(localStorage.__STORE__.ID).toEqual(`"${expectedResult}"`);
  });

  it('immediately returns a newly set value', () => {
    const {result} = renderHook(() => {
      return useIsomorphicLocalStorage('ID', 'abc123');
    });
    const {storeValue} = result.current;

    act(() => storeValue('def456'));

    const {storedValue} = result.current;
    expect(storedValue).toEqual('def456');
  });

  it('properly updates localStorage value', () => {
    const {result} = renderHook(() =>
      useIsomorphicLocalStorage('ID', 'abc123')
    );
    const {storeValue} = result.current;

    act(() => storeValue('def456'));

    expect(localStorage.__STORE__.ID).toEqual('"def456"');
  });

  it('should return empty string if no initialValue is provided and the localStorage value is empty', () => {
    const {result} = renderHook(() => useIsomorphicLocalStorage('ID'));
    const {storedValue} = result.current;

    expect(storedValue).toEqual('');
  });

  it('sets localStorage value using function updater', () => {
    const {result} = renderHook(() => {
      return useIsomorphicLocalStorage<string>('user', 'firstName');
    });

    const {storeValue} = result.current;
    act(() => storeValue((state) => state && state + 'lastName'));

    const {storedValue} = result.current;
    expect(storedValue).toEqual('firstNamelastName');
  });

  it('throws on null or undefined keys', () => {
    const {result} = renderHook(() => useIsomorphicLocalStorage(null as any));
    let errorResult: string;

    try {
      (() => {
        return result.current;
      })();
      throw Error();
    } catch (error) {
      errorResult = String(error);
    }

    expect(errorResult).toMatch(/key must not be falsy/);
  });
});
