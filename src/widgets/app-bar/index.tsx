import React from 'react';
import { BackIcon, cn, useRouter, SearchInput, InputProps } from '@/shared';
import { Bell } from 'lucide-react';

type AppBarVariant = 'title' | 'titleBack' | 'titleBell' | 'search';

interface AppBarProps extends React.HTMLAttributes<HTMLHeadElement> {
  variant?: AppBarVariant;
  title?: string;
  inputProps?: InputProps;
  onBellClick?: () => void;
  onBack?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  variant = 'title',
  title,
  inputProps,
  onBellClick,
  onBack,
  className,
  ...props
}) => {
  const { back } = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      back();
    }
  };

  const baseClass =
    'flex items-center w-full min-h-[56px] h-[--layout-header-height] px-5 py-3 bg-transparent transition-all duration-[--transition-normal]';

  const iconButtonClass =
    'p-2.5 rounded-xl text-[--color-primary] hover:bg-[--color-bg-secondary] active:scale-95 transition-all duration-[--transition-fast]';

  const renderContent = () => {
    switch (variant) {
      case 'titleBack':
        return (
          <>
            <button onClick={handleBack} className={iconButtonClass}>
              <BackIcon />
            </button>
            <p className="flex-1 font-title-sb text-[--color-text-primary] ml-1">
              {title}
            </p>
          </>
        );

      case 'titleBell':
        return (
          <>
            <div className="flex-1 flex items-center">
              <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                {title}
              </span>
            </div>
            <button
              onClick={onBellClick}
              className={cn(
                'relative p-2.5 rounded-xl bg-bg-primary shadow-sm',
                'hover:bg-bg-tertiary active:scale-95 transition-all duration-fast',
              )}
            >
              <Bell size={22} className="text-text-secondary" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-urgent rounded-full" />
            </button>
          </>
        );

      case 'search':
        return (
          <>
            <button onClick={handleBack} className={iconButtonClass}>
              <BackIcon />
            </button>
            <div className="flex-1 ml-1">
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
        variant === 'search' ? 'gap-2' : 'gap-3',
        className,
      )}
      {...props}
    >
      {renderContent()}
    </header>
  );
};

export { CaleanderAppBar } from './caleander-app-bar';
