import { Routing } from '@/pages';
import { BottomBar } from '@/widgets';
import React from 'react';

export function App() {
  return (
    <main className="pt-10 bg-alternative">
      <Routing />
      <BottomBar />
    </main>
  );
}
