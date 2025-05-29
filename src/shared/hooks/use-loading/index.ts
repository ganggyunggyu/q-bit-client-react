import { delay } from '@/shared/lib';
import React from 'react';

export const useLoading = (ms: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handleLoading = async () => {
    await delay(ms);
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleLoading();
  }, []);

  return {
    isLoading,
    setIsLoading,
  };
};
