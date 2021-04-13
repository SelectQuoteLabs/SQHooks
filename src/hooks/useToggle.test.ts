import {act, renderHook} from '@testing-library/react-hooks';
import {useToggle} from '.';

const setup = (initialValue: boolean) => {
  return renderHook(() => useToggle(initialValue));
};

it('should initialize state to true', () => {
  const {result} = setup(true);
  const {isOn, toggle} = result.current;

  expect(isOn).toBe(true);
  expect(toggle).toBeInstanceOf(Function);
});

it('should initialize state to false', () => {
  const {result} = setup(false);
  const {isOn, toggle} = result.current;

  expect(isOn).toBe(false);
  expect(toggle).toBeInstanceOf(Function);
});

it('should toggle state to true from false', () => {
  const {result} = setup(false);
  const {isOn: isOnBefore, toggle} = result.current;
  expect(isOnBefore).toBe(false);

  act(() => toggle());

  const {isOn: isOnAfter} = result.current;
  expect(isOnAfter).toBe(true);
});

it('should toggle state to false from true', () => {
  const {result} = setup(true);
  const {isOn: isOnBefore, toggle} = result.current;
  expect(isOnBefore).toBe(true);

  act(() => toggle());

  const {isOn: isOnAfter} = result.current;
  expect(isOnAfter).toBe(false);
});
