import React from 'react';
import { BackIcon, cn, useRouter, SearchInput, InputProps } from '@/shared';
import { Bell } from 'lucide-react';

type AppBarVariant = 'title' | 'titleBack' | 'titleBell' | 'search';

interface AppBarProps extends React.HTMLAttributes<HTMLHeadElement> {
  variant?: AppBarVariant;
  title?: string;
  inputProps?: InputProps;
  onBellClick?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  variant = 'title',
  title,
  inputProps,
  onBellClick,
  className,
  ...props
}) => {
  const { back } = useRouter();

  const baseClass =
    'flex items-center w-full h-[--layout-header-height] px-[--layout-page-px] bg-transparent transition-all duration-[--transition-normal]';

  const iconButtonClass =
    'p-2 rounded-[--radius-sm] text-[--color-primary] hover:bg-[--color-bg-secondary] active:scale-95 transition-all duration-[--transition-fast]';

  const renderContent = () => {
    switch (variant) {
      case 'titleBack':
        return (
          <>
            <button onClick={back} className={cn(iconButtonClass, '-ml-2')}>
              <BackIcon />
            </button>
            <p className="flex-1 font-title-sb text-[--color-text-primary]">
              {title}
            </p>
          </>
        );

      case 'titleBell':
        return (
          <>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                {title}
              </span>
            </div>
            <button
              onClick={onBellClick}
              className={cn(
                'relative p-2 rounded-full bg-bg-primary shadow-sm',
                'hover:bg-bg-tertiary active:scale-95 transition-all duration-fast',
              )}
            >
              <Bell size={20} className="text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-urgent rounded-full" />
            </button>
          </>
        );

      case 'search':
        return (
          <>
            <button onClick={back} className={cn(iconButtonClass, '-ml-2')}>
              <BackIcon />
            </button>
            <div className="flex-1">
              <SearchInput {...inputProps} variant="filled" inputSize="sm" />
            </div>
          </>
        );

      case 'title':
      default:
        return (
          <p className="flex-1 font-title-sb text-[--color-text-primary]">
            {title}
          </p>
        );
    }
  };

  return (
    <header
      className={cn(
        baseClass,
        variant === 'search' ? 'gap-[--space-2]' : 'gap-[--space-3]',
        className,
      )}
      {...props}
    >
      {renderContent()}
    </header>
  );
};

export { CaleanderAppBar } from './caleander-app-bar';
