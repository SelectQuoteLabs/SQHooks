import {act, renderHook} from '@testing-library/react-hooks';
import {useClipboard} from '.';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

describe('useClipboard', () => {
  jest.spyOn(navigator.clipboard, 'writeText');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should copy a given value to clipboard', async () => {
    const {result} = renderHook(() => useClipboard('hello world'));
    await act(() => result.current.onClick());

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });
});
