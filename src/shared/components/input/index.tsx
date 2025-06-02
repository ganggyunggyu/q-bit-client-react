import React, { InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';
import { RightArrow } from '@/shared/icons';

const inputVariants = cva(
  'block w-full px-4 py-2 text-sm border rounded-md outline-none transition-all rounded-full disabled:p-0 place',
  {
    variants: {
      variant: {
        default:
          'border border-primary focus:border-primary placeholder-primary/50',
        underline:
          'border-0 border-b border-black-assist rounded-none focus:border-primary',
        ghost: 'border-transparent bg-transparent focus:border-primary',
        disable: 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
        error: 'border-red-400 focus:border-red-400',
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
  'absolute top-1 left-4 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ',
);

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    alertMessage?: string;
    helperMessage?: string; // ✅ 추가
    isArrow?: boolean;
  };

export const Input: React.FC<InputProps> = ({
  label,
  alertMessage,
  helperMessage, // ✅ 추가
  className,
  id,
  variant,
  inputSize,
  isArrow,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <div className="relative z-0 py-1 w-full">
        <input
          id={inputId}
          placeholder=" "
          autoComplete="off"
          className={cn(
            inputVariants({ variant, inputSize }),
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
          <figure className="absolute right-4 top-3">
            <RightArrow />
          </figure>
        )}
      </div>
      {/* ✅ 경고 메시지 & 헬퍼 메시지 따로 렌더링 */}
      {alertMessage ? (
        <p className="text-red-400 text-xs mt-1 transition-all">
          {alertMessage}
        </p>
      ) : helperMessage ? (
        <p className="text-gray-400 text-xs mt-1 transition-all">
          {helperMessage}
        </p>
      ) : null}
    </>
  );
};
