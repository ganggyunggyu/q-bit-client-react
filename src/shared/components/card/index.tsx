import React from 'react';
import { cn } from '@/shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva('transition-all duration-[--transition-normal]', {
  variants: {
    variant: {
      elevated:
        'bg-[--color-bg-primary] rounded-[--radius-lg] shadow-[--shadow-sm] hover:shadow-[--shadow-md]',
      filled: 'bg-[--color-bg-secondary] rounded-[--radius-lg]',
      outlined:
        'bg-[--color-bg-primary] rounded-[--radius-lg] border border-[--color-border-gray]',
      ghost: 'bg-transparent',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
    },
    interactive: {
      true: 'cursor-pointer active:scale-[0.98]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
    interactive: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = ({
  className,
  variant,
  padding,
  interactive,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ variant, padding, interactive, className }))}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'text-[17px] font-[--font-weight-sb] text-[--color-text-primary]',
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-[14px] text-[--color-text-tertiary]', className)}
    {...props}
  >
    {children}
  </p>
);

export const CardContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-4', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-4 flex items-center gap-3', className)}
    {...props}
  >
    {children}
  </div>
);
