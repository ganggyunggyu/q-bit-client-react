import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const selectBoxVariants = cva(
  'w-full p-[16px] rounded-2xl text-body-m transition-all',
  {
    variants: {
      variant: {
        default:
          ' bg-white border border-divide text-black-normal active:bg-divide',
        selected:
          'bg-bg-primary border border-primary text-primary active:bg-primary/50',
        disabled: ' bg-white border border-black-assistive text-black-disabled',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface SelectBoxProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectBoxVariants> {
  children: string | React.ReactNode;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  variant,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(selectBoxVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
