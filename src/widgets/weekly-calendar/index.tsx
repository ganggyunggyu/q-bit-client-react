import React from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import 'dayjs/locale/ko';
import { RemainingDateLabel } from '@/entities';
import { useGetMyRemindCerts } from '@/entities/cert/hooks/cert.hooks';

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

  const { data: remindCerts } = useGetMyRemindCerts();

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

  const examDates = React.useMemo(() => {
    if (!remindCerts) return new Set();

    const dates = new Set();
    remindCerts.forEach((cert) => {
      cert.schedule?.forEach((s) => {
        if (s.writtenExamStart) {
          dates.add(dayjs(s.writtenExamStart).format('YYYY-MM-DD'));
        }
      });
    });
    return dates;
  }, [remindCerts]);

  return (
    <div ref={containerRef} className="px-4">
      <div className="flex justify-between items-center py-4">
        <p className="font-title-sb">{currentMonth}월</p>
        <RemainingDateLabel day={4} label="시험" />
      </div>

      <div className="relative h-24 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={startDate.toString()}
            custom={direction}
            initial={{ x: direction === 'left' ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 'left' ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex justify-between items-center bg-white rounded-2xl px-2 py-3"
          >
            {days.map((day) => {
              const isSelected = day.isSame(selectedDate, 'day');
              const isExamDay = examDates.has(day.format('YYYY-MM-DD'));
              const isWeekend =
                day.format('dd') === '일' || day.format('dd') === '토';

              return (
                <button
                  key={day.format('YYYY-MM-DD')}
                  onClick={() => onSelect(day.toDate())}
                  className="flex flex-col items-center gap-1.5 flex-1"
                >
                  <span
                    className={`text-xs font-medium ${
                      isWeekend ? 'text-status-error' : 'text-text-tertiary'
                    }`}
                  >
                    {day.format('dd')}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-primary text-white font-semibold'
                        : isWeekend
                          ? 'text-status-error'
                          : 'text-text-primary'
                    }`}
                  >
                    <span className="text-sm">{day.format('D')}</span>
                  </div>
                  <div className="h-1.5 flex items-center justify-center">
                    {isExamDay && (
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
