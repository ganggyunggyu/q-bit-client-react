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
    <header className="flex items-center justify-between w-full p-4 overflow-hidden h-12 bg-normal pt-10">
      <div className="relative h-6 w-16 overflow-hidden">
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
            <p className="font-title-sb text-black-alternative/50">{year}년</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative h-6 w-12 overflow-hidden">
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
            <p className="font-title-sb">{month}월</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
};
