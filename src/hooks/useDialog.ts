import React from 'react';

export function useDialog(isOpen = false) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(isOpen);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return {isDialogOpen, openDialog, closeDialog};
}
