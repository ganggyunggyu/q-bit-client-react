import { Routing } from '@/pages';
import { BottomBar } from '@/widgets';
import React from 'react';

export function App() {
  return (
    <React.Fragment>
      <Routing />
      <BottomBar />
    </React.Fragment>
  );
}
