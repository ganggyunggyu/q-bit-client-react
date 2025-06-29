import React, { createContext, useContext } from 'react';
import { useAuthMe } from '@/entities';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError, error } = useAuthMe();

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
