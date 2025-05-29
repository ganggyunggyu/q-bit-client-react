import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeVariants, slideVariants } from '@/app/motion';

import { CaleanderPage } from './caleander';
import { MainPage } from './main';
import { MorePage } from './more';
import { MyCertPage } from './my-cert';
import { MyStudyPage } from './my-study';

const fadeRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/more', element: <MorePage /> },
];

const slideRoutes = [
  { path: '/caleander', element: <CaleanderPage /> },
  { path: '/my-cert', element: <MyCertPage /> },
  { path: '/my-study', element: <MyStudyPage /> },
];

export const Routing = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
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
                <motion.div
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-full"
                  custom={1}
                >
                  {element}
                </motion.div>
              }
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
};
