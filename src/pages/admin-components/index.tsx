import React, { HTMLAttributes } from 'react';
import {
  CaleanderAppBar,
  ColorVariants,
  SearchAppBar,
  TextVariants,
  TitleBackAppBar,
} from '@/widgets';
import { TitleAppBar, TitleBellAppBar } from '@/widgets';
import { cva, VariantProps } from 'class-variance-authority';
import { Button, SelectBox } from '@/shared';

export const AdminComponents = () => {
  return (
    <main className="p-3 space-y-16 bg-[var(--bg-alternative)] min-h-screen pb-20">
      <TextVariants />
      <ColorVariants />

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">App Bar</h1>

        <TitleAppBar title={'Title'} />
        <TitleBellAppBar title={'Title'} />
        <TitleBackAppBar title={'Title'} />

        <CaleanderAppBar year="2012" month="05" />

        <SearchAppBar inputProps={{ placeholder: 'Search' }} />
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">Button M</h1>
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="normal">Normal</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="disabled">Disabled</Button>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">Button S</h1>
        <Button size="sm" variant="primary">
          Primary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="normal">
          Normal
        </Button>
        <Button size="sm" variant="warning">
          Warning
        </Button>
        <Button size="sm" variant="disabled">
          Disabled
        </Button>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">SelectBox</h1>
        <SelectBox children={'Default'} />
        <SelectBox children={'Selected'} variant="selected" />
        <SelectBox children={'Disabled'} variant="disabled" />
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">SelectBox Two Line</h1>
        <article className="grid grid-cols-2 gap-4 w-8/12">
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
            variant="selected"
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
            variant="selected"
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
            variant="disabled"
          />
        </article>
      </section>
    </main>
  );
};
