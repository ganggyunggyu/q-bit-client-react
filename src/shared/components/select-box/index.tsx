import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const selectBoxVariants = cva('w-full h-[58px] p-[16px] rounded-2xl', {
  variants: {
    variant: {
      default:
        ' bg-white border border-divide text-black-normal active:bg-divide',
      selected:
        ' bg-bg-primary border border-primary text-primary active:bg-primary/50',
      disabled: ' bg-white border border-black-assistive text-black-disabled',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface SelectBoxProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectBoxVariants> {
  chileren: string | React.ReactNode;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  variant,
  className,
  chileren,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(selectBoxVariants({ variant, className }))}
      {...props}
    >
      {chileren}
    </button>
  );
};
