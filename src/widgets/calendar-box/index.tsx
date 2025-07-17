import React from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { CaleanderAppBar } from '@/widgets';
import { useCalendarStore, useUiStore } from '@/app/store';
import { useGetMonthTodos } from '@/entities/todo/hooks/todo.hooks';
import { Todo } from '@/entities/todo/model/todo.model';
import dayjs from 'dayjs';

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

const calculateCompletionPercentage = (todos: Todo['todos']) => {
  if (!todos || todos.length === 0) return 0;
  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  return (completedCount / todos.length) * 100;
};

export const CalendarBox = () => {
  const { selectedDate, displayDate, setSelectedDate, setDisplayDate } =
    useCalendarStore();
  const { setIsCalendarBottomSheetOpen } = useUiStore();
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { data: todoList, isLoading: isTodoListLoading } = useGetMonthTodos(
    displayDate.getFullYear(),
    displayDate.getMonth() + 1,
  );

  const { data: remindCerts } = useGetMyRemindCerts();

  console.log(
    'CalendarBox - todoList:',
    todoList,
    'isLoading:',
    isTodoListLoading,
  );

  const examDates = React.useMemo(() => {
    if (!remindCerts) return new Set();

    const dates = new Set();
    remindCerts.forEach((cert) => {
      cert.schedule.forEach((s) => {
        if (s.docexamdt) {
          dates.add(dayjs(s.docexamdt).format('YYYY-MM-DD'));
        }
      });
    });
    return dates;
  }, [remindCerts]);

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
      className="relative h-[70vh] w-[95%] mx-auto overflow-hidden touch-pan-x"
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
              const newDateStr = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
              const currentSelectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

              if (newDateStr !== currentSelectedDateStr) {
                setSelectedDate(value);
              }
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
            tileContent={({ date }) => {
              const yyyy = date.getFullYear();
              const mm = String(date.getMonth() + 1).padStart(2, '0');
              const dd = String(date.getDate()).padStart(2, '0');
              const dateStr = `${yyyy}-${mm}-${dd}`;

              const matchedTodo = todoList?.find((d) => {
                return d?.scheduledDateStr === dateStr;
              });
              const isExamDay = examDates.has(dateStr);

              const content = [];

              if (matchedTodo && matchedTodo.todos.length > 0) {
                const percentage = calculateCompletionPercentage(
                  matchedTodo.todos,
                );
                content.push(
                  <div
                    key="progress"
                    className="absolute top-1/2 -translate-y-1/2"
                  >
                    <CalendarProgress percent={percentage} />
                  </div>,
                );
              }

              if (isExamDay) {
                content.push(
                  <div
                    key="exam-dot"
                    className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"
                  ></div>,
                );
              }

              return content.length > 0 ? <>{content}</> : null;
            }}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

import { useSpring, useTransform } from 'framer-motion';
import { useGetMyRemindCerts } from '@/entities';

type CalendarProgressProps = {
  percent: number;
};

export const CalendarProgress: React.FC<CalendarProgressProps> = ({
  percent,
}) => {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 7;

  const percentSpring = useSpring(0, {
    stiffness: 120,
    damping: 50,
  });

  React.useEffect(() => {
    percentSpring.set(percent);
  }, [percent, percentSpring]);

  const dashOffset = useTransform(
    percentSpring,
    (p) => circumference * (1 - p / 100),
  );

  const hue = useTransform(percentSpring, (h) => h);
  const strokeColor = useTransform(hue, (h) => `hsl(${h}, 92%, 68%)`);
  const bgColor = useTransform(hue, (h) => `hsl(${h}, 92%, 68%, 0.1)`);

  return (
    <svg width={32} height={32} viewBox="0 0 32 32">
      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />

      <motion.circle
        cx="16"
        cy="16"
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
        className="rounded-full"
      />
    </svg>
  );
};
