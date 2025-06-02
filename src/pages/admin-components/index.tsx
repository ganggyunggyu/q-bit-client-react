import { BackButton, BellIcon, Input } from '@/shared';
import { ColorVariants, TextVariants } from '@/widgets';

export const TitleBackAppBar = () => {
  return (
    <header className="flex items-center justify-center w-full">
      <BackButton className="relative top-0 left-0 text-blue-good pr-0" />
      <p className="flex-1 text-title-sb">Title</p>
    </header>
  );
};

export const TitleAppBar = () => {
  return (
    <header className="flex items-center justify-center w-full">
      <p className="flex-1 text-title-sb">Title</p>
    </header>
  );
};
export const TitleBellAppBar = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <p className="text-title-sb">Title</p>
      <button className="text-black-primary">
        <BellIcon />
      </button>
    </header>
  );
};
export const SearchAppBar = () => {
  return (
    <header className="flex items-cetner justify-center w-full">
      <BackButton className="relative top-0 left-0 text-blue-good pr-0" />
      <Input placeholder="Search" />
    </header>
  );
};
export const CaleanderAppBar = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <p className="text-title-sb text-black-alternative/50">Year</p>
      <p className="text-title-sb">Month</p>
    </header>
  );
};

export const AdminComponents = () => {
  return (
    <main className="p-3 space-y-16 bg-[var(--bg-alternative)] min-h-screen pb-20">
      <TextVariants />
      <ColorVariants />

      <section className="flex flex-col gap-3">
        <h1>App Bar</h1>
      </section>
    </main>
  );
};
