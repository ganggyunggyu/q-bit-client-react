import { BackButton, cn } from '@/shared';
import React from 'react';

export interface TitleBackAppBarProps
  extends React.HTMLAttributes<HTMLHeadElement> {
  title: string;
  className: string;
}

export const TitleBackAppBar: React.FC<TitleBackAppBarProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <header
      className={cn('flex items-center justify-center w-full gap-1', className)}
      {...props}
    >
      <BackButton className="relative top-0 left-0 text-blue-good pl-0" />
      <p className="flex-1 font-title-sb h-full pt-1">{title}</p>
    </header>
  );
};
