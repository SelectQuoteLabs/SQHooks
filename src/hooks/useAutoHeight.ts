import React from 'react';

interface useAutoHeightReturn {
  autoHeight: string | undefined;
  containerRef: (node: HTMLDivElement) => void;
}
export function useAutoHeight(): useAutoHeightReturn {
  const [containerRef, setContainerRef] = React.useState<
    HTMLDivElement | undefined
  >();
  const refCallback = (node: HTMLDivElement) => {
    setContainerRef(node);
  };

  const autoHeight = React.useMemo(() => {
    if (!containerRef) {
      return;
    }

    const topOffset = containerRef.getBoundingClientRect().top;
    const offsetBasedHeight = `calc(100vh - ${topOffset}px - 24px)`;

    const parentHeight = containerRef.parentElement?.clientHeight;
    const parentPadding =
      containerRef?.parentElement?.style.paddingBottom || '0px';
    const parentTopOffset =
      containerRef.parentElement?.getBoundingClientRect().top ?? 0;
    const topDifferential = topOffset - parentTopOffset;
    const maxOffsetBasedHeight = `calc(${parentHeight}px - ${topDifferential}px - ${parentPadding})`;

    const calculatedHeight = `min(${offsetBasedHeight}, ${maxOffsetBasedHeight})`;

    return calculatedHeight;
  }, [containerRef]);

  return {containerRef: refCallback, autoHeight};
}
