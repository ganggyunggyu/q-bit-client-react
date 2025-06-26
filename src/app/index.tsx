import { Routing } from '@/pages';
import { BottomBar } from '@/widgets';
import React from 'react';

export function App() {
  return (
    <main className="bg-alternative min-h-screen">
      <Routing />
      <BottomBar />
    </main>
  );
}
