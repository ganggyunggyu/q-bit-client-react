import {
  CaleanderAppBar,
  ColorVariants,
  SearchAppBar,
  TextVariants,
  TitleBackAppBar,
} from '@/widgets';
import { TitleAppBar, TitleBellAppBar } from '@/widgets';
import { Button, Chip, cn, SelectBox } from '@/shared';
import React from 'react';

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
        <Button variant="kakao">Kakao</Button>
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
        <h1 className="text-display-2">Chip</h1>
        <Chip variant="default">Chip</Chip>
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

      <section className="flex flex-col gap-3 bg-divide p-5">
        <h1 className="font-display-1">Check Box</h1>

        <CheckBox
          status="default"
          inputProps={{
            placeholder: 'default',
          }}
        />
        <CheckBox
          status="empty"
          inputProps={{
            placeholder: 'empty',
          }}
        />
        <CheckBox
          status="typing"
          inputProps={{
            placeholder: 'typing',
          }}
        />
        <CheckBox
          status="complate"
          inputProps={{
            placeholder: 'complate',
          }}
        />
      </section>
    </main>
  );
};
interface CheckBoxProps {
  status: 'default' | 'empty' | 'typing' | 'complate';
  onToggle?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  figureProps?: React.HTMLAttributes<HTMLElement>;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  status,
  inputProps,
  figureProps,
  onToggle,
}) => {
  const isComplate = status === 'complate';

  const handleCircleClick = () => {
    if (onToggle) onToggle();
  };

  return (
    <figure
      className={cn('flex gap-3 w-full', figureProps?.className)}
      {...figureProps}
    >
      <div
        onClick={handleCircleClick}
        className={cn(
          'w-6 h-6 rounded-full border border-white relative overflow-hidden flex items-center justify-center',
          isComplate && 'bg-transparent',
        )}
      >
        {isComplate && (
          <div className="absolute w-4 h-4 bg-blue-good rounded-full" />
        )}
      </div>
      <input
        className={cn(
          'flex-1',
          inputProps?.className,
          status === 'default' && '',
          status === 'empty' && '',
          status === 'typing' && '',
        )}
        {...inputProps}
      />
    </figure>
  );
};
