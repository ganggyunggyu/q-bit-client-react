import React from 'react';
import { Routing } from '@/pages';
import { AuthProvider } from './provider/auth-provider';
import { RouteLayout } from './provider/layout-provider';

export function App() {
  return (
    <RouteLayout>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </RouteLayout>
  );
}
