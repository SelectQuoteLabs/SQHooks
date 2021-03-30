import {renderHook, act} from '@testing-library/react-hooks';
import {useDialog} from '.';

test('exposes the dialog open state and open/close functions', () => {
  const {result} = renderHook(useDialog);

  expect(result.current.isDialogOpen).toBe(false);

  act(() => result.current.openDialog());
  expect(result.current.isDialogOpen).toBe(true);

  act(() => result.current.closeDialog());
  expect(result.current.isDialogOpen).toBe(false);
});

test('allows initial state to be customized', () => {
  const {result} = renderHook(useDialog, {initialProps: true});

  expect(result.current.isDialogOpen).toBe(true);
});
