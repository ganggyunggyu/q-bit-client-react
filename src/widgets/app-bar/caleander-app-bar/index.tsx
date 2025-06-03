import React from 'react';

type CaleanderAppBarProps = {
  month: string;
  year: string;
};

export const CaleanderAppBar: React.FC<CaleanderAppBarProps> = ({
  year,
  month,
}) => {
  return (
    <header className="flex items-center justify-between w-full">
      <p className="text-title-sb text-black-alternative/50">{year}</p>
      <p className="text-title-sb">{month}</p>
    </header>
  );
};
