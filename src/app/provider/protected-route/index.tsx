import React from 'react';
import { Navigate } from 'react-router-dom';

import { MainLoading } from '@/shared';
import { useGetMe } from '@/entities';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useGetMe();

  if (isLoading) return <MainLoading />;
  if (!user || error) return <Navigate to="/auth/login/request" replace />;

  return <React.Fragment>{children}</React.Fragment>;
};
