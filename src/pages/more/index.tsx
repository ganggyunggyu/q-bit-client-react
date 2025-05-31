import { KakaoLoginButton } from '@/shared';
import React from 'react';

export const MorePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl font-semibold">➕ 더보기 페이지 (more)</h1>

      <KakaoLoginButton />
    </div>
  );
};
