import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type CaleanderAppBarProps = {
  month: string;
  year: string;
};

export const CaleanderAppBar: React.FC<CaleanderAppBarProps> = ({
  year,
  month,
}) => {
  const [yearDirection, setYearDirection] = React.useState<'up' | 'down'>('up');
  const [monthDirection, setMonthDirection] = React.useState<'up' | 'down'>(
    'up',
  );

  const prevYearRef = React.useRef(year);
  const prevMonthRef = React.useRef(month);

  React.useEffect(() => {
    const prevYear = prevYearRef.current;
    const prevMonth = prevMonthRef.current;

    setYearDirection(+year > +prevYear ? 'up' : 'down');
    setMonthDirection(+month > +prevMonth ? 'up' : 'down');

    prevYearRef.current = year;
    prevMonthRef.current = month;
  }, [year, month]);

  const slideVariants = {
    initial: (direction: 'up' | 'down') => ({
      y: direction === 'up' ? 20 : 20,
      opacity: 0,
      scale: 0.8,
      position: 'absolute' as const,
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      position: 'absolute' as const,
    },
    exit: (direction: 'up' | 'down') => ({
      y: direction === 'up' ? 20 : 20,
      opacity: 0,
      scale: 0.8,
      position: 'absolute' as const,
    }),
  };

  return (
    <header className="flex items-center justify-between w-full px-5 py-4 overflow-hidden min-h-[56px] bg-transparent">
      <div className="relative h-7 w-20 overflow-hidden">
        <AnimatePresence custom={yearDirection} mode="wait">
          <motion.div
            key={`year-${year}`}
            custom={yearDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <p className="font-title-sb text-text-tertiary">{year}년</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative h-7 w-14 overflow-hidden">
        <AnimatePresence custom={monthDirection} mode="wait">
          <motion.div
            key={`month-${month}`}
            custom={monthDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <p className="font-title-sb text-text-primary">{month}월</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
};
