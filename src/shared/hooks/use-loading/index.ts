import { delay } from '@/shared/lib';
import React from 'react';

export const useLoading = (ms: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const handleLoading = async () => {
      await delay(ms);
      setIsLoading(false);
    };
    handleLoading();
  }, [ms]);

  return {
    isLoading,
    setIsLoading,
  };
};
