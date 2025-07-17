import React, { lazy, Suspense, JSX } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeVariants, slideVariants } from '@/app/motion';
import { MainLoading } from '@/shared';
import { ProtectedRoute } from '@/app/provider/protected-route';
import LoginRequest from './login-request';
import MainPage from './main';
import MorePage from './more';
import AdminComponents from './admin-components';

import MyCertPage from './my-cert';
import MyStudyPage from './my-study';
import KakaoCallbackPage from './kakao-callback-page';
import Step1Cert from './onboarding/1-cert';
import Step2Style from './onboarding/2-style';
import CertDetailPage from './cert-detail';
import Login from './login';
import Calendar from './calendar';
import Search from './search';

type RouteElement = {
  path: string;
  element: JSX.Element;
};

const fadeRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/more', element: <MorePage /> },
  { path: '/admin-components', element: <AdminComponents /> },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-cert',
    element: (
      <ProtectedRoute>
        <MyCertPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-study',
    element: (
      <ProtectedRoute>
        <MyStudyPage />
      </ProtectedRoute>
    ),
  },
  { path: '/auth/kakao-callback', element: <KakaoCallbackPage /> },
  { path: '/auth/login/request', element: <LoginRequest /> },
] as RouteElement[];

const slideRoutes = [
  { path: '/onboarding-1', element: <Step1Cert /> },
  { path: '/onboarding-2', element: <Step2Style /> },
  { path: '/search', element: <Search /> },
  { path: '/search/:id', element: <CertDetailPage /> },
  { path: '/auth/login', element: <Login /> },
] as RouteElement[];

export const Routing = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {[...fadeRoutes, ...slideRoutes].map(({ path, element }) => {
          const variants = slideRoutes.some((route) => route.path === path)
            ? slideVariants
            : fadeVariants;

          return (
            <Route
              key={path}
              path={path}
              element={
                <Suspense
                  key={location.key}
                  fallback={
                    <motion.div
                      key="fallback"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-screen flex items-center justify-center"
                    >
                      <MainLoading />
                    </motion.div>
                  }
                >
                  <motion.div
                    key={location.key}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="h-full"
                  >
                    {element}
                  </motion.div>
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
};
