import React, { InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';
import { Search, ChevronRight } from 'lucide-react';

const inputVariants = cva(
  'w-full px-4 text-[15px] text-text-primary placeholder:text-text-tertiary transition-all duration-normal disabled:opacity-40 disabled:cursor-not-allowed outline-none',
  {
    variants: {
      variant: {
        filled:
          'bg-bg-secondary rounded-md border-2 border-transparent focus:bg-bg-primary focus:border-primary',
        outlined:
          'bg-bg-primary rounded-md border border-border-gray focus:border-primary',
        underline:
          'bg-transparent border-b border-border-gray rounded-none px-0 focus:border-primary',
        error:
          'bg-urgent/5 rounded-md border-2 border-urgent',
      },
      inputSize: {
        sm: 'h-11 text-[14px]',
        md: 'h-13 text-[15px]',
        lg: 'h-14 text-[16px]',
      },
    },
    defaultVariants: {
      variant: 'filled',
      inputSize: 'md',
    },
  },
);

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    alertMessage?: string;
    helperMessage?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      alertMessage,
      helperMessage,
      className,
      variant,
      inputSize,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-[13px] font-medium text-text-secondary ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-4 text-text-tertiary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            autoComplete="off"
            className={cn(
              inputVariants({ variant, inputSize }),
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-4 text-text-tertiary">
              {rightIcon}
            </span>
          )}
        </div>
        {alertMessage && (
          <p className="text-[13px] text-urgent ml-1">{alertMessage}</p>
        )}
        {helperMessage && !alertMessage && (
          <p className="text-[13px] text-text-tertiary ml-1">{helperMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'leftIcon'>
>((props, ref) => (
  <Input ref={ref} leftIcon={<Search size={20} />} {...props} />
));

SearchInput.displayName = 'SearchInput';
