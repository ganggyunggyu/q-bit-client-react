import { XIcon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const chipVariants = cva(
  'px-[16px] py-[8px] flex gap-2 items-center justify-center font-caption-m max-w-fit rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-alternative active:bg-bg-primary border border-divide',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ChipProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  children: React.ReactNode | string;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(chipVariants({ variant }), className)}
      {...props}
    >
      {children}
      <XIcon />
    </button>
  );
};
