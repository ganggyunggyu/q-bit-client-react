import React from 'react';
import { useLocation } from 'react-router-dom';
import { BottomBar } from '@/widgets';

const layoutConfig: Record<
  string,
  { header: React.ReactElement | null; hasBottomBar: boolean }
> = {
  '/': { header: null, hasBottomBar: true },
  '/more': { header: null, hasBottomBar: true },
  '/search': { header: null, hasBottomBar: true },
  '/calendar': { header: null, hasBottomBar: true },
  '/my-cert': {
    header: null,
    hasBottomBar: true,
  },
  '/my-study': { header: null, hasBottomBar: true },
  '/admin-components': {
    header: null,
    hasBottomBar: false,
  },
  '/auth/login': { header: null, hasBottomBar: false },
  '/auth/kakao/callback': { header: null, hasBottomBar: false },
  '/auth/login/request': { header: null, hasBottomBar: false },
  '/onboarding-1': { header: null, hasBottomBar: false },
  '/onboarding-2': { header: null, hasBottomBar: false },
  '/search/:id': { header: null, hasBottomBar: false },
  '/weekly-report': { header: null, hasBottomBar: false },
};

interface RouteLayoutProps {
  children: React.ReactNode;
}

export const RouteLayout = ({ children }: RouteLayoutProps) => {
  const { pathname } = useLocation();

  const config = Object.entries(layoutConfig).find(([key]) =>
    pathname.startsWith(key.replace(/:\w+/, '')),
  )?.[1] || { header: null, hasBottomBar: false };

  const { header, hasBottomBar } = config;

  return (
    <div className="flex flex-col h-screen touch-manipulation bg-bg-secondary transition-colors duration-normal">
      {header}
      <main className="flex-1 overflow-y-auto">{children}</main>
      {hasBottomBar && <BottomBar />}
    </div>
  );
};
