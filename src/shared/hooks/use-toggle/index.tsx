import React from 'react';

export const useToggle = (firstState: boolean) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(firstState);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
