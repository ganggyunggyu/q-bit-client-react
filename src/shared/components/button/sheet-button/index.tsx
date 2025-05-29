import React from 'react';
import { Button, ButtonProps } from '../atom-button';

export type SheetButtonProps = ButtonProps & {
  // sheetType?: 'confirm' | 'cancel';
};

export const SheetButton: React.FC<SheetButtonProps> = ({
  children,
  ...props
}) => {
  return <Button {...props}>{children}</Button>;
};
