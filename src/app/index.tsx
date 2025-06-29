import React from 'react';
import { Routing } from '@/pages';
import { BottomBar } from '@/widgets';
import { AuthProvider } from './provider/auth-provider';

export function App() {
  return (
    <AuthProvider>
      <main className="bg-alternative min-h-screen">
        <Routing />
        <BottomBar />
      </main>
    </AuthProvider>
  );
}
