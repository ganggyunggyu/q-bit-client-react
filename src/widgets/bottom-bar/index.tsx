import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, CalendarDays, BookOpen, Award, MoreHorizontal } from 'lucide-react';

import { slideDownVariants } from '@/app/motion';
import { cn } from '@/shared/lib';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1 min-w-[56px] py-2 relative"
  >
    <motion.div
      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'p-2 rounded-xl transition-colors duration-200',
        isActive ? 'bg-primary/10 text-primary' : 'text-text-tertiary'
      )}
    >
      {icon}
    </motion.div>
    <span
      className={cn(
        'font-caption-m transition-colors duration-200',
        isActive ? 'text-primary' : 'text-text-tertiary'
      )}
    >
      {label}
    </span>
    {isActive && (
      <motion.div
        layoutId="nav-indicator"
        className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    )}
  </button>
);

interface CenterNavItemProps {
  isActive: boolean;
  onClick: () => void;
}

const CenterNavItem = ({ isActive, onClick }: CenterNavItemProps) => (
  <button onClick={onClick} className="relative -mt-6">
    <motion.div
      whileTap={{ scale: 0.95 }}
      animate={isActive ? { y: -4 } : { y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300',
        isActive
          ? 'bg-primary text-white shadow-primary/30'
          : 'bg-bg-primary text-text-secondary shadow-black/10'
      )}
    >
      <Home size={24} strokeWidth={isActive ? 2.5 : 2} />
    </motion.div>
    <span
      className={cn(
        'font-caption-m mt-1 block text-center transition-colors duration-200',
        isActive ? 'text-primary' : 'text-text-tertiary'
      )}
    >
      홈
    </span>
  </button>
);

export const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const leftItems = [
    { label: '캘린더', icon: <CalendarDays size={22} />, route: '/calendar' },
    { label: '학습', icon: <BookOpen size={22} />, route: '/my-study' },
  ];

  const rightItems = [
    { label: '자격증', icon: <Award size={22} />, route: '/my-cert' },
    { label: '더보기', icon: <MoreHorizontal size={22} />, route: '/more' },
  ];

  const bottomBarVisibleRoutes = [
    '/',
    '/calendar',
    '/my-study',
    '/my-cert',
    '/more',
    '/auth/login/request',
  ];

  const isVisible = bottomBarVisibleRoutes.includes(location.pathname);

  const handleNavigate = (route: string) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="bottom-bar-wrapper"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideDownVariants}
          className="relative w-full z-10"
        >
          <footer className="w-full px-4 pb-2 pt-3 flex justify-around items-end bg-bg-primary/80 backdrop-blur-xl border-t border-divide/50">
            {leftItems.map((item) => (
              <NavItem
                key={item.route}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.route}
                onClick={() => handleNavigate(item.route)}
              />
            ))}

            <CenterNavItem
              isActive={location.pathname === '/'}
              onClick={() => handleNavigate('/')}
            />

            {rightItems.map((item) => (
              <NavItem
                key={item.route}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.route}
                onClick={() => handleNavigate(item.route)}
              />
            ))}
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
