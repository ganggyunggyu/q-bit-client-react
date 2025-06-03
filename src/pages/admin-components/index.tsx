import {
  CaleanderAppBar,
  ColorVariants,
  SearchAppBar,
  TextVariants,
  TitleBackAppBar,
} from '@/widgets';
import { TitleAppBar, TitleBellAppBar } from '@/widgets';

export const AdminComponents = () => {
  return (
    <main className="p-3 space-y-16 bg-[var(--bg-alternative)] min-h-screen pb-20">
      <TextVariants />
      <ColorVariants />

      <section className="flex flex-col gap-3">
        <h1>App Bar</h1>

        <TitleAppBar title={'Title'} />
        <TitleBellAppBar title={'Title'} />
        <TitleBackAppBar title={'Title'} />

        <CaleanderAppBar year="2012" month="05" />

        <SearchAppBar inputProps={{ placeholder: 'Search' }} />
      </section>
    </main>
  );
};
