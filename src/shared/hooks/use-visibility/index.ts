import React from 'react';
import { delay } from '@/shared/lib';

export const useVisibility = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [opacityClass, setOpacityClass] = React.useState('opacity-0');

  const onMounted = async () => {
    await delay(100);
    setIsVisible(true);
    setOpacityClass('opacity-100');
  };

  React.useEffect(() => {
    onMounted();
  }, []);

  return {
    isVisible,
    opacityClass,
  };
};
