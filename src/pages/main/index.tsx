import { Button, ChatIcon } from '@/shared';
import React from 'react';

export const IconButton = () => {
  return (
    <Button className="flex flex-col">
      <span>
        <ChatIcon />
      </span>
      <p>asd</p>
    </Button>
  );
};

export const MainPage = () => {
  return (
    <React.Fragment>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">🏠 메인 페이지 (main)</h1>
      </div>
    </React.Fragment>
  );
};
