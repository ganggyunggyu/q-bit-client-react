import React from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

type DayData = {
  percentage: number | null;
  isExamDay: boolean;
};

interface MiniMonthProps {
  year: number;
  month: number;
  onSelect: () => void;
  getDayData?: (dateStr: string) => DayData | null;
  isCurrentMonth: boolean;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const MiniMonth: React.FC<MiniMonthProps> = React.memo(({
  year,
  month,
  onSelect,
  getDayData,
  isCurrentMonth,
}) => {
  const firstDay = dayjs(`${year}-${month + 1}-01`);
  const daysInMonth = firstDay.daysInMonth();
  const startDayOfWeek = firstDay.day();
  const today = dayjs();

  const days: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getColorIntensity = (day: number): string => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const data = getDayData?.(dateStr);

    if (!data || data.percentage === null) return 'bg-bg-tertiary';
    if (data.percentage >= 75) return 'bg-primary';
    if (data.percentage >= 50) return 'bg-primary/70';
    if (data.percentage >= 25) return 'bg-primary/40';
    return 'bg-primary/20';
  };

  const isToday = (day: number) => {
    return today.year() === year && today.month() === month && today.date() === day;
  };

  return (
    <motion.button
      onClick={onSelect}
      className={`p-3 rounded-2xl transition-all active:scale-95 ${
        isCurrentMonth ? 'bg-primary/10 ring-2 ring-primary' : 'bg-bg-primary'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <p className={`font-body-sb mb-2 text-left ${isCurrentMonth ? 'text-primary' : 'text-text-primary'}`}>
        {month + 1}월
      </p>

      {/* 미니 요일 헤더 */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-[8px] ${
              i === 0 ? 'text-urgent/60' : i === 6 ? 'text-primary/60' : 'text-text-tertiary/60'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 미니 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="w-3 h-3" />;
          }

          const todayMark = isToday(day);

          return (
            <div
              key={day}
              className={`w-3 h-3 rounded-sm ${
                todayMark
                  ? 'ring-1 ring-primary bg-primary'
                  : getColorIntensity(day)
              }`}
            />
          );
        })}
      </div>
    </motion.button>
  );
});

MiniMonth.displayName = 'MiniMonth';

interface YearCalendarProps {
  year: number;
  onMonthSelect: (year: number, month: number) => void;
  onClose: () => void;
  getDayData?: (dateStr: string) => DayData | null;
}

export const YearCalendar: React.FC<YearCalendarProps> = ({
  year,
  onMonthSelect,
  onClose,
  getDayData,
}) => {
  const today = dayjs();
  const currentYear = today.year();
  const currentMonth = today.month();

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <motion.div
      className="absolute inset-0 z-20 bg-bg-secondary"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-bg-secondary pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-title-sb text-text-primary">{year}년</h1>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-tertiary active:scale-95 transition-all"
          >
            <X size={24} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* 12개월 그리드 */}
      <div className="px-4 pb-safe">
        <div className="grid grid-cols-3 gap-3">
          {months.map((month) => (
            <MiniMonth
              key={month}
              year={year}
              month={month}
              onSelect={() => onMonthSelect(year, month)}
              getDayData={getDayData}
              isCurrentMonth={year === currentYear && month === currentMonth}
            />
          ))}
        </div>

        {/* 범례 */}
        <div className="flex items-center justify-center gap-4 mt-6 py-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-bg-tertiary" />
            <span className="text-xs text-text-tertiary">없음</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <span className="text-xs text-text-tertiary">25%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/70" />
            <span className="text-xs text-text-tertiary">50%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-xs text-text-tertiary">75%+</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
