import {act, renderHook} from '@testing-library/react-hooks';
import {useToggle} from '.';

const setupRenderHook = (initialValue: boolean) => {
  return renderHook(() => useToggle(initialValue));
};

it('should initialize state to true', () => {
  const {result} = setupRenderHook(true);
  const {value, toggle} = result.current;

  expect(value).toBe(true);
  expect(toggle).toBeInstanceOf(Function);
});

it('should initialize state to false', () => {
  const {result} = setupRenderHook(false);
  const {value, toggle} = result.current;

  expect(value).toBe(false);
  expect(toggle).toBeInstanceOf(Function);
});

it('should toggle state to true from false', () => {
  const {result} = setupRenderHook(false);
  const {value: valueBefore, toggle} = result.current;
  expect(valueBefore).toBe(false);

  act(() => toggle());

  const {value: valueAfter} = result.current;
  expect(valueAfter).toBe(true);
});

it('should toggle state to false from true', () => {
  const {result} = setupRenderHook(true);
  const {value: valueBefore, toggle} = result.current;
  expect(valueBefore).toBe(true);

  act(() => toggle());

  const {value: valueAfter} = result.current;
  expect(valueAfter).toBe(false);
});
