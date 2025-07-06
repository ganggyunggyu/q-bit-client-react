import { BackIcon, cn, useRouter } from '@/shared';
import React from 'react';

export interface TitleBackAppBarProps
  extends React.HTMLAttributes<HTMLHeadElement> {
  title: string;
  className?: string;
}

export const TitleBackAppBar: React.FC<TitleBackAppBarProps> = ({
  title,
  className,
  ...props
}) => {
  const { back } = useRouter();
  return (
    <header
      className={cn(
        'flex items-center justify-center w-full gap-2 pt-10',
        className,
      )}
      {...props}
    >
      <button onClick={back} className=" text-blue-good pl-0">
        <BackIcon />
      </button>

      <p className="flex-1 font-title-sb h-full">{title}</p>
    </header>
  );
};
