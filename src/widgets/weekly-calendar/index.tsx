import React from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import 'dayjs/locale/ko';
import { ReminingDateLabel } from '@/entities';

dayjs.locale('ko');

type WeeklyCalendarProps = {
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  selectedDate,
  onSelect,
}) => {
  const [startDate, setStartDate] = React.useState(() =>
    dayjs(selectedDate).startOf('week').day(0),
  );

  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [currentMonth, setCurrentMonth] = React.useState(startDate.month() + 1);

  const handleSwipe = (deltaX: number) => {
    const threshold = 50;
    if (deltaX > threshold) {
      setStartDate((prev) => prev.subtract(1, 'week'));
      setDirection('right');
    } else if (deltaX < -threshold) {
      setStartDate((prev) => prev.add(1, 'week'));
      setDirection('left');
    }
  };

  React.useEffect(() => {
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      handleSwipe(deltaX);
    };

    const el = containerRef.current;
    el?.addEventListener('touchstart', handleTouchStart);
    el?.addEventListener('touchend', handleTouchEnd);

    return () => {
      el?.removeEventListener('touchstart', handleTouchStart);
      el?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const days = Array.from({ length: 7 }).map((_, i) => startDate.add(i, 'day'));

  const newCurrentMonth = days[0].month();
  const newCurrentDay = days[0].date();

  React.useEffect(() => {
    setCurrentMonth(newCurrentMonth + 1);
  }, [newCurrentMonth, newCurrentDay]);

  return (
    <div ref={containerRef} className="relative h-[150px] overflow-hidden px-4">
      <div className="flex justify-between items-center py-4">
        <p className="font-title-sb">{currentMonth}월</p>

        <ReminingDateLabel day={4} label="시험" />
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={startDate.toString()}
          custom={direction}
          initial={{ x: direction === 'left' ? 200 : -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 'left' ? -200 : 200, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-11/12 flex justify-between bg-white rounded-2xl p-1.5"
        >
          {days.map((day) => {
            const isSelected = day.isSame(selectedDate, 'day');

            const isWeekend =
              day.format('dd') === '일' || day.format('dd') === '토';
            return (
              <div
                key={day.format('YYYY-MM-DD')}
                onClick={() => onSelect(day.toDate())}
                className={`flex flex-col gap-2 items-center justify-center w-9 h-16 rounded-lg 
                `}
              >
                <span
                  className={`text-xs ${isWeekend ? 'text-urgent' : 'text-black'}`}
                >
                  {day.format('dd')}
                </span>
                <button
                  className={`w-9 h-9 p-3 rounded-full flex items-center justify-center transition-colors
                            ${
                              isSelected
                                ? 'bg-bg-primary text-primary border border-blue-good'
                                : isWeekend
                                  ? 'text-urgent'
                                  : 'text-black'
                            }`}
                >
                  <p className={`font-body text-center `}>{day.format('D')}</p>
                </button>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
