import React from 'react';
import { Routing } from '@/pages';
import { BottomBar } from '@/widgets';
import { AuthProvider } from './provider/auth-provider';
import { RouteLayout } from './provider/layout-provider';

export function App() {
  return (
    <RouteLayout>
      <AuthProvider>
        <Routing />
        {/* <BottomBar /> */}
      </AuthProvider>
    </RouteLayout>
  );
}
