import { XIcon } from '@/shared/icons';
import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const chipVariants = cva(
  'px-[--space-4] py-[--space-2] flex gap-[--space-2] items-center justify-center font-caption-m max-w-fit rounded-full transition-all duration-[--transition-fast] active:scale-[0.97]',
  {
    variants: {
      variant: {
        default:
          'bg-[--color-bg-secondary] text-[--color-text-secondary] hover:bg-[--color-bg-tertiary]',
        primary:
          'bg-[--color-primary]/10 text-[--color-primary] hover:bg-[--color-primary]/15',
        accent:
          'bg-[--color-accent]/10 text-[--color-text-primary] hover:bg-[--color-accent]/15',
        outline:
          'bg-transparent border border-[--color-border-gray] text-[--color-text-secondary] hover:bg-[--color-bg-secondary]',
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
