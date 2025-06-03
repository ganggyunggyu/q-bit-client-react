import { BellIcon } from '@/shared';

export const TitleBellAppBar = ({ title }) => {
  return (
    <header className="flex items-center justify-between w-full">
      <p className="text-title-sb">{title}</p>
      <button className="text-black-primary">
        <BellIcon />
      </button>
    </header>
  );
};
