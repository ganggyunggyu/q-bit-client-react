import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthMe } from '@/entities';
import { MainLoading } from '@/shared';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useAuthMe();

  if (isLoading) return <MainLoading />;
  if (!user || error) return <Navigate to="/auth/login/request" replace />;

  return <React.Fragment>{children}</React.Fragment>;
};
