import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { slideDownVariants } from '@/app/motion';

import { IconColButton } from '@/shared';

import HOME from '/src/assets/tab-bar/home.png';
import CERT from '/src/assets/tab-bar/cert.png';
import STUDY from '/src/assets/tab-bar/study.png';
import CALEANDER from '/src/assets/tab-bar/caleander.png';
import USER_SETTING from '/src/assets/tab-bar/user-setting.png';

export const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bottomTabItems = [
    {
      label: '홈',
      icon: <img className="w-6 h-6" src={HOME} alt="" />,
      route: '/',
    },
    {
      label: '캘린더',
      icon: <img className="w-6 h-6" src={CALEANDER} alt="" />,
      route: '/calendar',
    },
    {
      label: '학습',
      icon: <img className="w-6 h-6" src={STUDY} alt="" />,
      route: '/my-study',
    },
    {
      label: '자격증',
      icon: <img className="w-6 h-6" src={CERT} alt="" />,
      route: '/my-cert',
    },
    {
      label: '더보기',
      icon: <img className="w-6 h-6" src={USER_SETTING} alt="" />,
      route: '/more',
    },
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
