import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { slideDownVariants } from '@/app/motion';

import {
  IconColButton,
  HomeIcon,
  SearchIcon,
  BookmarkIcon,
  JangBaguniIcon,
  UserCercleIcon,
} from '@/shared';

export const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bottomTabItems = [
    { label: '홈', icon: <HomeIcon />, route: '/' },
    { label: '캘린더', icon: <SearchIcon />, route: '/caleander' },
    { label: '학습', icon: <BookmarkIcon />, route: '/my-study' },
    { label: '자격증', icon: <JangBaguniIcon />, route: '/my-cert' },
    { label: '더보기', icon: <UserCercleIcon />, route: '/more' },
  ];

  const visibleRoutes = bottomTabItems.map((item) => {
    if (item.route === '/my') return;
    return item.route;
  });
  const isVisible = visibleRoutes.includes(location.pathname);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="bottom-bar-wrapper"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideDownVariants}
          className="fixed bottom-0 left-0 w-screen z-10"
        >
          <footer className="w-screen h-[84px] flex justify-around items-end px-2 pb-7 bg-white">
            {bottomTabItems.map((item) => (
              <IconColButton
                key={item.route}
                label={item.label}
                icon={item.icon}
                isActive={location.pathname === item.route}
                onClick={() => {
                  if (location.pathname !== item.route) {
                    navigate(item.route);
                  }
                }}
              />
            ))}
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
