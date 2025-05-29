import { useAuthStore } from '@/app/store/use-auth-store';
import React from 'react';

export const MainHeader: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <header className="w-full bg-background z-50 text-main-white flex items-center justify-between pl-4 pb-5 pt-25">
      <p className="text-xl text-black">HELLO 아현{user?.displayName}</p>
    </header>
  );
};
