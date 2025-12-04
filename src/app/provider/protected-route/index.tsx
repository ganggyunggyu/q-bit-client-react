import React from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '@/shared';
import { useGetMe } from '@/entities';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useGetMe();

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
  if (!user || error) return <Navigate to="/auth/login/request" replace />;

  return <>{children}</>;
};
