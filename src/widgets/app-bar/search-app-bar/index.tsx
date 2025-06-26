import { BackButton, cn, Input, InputProps } from '@/shared';
import React from 'react';

interface SearchAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  inputProps?: InputProps;
}

export const SearchAppBar: React.FC<SearchAppBarProps> = ({
  inputProps,
  className,
  ...props
}) => {
  return (
    <header
      className={cn(
        `flex items-center justify gap-3 -center w-full bg-normal pt-10 ${className}`,
      )}
      {...props}
    >
      <BackButton className="relative top-0 left-0 text-blue-good" />
      <Input {...inputProps} className="" />
    </header>
  );
};
