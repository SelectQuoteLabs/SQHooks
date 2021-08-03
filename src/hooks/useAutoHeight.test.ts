import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks';
import {useAutoHeight} from '.';

describe('useAutoHeight', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should consume the reference properly', async () => {
    const mockSetState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([undefined, mockSetState]);

    const {result} = renderHook(useAutoHeight);

    const autoHeightDiv = document.createElement('div');

    act(() => {
      result.current.containerRef(autoHeightDiv as HTMLElement);
    });

    expect(mockSetState).toHaveBeenCalledWith(autoHeightDiv);
  });

  it('should calculate height properly', async () => {
    const styles = {
      parentHeight: 500,
      parentPaddingBottom: '8px',
      siblingHeight: 100,
    };

    const {result} = renderHook(useAutoHeight);

    const container = document.createElement('div');
    const sibling = document.createElement('div');
    const autoHeightDiv = document.createElement('div');
    container.appendChild(sibling);
    container.appendChild(autoHeightDiv);

    jest
      .spyOn(container, 'clientHeight', 'get')
      .mockImplementation(() => styles.parentHeight);
    jest
      .spyOn(container as HTMLElement, 'style', 'get')
      .mockImplementation(
        () => ({paddingBottom: styles.parentPaddingBottom} as any)
      );

    jest
      .spyOn(sibling, 'clientHeight', 'get')
      .mockImplementation(() => styles.siblingHeight);

    jest.spyOn(autoHeightDiv, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          top: styles.siblingHeight,
        } as any)
    );

    act(() => {
      result.current.containerRef(autoHeightDiv as HTMLElement);
    });

    expect(result.current.autoHeight).toEqual(
      `min(calc(100vh - ${styles.siblingHeight}px - 24px), calc(${styles.parentHeight}px - ${styles.siblingHeight}px - ${styles.parentPaddingBottom}))`
    );
  });
});
