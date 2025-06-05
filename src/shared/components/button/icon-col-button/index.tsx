import { cn } from '@/shared/lib';
import { ButtonProps } from '../atom-button';

type IconColButtonProps = {
  icon?: React.ReactNode;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
} & ButtonProps;

export const IconColButton: React.FC<IconColButtonProps> = ({
  icon,
  label,
  isActive,
  ...props
}) => {
  return (
    <button
      className={cn(
        'w-[50px] flex flex-col items-center justify-center gap-1 text-sm transition-all min-w-fit',
        isActive
          ? 'opacity-100 font-bold'
          : 'opacity-50 text-[var(--color-black-alt)]',
      )}
      {...props}
    >
      <div>{icon}</div>
      <p className="min-w-fit">{label}</p>
    </button>
  );
};
