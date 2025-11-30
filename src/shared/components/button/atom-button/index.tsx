import React from 'react';
import { cn } from '@/shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-all duration-normal active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white font-semibold hover:brightness-[0.95] active:brightness-[0.9]',
        secondary:
          'bg-bg-secondary text-text-primary font-medium hover:bg-bg-tertiary',
        outline:
          'bg-primary/8 text-primary font-semibold hover:bg-primary/12',
        ghost:
          'bg-transparent text-text-secondary font-medium hover:bg-bg-secondary',
        danger:
          'bg-urgent/8 text-urgent font-semibold hover:bg-urgent/12',
        kakao:
          'bg-kakao text-[#191919] font-semibold hover:brightness-[0.95]',
      },
      size: {
        xs: 'h-8 px-3 text-[13px] rounded-xs',
        sm: 'h-9 px-4 text-[14px] rounded-sm',
        md: 'h-12 px-5 text-[15px] rounded-md',
        lg: 'h-14 px-6 text-[16px] rounded-lg w-full',
        icon: 'h-10 w-10 rounded-sm p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
