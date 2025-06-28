import React, { lazy, Suspense, JSX } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeVariants, slideVariants } from '@/app/motion';
import { MainLoading } from '@/shared';

const MainPage = lazy(() => import('./main'));
const MorePage = lazy(() => import('./more'));
const AdminComponents = lazy(() => import('./admin-components'));
const Calendar = lazy(() => import('./calendar'));
const MyCertPage = lazy(() => import('./my-cert'));
const MyStudyPage = lazy(() => import('./my-study'));
const KakaoCallbackPage = lazy(() => import('./kakao-callback-page'));
const Step1Cert = lazy(() => import('./onboarding/1-cert'));
const Step2Style = lazy(() => import('./onboarding/2-style'));
const Search = lazy(() => import('./search'));
const CertDetailPage = lazy(() => import('./cert-detail'));
const Login = lazy(() => import('./login'));
type RouteElement = {
  path: string;
  element: JSX.Element;
};

const fadeRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/more', element: <MorePage /> },
  { path: '/admin-components', element: <AdminComponents /> },
  { path: '/calendar', element: <Calendar /> },
  { path: '/my-cert', element: <MyCertPage /> },
  { path: '/my-study', element: <MyStudyPage /> },
  { path: '/auth/kakao-callback', element: <KakaoCallbackPage /> },
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
  const [curPath, setCurPath] = React.useState('');

  React.useEffect(() => {
    setCurPath(location.pathname);

    console.log(curPath);
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
