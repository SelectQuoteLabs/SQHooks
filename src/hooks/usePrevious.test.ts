import {renderHook} from '@testing-library/react-hooks';
import {usePrevious} from '.';

const setup = ({initialValue}: {initialValue?: any} = {}) => {
  return renderHook(({state}) => usePrevious(state, initialValue), {
    initialProps: {state: 0},
  });
};

test('should return undefined on initial render if no initialValue provided', () => {
  const {result} = setup();

  expect(result.current).toBeUndefined();
});

test('should return initialValue, if provided, on initial render', () => {
  const {result} = setup({initialValue: 'test'});

  expect(result.current).toBe('test');
});

test('should return previous state after each update', () => {
  const {result, rerender} = setup();

  rerender({state: 3});
  expect(result.current).toBe(0);

  rerender({state: 6});
  expect(result.current).toBe(3);

  rerender({state: 9});
  expect(result.current).toBe(6);
});
