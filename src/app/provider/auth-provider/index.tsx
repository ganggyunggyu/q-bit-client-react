import { useGetMe } from '@/entities';
import React from 'react';
import { AuthContext } from './use-auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError, error } = useGetMe();

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, error }}>
      {children}
    </AuthContext.Provider>
  );
};
