import { lazy, Suspense, JSX } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLoading } from '@/shared';
import { ProtectedRoute } from '@/app/provider/protected-route';

import MainPage from './main';

const MorePage = lazy(() => import('./more'));
const AdminComponents = lazy(() => import('./admin-components'));
const MyCertPage = lazy(() => import('./my-cert'));
const MyStudyPage = lazy(() => import('./my-study'));
const Calendar = lazy(() => import('./calendar'));
const KakaoCallbackPage = lazy(() => import('./kakao-callback-page'));
const LoginRequest = lazy(() => import('./login-request'));
const Step1Cert = lazy(() => import('./onboarding/1-cert'));
const Step2Style = lazy(() => import('./onboarding/2-style'));
const CertDetailPage = lazy(() => import('./cert-detail'));
const Login = lazy(() => import('./login'));
const Search = lazy(() => import('./search'));
const AiRecommendPage = lazy(() => import('./ai-recommend'));

type RouteElement = {
  path: string;
  element: JSX.Element;
};

const routes = [
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
  { path: '/auth/kakao/callback', element: <KakaoCallbackPage /> },
  { path: '/auth/login/request', element: <LoginRequest /> },
  { path: '/onboarding-1', element: <Step1Cert /> },
  { path: '/onboarding-2', element: <Step2Style /> },
  { path: '/search', element: <Search /> },
  { path: '/search/:id', element: <CertDetailPage /> },
  { path: '/ai-recommend', element: <AiRecommendPage /> },
  { path: '/auth/login', element: <Login /> },
] as RouteElement[];

export const Routing = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <MainLoading />
                </div>
              }
            >
              <div className="h-full">{element}</div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};
