import React from 'react';

export function useClipboard(contentToCopy?: string) {
  const clickTargetRef = React.useRef<HTMLElement>(null);

  const writeContentToClipboard = async () => {
    await navigator.clipboard.writeText(
      contentToCopy || clickTargetRef.current?.innerText || ''
    );
  };

  return {onClick: writeContentToClipboard, ref: clickTargetRef};
}
