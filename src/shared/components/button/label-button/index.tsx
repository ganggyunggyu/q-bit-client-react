import { ButtonProps, Button } from '../atom-button';
import { cn } from '@/shared/lib/cn';

export type LabelButtonProps = ButtonProps & {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  rounded?: boolean;
};

export const LabelButton = ({
  label,
  icon,
  iconPosition = 'right',
  rounded = true,
  className,
  ...props
}: LabelButtonProps) => {
  const content = (
    <>
      {iconPosition === 'left' && icon}
      <p>{label}</p>
      {iconPosition === 'right' && icon}
    </>
  );

  return (
    <Button
      className={cn(
        'flex items-center gap-2',
        rounded && 'rounded-full',
        className,
      )}
      {...props}
    >
      {content}
    </Button>
  );
};
