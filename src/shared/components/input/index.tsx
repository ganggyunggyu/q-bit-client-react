import React, { InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';
import { RightArrow } from '@/shared/icons';
import { Search } from 'lucide-react';

const inputVariants = cva(
  'block w-full px-4 py-6 text-sm border rounded-full outline-none transition-all disabled:p-0 placeholder:text-primary/50',
  {
    variants: {
      variant: {
        default: 'border-[2px] border-primary focus:border-primary bg-white',
        underline:
          'border-0 border-b border-black-assist rounded-none focus:border-primary',
        ghost: 'border-transparent bg-transparent focus:border-primary',
        disable: 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
        error: 'border-red-400 focus:border-red-400',
        shadow:
          'border border-white shadow-2xl bg-white focus:border-primary transition',
      },
      inputSize: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);

const inputLabelVariants = cva(
  'absolute top-1 left-4 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400',
);

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    alertMessage?: string;
    helperMessage?: string;
    isArrow?: boolean;
    isSearch?: boolean;
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      alertMessage,
      helperMessage,
      className,
      id,
      variant,
      inputSize,
      isArrow,
      isSearch,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <>
        <div className="relative z-0 w-full flex items-center">
          {isSearch && (
            <figure className="absolute left-7 top-1/2 -translate-y-1/2 text-white bg-primary p-1 rounded-full">
              <Search size={16} />
            </figure>
          )}
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            autoComplete="off"
            className={cn(
              inputVariants({ variant, inputSize }),
              isSearch && 'pl-12',
              'peer',
              className,
            )}
            {...props}
          />
          {label && (
            <label className={cn(inputLabelVariants())} htmlFor={inputId}>
              {label}
            </label>
          )}
          {isArrow && (
            <figure className="absolute right-4 top-1/2 -translate-y-1/2">
              <RightArrow />
            </figure>
          )}
        </div>

        {alertMessage ? (
          <p className="text-red-400 text-xs mt-1">{alertMessage}</p>
        ) : helperMessage ? (
          <p className="text-gray-400 text-xs mt-1">{helperMessage}</p>
        ) : null}
      </>
    );
  },
);

Input.displayName = 'Input';
