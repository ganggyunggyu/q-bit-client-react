import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const selectBoxVariants = cva(
  'w-full p-[--space-4] rounded-[--radius-md] font-body-m transition-all duration-[--transition-fast] active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-[--color-bg-primary] border border-[--color-divide] text-[--color-text-primary] hover:bg-[--color-bg-secondary]',
        selected:
          'bg-[--color-primary]/10 border border-[--color-primary] text-[--color-primary]',
        disabled:
          'bg-[--color-bg-secondary] border border-[--color-border-gray] text-[--color-text-disabled] cursor-not-allowed',
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
