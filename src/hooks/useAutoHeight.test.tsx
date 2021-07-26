import React from 'react';
import {render} from '@testing-library/react';
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

    const {container} = render(
      <div id="container">
        <div id="sibling" />
        <div id="autoHeightDiv" />
      </div>
    );

    const autoHeightDiv = container.querySelector('[id="autoHeightDiv"]');

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

    const {container} = render(
      <div id="container">
        <div id="sibling" />
        <div id="autoHeightDiv" />
      </div>
    );

    const divContainer = container.querySelector('[id="container"]');
    jest
      .spyOn(divContainer, 'clientHeight', 'get')
      .mockImplementation(() => styles.parentHeight);

    jest
      .spyOn(divContainer as HTMLElement, 'style', 'get')
      .mockImplementation(
        () => ({paddingBottom: styles.parentPaddingBottom} as any)
      );

    const sibling = container.querySelector('[id="sibling"]');
    jest
      .spyOn(sibling, 'clientHeight', 'get')
      .mockImplementation(() => styles.siblingHeight);

    const autoHeightDiv = container.querySelector('[id="autoHeightDiv"]');
    jest
      .spyOn(autoHeightDiv, 'getBoundingClientRect')
      .mockImplementation(() => ({
        ...defaultBoundingClientRect,
        top: styles.siblingHeight,
      }));

    act(() => {
      result.current.containerRef(autoHeightDiv as HTMLElement);
    });

    expect(result.current.autoHeight).toEqual(
      `min(calc(100vh - ${styles.siblingHeight}px - 24px), calc(${styles.parentHeight}px - ${styles.siblingHeight}px - ${styles.parentPaddingBottom}))`
    );
  });
});

const defaultBoundingClientRect = {
  top: 0,
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  toJSON: jest.fn(),
};
