import React from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { CaleanderAppBar } from '@/widgets';
import { useCalendarStore, useUiStore } from '@/app/store';

const getMonthKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const swipeVariants: Variants = {
  enter: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? 300 : -300,
    opacity: 0,
    rotate: direction === 'left' ? 3 : -3,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
  },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? -300 : 300,
    opacity: 0,
    rotate: direction === 'left' ? -3 : 3,
    scale: 0.95,
  }),
};

export const CalendarBox = () => {
  const { selectedDate, displayDate, setSelectedDate, setDisplayDate } =
    useCalendarStore();
  const { setIsCalendarBottomSheetOpen } = useUiStore();
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isAdmissionDay = (date: Date) =>
    date.getFullYear() === 2025 &&
    date.getMonth() === 4 &&
    date.getDate() === 18;

  React.useEffect(() => {
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 100) {
        const newDate = new Date(displayDate);
        if (deltaX > 0) {
          newDate.setMonth(newDate.getMonth() - 1);
          setDirection('right');
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
          setDirection('left');
        }
        setDisplayDate(newDate);
      }
    };

    const el = containerRef.current;
    el?.addEventListener('touchstart', handleTouchStart);
    el?.addEventListener('touchend', handleTouchEnd);

    return () => {
      el?.removeEventListener('touchstart', handleTouchStart);
      el?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [displayDate, setDisplayDate]);

  return (
    <section
      ref={containerRef}
      className="relative h-[calc(100vh-184px)] w-[95%] mx-auto overflow-hidden touch-pan-x"
    >
      <CaleanderAppBar
        month={String(displayDate.getMonth() + 1).padStart(2, '0')}
        year={String(displayDate.getFullYear())}
      />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={getMonthKey(displayDate)}
          custom={direction}
          variants={swipeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 250, damping: 50 },
            opacity: { duration: 0.2 },
            rotate: { duration: 0.2 },
          }}
          className="absolute w-full"
        >
          <Calendar
            value={selectedDate}
            onClickDay={(value) => {
              setSelectedDate(value);
              setIsCalendarBottomSheetOpen(true);
            }}
            onChange={() => {}}
            showNavigation={false}
            activeStartDate={displayDate}
            tileClassName={({ date }) => {
              const isSelected =
                selectedDate?.getFullYear() === date.getFullYear() &&
                selectedDate?.getMonth() === date.getMonth() &&
                selectedDate?.getDate() === date.getDate();

              if (isSelected) return 'selected-day';

              return '';
            }}
            locale="ko-KR"
            formatDay={(_, date) => String(date.getDate())}
            calendarType="gregory"
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
