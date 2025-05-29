import { cn } from '@/shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  `
  items-center justify-center rounded-lg transition-colors cursor-pointer box-border transition-all min-w-fit
  disabled:opacity-50 disabled:pointer-events-none 
  hover:scale-[101%] active:scale-[98%] active:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-back hover:bg-primary-dark text-white',
        primaryTrans: 'bg-primary-transparent text-primary',
        secondary: 'bg-secondary text-black-normal hover:bg-[#e0e0e0]',
        outlineAlt:
          'border border-secondary bg-normal hover:bg-primary-transparent hover:text-primary',
        outlinePrimary:
          'border border-primary text-primary hover:bg-primary-transparent hover:text-primary',
        outlineBgPrimary1:
          'border border-primary text-primary bg-[#FFCCC8] hover:bg-primary hover:text-back',
        outlineBgPrimary2:
          'border border-primary text-primary bg-[#F9E0DD] hover:bg-primary hover:text-back',
        ghost:
          'bg-transparent hover:bg-black-assist/10 text-black-normal opacity-80 border border-alt',
        muted: 'bg-primary-light text-white hover:bg-[#bb7269]',
        kakao: 'bg-[#FFE812] border border-alt text-black-normal',
        bgNone: 'bg-normal text-black-normal',
        round: 'rounded-full p-3 bg-normal text-black-normal border border-alt',
        white: 'bg-back text-black-normal',
        sub: 'bg-sub text-white',
      },
      size: {
        xs: 'px-7 py-1 text-xs w-fit min-w-fit',
        sm: 'px-4 py-2 text-md w-[60px] h-[40px]',
        md: 'px-5 py-3 text-base w-[68px] h-[48px] min-w-fit',
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
