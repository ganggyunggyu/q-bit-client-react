import { BackButton } from '@/shared';

export const TitleBackAppBar = ({ title }) => {
  return (
    <header className="flex items-center justify-center w-full">
      <BackButton className="relative top-0 left-0 text-blue-good pr-0" />
      <p className="flex-1 text-title-sb">{title}</p>
    </header>
  );
};
