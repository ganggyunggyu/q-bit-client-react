import React from 'react';
import dayjs from 'dayjs';
import { motion, useSpring, useTransform } from 'framer-motion';

type DayData = {
  percentage: number | null;
  isExamDay: boolean;
};

// 진행률 링 컴포넌트
const ProgressRing: React.FC<{ percent: number }> = React.memo(({ percent }) => {
  const radius = 13;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 5;

  // 0에서 시작해서 percent까지 애니메이션
  const percentSpring = useSpring(0, {
    stiffness: 80,
    damping: 20,
  });

  React.useEffect(() => {
    // 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      percentSpring.set(percent);
    }, 100);
    return () => clearTimeout(timer);
  }, [percent, percentSpring]);

  const dashOffset = useTransform(
    percentSpring,
    (p) => circumference * (1 - p / 100),
  );

  const hue = useTransform(percentSpring, (h) => h);
  const strokeColor = useTransform(hue, (h) => `hsl(${h}, 85%, 55%)`);
  const bgColor = useTransform(hue, (h) => `hsl(${h}, 85%, 55%, 0.15)`);

  return (
    <svg width={34} height={34} viewBox="0 0 34 34">
      <motion.circle
        cx="17"
        cy="17"
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <motion.circle
        cx="17"
        cy="17"
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeLinecap="round"
        style={{
          strokeDashoffset: dashOffset,
          rotate: -90,
          scaleX: -1,
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  );
});

type MonthGridProps = {
  year: number;
  month: number;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  getDayData?: (dateStr: string) => DayData | null;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const MonthGrid: React.FC<MonthGridProps> = React.memo(({
  year,
  month,
  selectedDate,
  onDateSelect,
  getDayData,
}) => {
  const firstDay = dayjs(`${year}-${month + 1}-01`);
  const daysInMonth = firstDay.daysInMonth();
  const startDayOfWeek = firstDay.day();

  const today = dayjs();
  const isCurrentMonth = today.year() === year && today.month() === month;

  const days: (number | null)[] = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const remainingCells = 7 - (days.length % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      days.push(null);
    }
  }

  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    return isCurrentMonth && today.date() === day;
  };

  return (
    <div className="px-4">
      {/* 월 헤더 */}
      <div className="sticky top-0 z-10 bg-bg-secondary py-3">
        <h2 className="font-title-sb text-text-primary">
          {year}년 {month + 1}월
        </h2>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day, idx) => (
          <div
            key={day}
            className={`text-center font-caption-m py-2 ${
              idx === 0 ? 'text-urgent' : idx === 6 ? 'text-primary' : 'text-text-tertiary'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayData = getDayData?.(dateStr);
          const selected = isSelected(day);
          const todayMark = isToday(day);
          const dayOfWeek = (startDayOfWeek + day - 1) % 7;

          return (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(year, month, day))}
              className="relative aspect-square flex flex-col items-center justify-center"
            >
              {/* 진행률 링 */}
              {dayData?.percentage !== null && dayData?.percentage !== undefined && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ProgressRing percent={dayData.percentage} />
                </div>
              )}

              {/* 날짜 숫자 */}
              <span
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                  selected
                    ? 'bg-primary text-white'
                    : todayMark
                    ? 'bg-primary/20 text-primary font-bold'
                    : dayOfWeek === 0
                    ? 'text-urgent'
                    : dayOfWeek === 6
                    ? 'text-primary'
                    : 'text-text-primary'
                }`}
              >
                {day}
              </span>

              {/* 시험일 표시 */}
              {dayData?.isExamDay && (
                <div className="absolute bottom-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

MonthGrid.displayName = 'MonthGrid';
