import React from 'react';
import { cn } from '@/shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';

const buttonVariants = cva(
  'relative flex items-center justify-center rounded-full transition-colors cursor-pointer box-border transition-all min-w-fit disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-good text-white active:bg-black-primary ',
        outline:
          'bg-normal text-primary border border-primary active:bg-divide',
        disabled: 'bg-alternative text-disable border border-divide',
        warning: 'bg-urgent/10 text-urgent active:bg-urgent/20',
        normal:
          'bg-alt text-[#2E2F33]/88 border border-divide active:bg-divide',
        kakao: 'bg-[#FFE812]',
        shadow:
          'border border-white shadow-2xl bg-white focus:border-primary transition',
      },
      size: {
        xs: 'px-7 py-1 text-xs w-fit min-w-fit max-w-fit',
        sm: 'px-[16px] py-[8px] font-caption-m max-w-fit',
        md: 'px-[24px] py-[12px] font-body-m max-w-fit',
        lg: 'w-full text-lg py-2.5',
        round: 'w-12 h-12',
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
    VariantProps<typeof buttonVariants> {
  isSearch?: boolean; // ✅ 추가
}

export const Button = ({
  className,
  variant,
  size,
  children,
  isSearch,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isSearch && (
        <figure className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-primary p-1 rounded-full">
          <Search size={16} />
        </figure>
      )}
      {children}
    </button>
  );
};
