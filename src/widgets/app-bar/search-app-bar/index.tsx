import { BackButton, Input, InputProps } from '@/shared';
import React from 'react';

type SearchAppBarProps = {
  inputProps?: InputProps;
};

export const SearchAppBar: React.FC<SearchAppBarProps> = ({ inputProps }) => {
  return (
    <header className="flex items-center justify-center w-full">
      <BackButton className="relative top-0 left-0 text-blue-good pr-0" />
      <Input {...inputProps} className="" />
    </header>
  );
};
