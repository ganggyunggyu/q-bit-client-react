import { BellIcon } from '@/shared';
import { Bell } from 'lucide-react';

export const TitleBellAppBar = ({ title }) => {
  return (
    <header className="flex items-center justify-between w-full px-2">
      <p className="font-title-sb text-primary">{title}</p>
      <button className="text-black-primary">
        <Bell className="fill-primary text-primary" />
      </button>
    </header>
  );
};
