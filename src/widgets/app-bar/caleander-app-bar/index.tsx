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
    <header className="flex items-center justify-between w-full p-4">
      <p className="font-title-sb text-black-alternative/50">{year}년</p>
      <p className="font-title-sb">{month}월</p>
    </header>
  );
};
