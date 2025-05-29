import { Variants } from 'framer-motion';

export const slideVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
    position: 'absolute' as const,
    width: '100%',
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: 'relative' as const,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 1,
    position: 'absolute' as const,
    width: '100%',
    transition: { duration: 0.2 },
  }),
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export const slideDownVariants: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const slideLeftVariants: Variants = {
  initial: { x: 0, opacity: 1 },
  animate: { x: 0, opacity: 1 },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
