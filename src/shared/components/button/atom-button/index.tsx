import { cn } from '@/shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'flex items-center justify-center rounded-full transition-colors cursor-pointer box-border transition-all min-w-fit disabled:pointer-events-none',

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
