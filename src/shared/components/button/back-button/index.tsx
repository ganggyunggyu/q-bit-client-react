import { BackIcon } from '@/shared/icons';
import { Button, ButtonProps } from '../atom-button';
import { useRouter } from '@/shared/hooks';
import React from 'react';
import { cn } from '@/shared'; // cn 유틸 꼭 임포트해줘!

type BackButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({
  className,
  ...props
}) => {
  const { navigate } = useRouter();
  return (
    <Button
      className={cn(
        'border-none bg-transparent fixed top-12 left-0 p-0',
        className,
      )}
      onClick={() => navigate(-1)}
      {...props}
    >
      <BackIcon />
    </Button>
  );
};
