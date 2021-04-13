import {renderHook, act} from '@testing-library/react-hooks';
import 'jest-localstorage-mock';

import {useLocalStorage} from '.';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should retrieve an existing item from localStorage', () => {
    const expectedResult = 'abc123';
    localStorage.setItem('ID', `"${expectedResult}"`);
    const {result} = renderHook(() => useLocalStorage('ID'));
    const {storedValue} = result.current;

    expect(storedValue).toEqual(expectedResult);
  });

  it('should return initialValue if the provided localStorage key is empty and set that item to localStorage', () => {
    const expectedResult = 'abc123';
    const {result} = renderHook(() => useLocalStorage('ID', expectedResult));
    const {storedValue} = result.current;

    expect(storedValue).toEqual(expectedResult);
    expect(localStorage.__STORE__.ID).toEqual(`"${expectedResult}"`);
  });

  it('should use existing value over initial state', () => {
    const expectedResult = 'abc123';
    localStorage.setItem('ID', `"${expectedResult}"`);
    const {result} = renderHook(() => useLocalStorage('ID', 'def456'));
    const {storedValue} = result.current;

    expect(storedValue).toEqual(expectedResult);
  });

  it('should not overwrite existing localStorage value with initialState', () => {
    const expectedResult = 'abc123';
    localStorage.setItem('ID', `"${expectedResult}"`);
    renderHook(() => useLocalStorage('ID', 'def456'));

    expect(localStorage.__STORE__.ID).toEqual(`"${expectedResult}"`);
  });

  it('immediately returns a newly set value', () => {
    const {result} = renderHook(() => useLocalStorage('ID', 'abc123'));
    const {setValue} = result.current;

    act(() => setValue('def456'));

    const {storedValue} = result.current;
    expect(storedValue).toEqual('def456');
  });

  it('properly updates localStorage value', () => {
    const {result} = renderHook(() => useLocalStorage('ID', 'abc123'));
    const {setValue} = result.current;

    act(() => setValue('def456'));

    expect(localStorage.__STORE__.ID).toEqual('"def456"');
  });

  it('should return `undefined` if no initialValue is provided and the localStorage value is empty', () => {
    const {result} = renderHook(() => useLocalStorage('ID'));
    const {storedValue} = result.current;
    expect(storedValue).toBeUndefined();
  });

  it('returns and allows setting `null` value', () => {
    localStorage.setItem('ID', 'null');
    const {result} = renderHook(() => useLocalStorage('ID'));
    const {storedValue, setValue} = result.current;

    act(() => setValue(null));
    const {storedValue: valueSetToNullByHook} = result.current;

    expect(storedValue).toBeNull();
    expect(valueSetToNullByHook).toBeNull();
  });

  it('sets initial localStorage value if initialValue is an object', () => {
    const expectedResult = {ID: 'abc123'};
    renderHook(() => useLocalStorage('user', expectedResult));

    expect(localStorage.__STORE__.user).toEqual(JSON.stringify(expectedResult));
  });

  it('parses objects from localStorage', () => {
    localStorage.setItem('user', JSON.stringify({enabled: true}));
    const {result} = renderHook(() =>
      useLocalStorage<{enabled: boolean}>('user')
    );
    const {storedValue} = result.current;

    expect(storedValue?.enabled).toEqual(true);
  });

  it('properly initializes objects to localStorage', () => {
    const {result} = renderHook(() => useLocalStorage('user', {enabled: true}));
    const {storedValue} = result.current;

    expect(storedValue?.enabled).toEqual(true);
  });

  it('properly sets objects to localStorage', () => {
    const {result} = renderHook(() => useLocalStorage('user', {enabled: true}));

    const {setValue} = result.current;
    act(() => setValue({enabled: false}));

    const {storedValue} = result.current;
    expect(storedValue).toBeInstanceOf(Object);
    expect(storedValue?.enabled).toEqual(false);
  });

  it('sets localStorage value using function updater', () => {
    const {result} = renderHook(() => {
      return useLocalStorage<{firstName: string; lastName?: string}>('user', {
        firstName: 'Jane',
      });
    });

    const {setValue} = result.current;
    act(() => setValue((state) => state && {...state, lastName: 'Doe'}));

    const {storedValue} = result.current;
    expect(storedValue?.firstName).toEqual('Jane');
    expect(storedValue?.lastName).toEqual('Doe');
  });

  it('throws on null or undefined keys', () => {
    const {result} = renderHook(() => useLocalStorage(null as any));
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
