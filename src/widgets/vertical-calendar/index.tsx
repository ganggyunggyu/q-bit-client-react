import React from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { MonthGrid } from './month-grid';
import { useCalendarStore, useUiStore } from '@/app/store';
import { useGetMonthTodos } from '@/entities/todo/hooks/todo.hooks';
import { useGetMyRemindCerts } from '@/entities';

type MonthData = {
  year: number;
  month: number;
  key: string;
};

const generateMonths = (centerDate: Date, range: number): MonthData[] => {
  const months: MonthData[] = [];
  const center = dayjs(centerDate);

  for (let i = -range; i <= range; i++) {
    const date = center.add(i, 'month');
    months.push({
      year: date.year(),
      month: date.month(),
      key: `${date.year()}-${date.month()}`,
    });
  }

  return months;
};

export const VerticalCalendar: React.FC = () => {
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { setIsCalendarBottomSheetOpen } = useUiStore();

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const currentMonthRef = React.useRef<HTMLDivElement>(null);
  const [months, setMonths] = React.useState<MonthData[]>(() =>
    generateMonths(new Date(), 12),
  );
  const [showTodayButton, setShowTodayButton] = React.useState(false);
  const [visibleMonth, setVisibleMonth] = React.useState<string>('');

  const today = dayjs();
  const currentMonthKey = `${today.year()}-${today.month()}`;

  // 현재 보이는 달의 투두 데이터 가져오기
  const visibleYear = visibleMonth ? parseInt(visibleMonth.split('-')[0]) : today.year();
  const visibleMonthNum = visibleMonth ? parseInt(visibleMonth.split('-')[1]) + 1 : today.month() + 1;

  const { data: todoList } = useGetMonthTodos(visibleYear, visibleMonthNum);
  const { data: remindCerts } = useGetMyRemindCerts();

  // 시험일 Set 생성
  const examDates = React.useMemo(() => {
    if (!remindCerts) return new Set<string>();

    const dates = new Set<string>();
    remindCerts.forEach((cert) => {
      cert.schedule?.forEach((s) => {
        if (s.writtenExamStart) {
          dates.add(dayjs(s.writtenExamStart).format('YYYY-MM-DD'));
        }
      });
    });
    return dates;
  }, [remindCerts]);

  // 날짜별 데이터 조회 함수
  const getDayData = React.useCallback(
    (dateStr: string) => {
      const matchedTodo = todoList?.find((d) => d?.scheduledDateStr === dateStr);
      const isExamDay = examDates.has(dateStr);

      if (!matchedTodo && !isExamDay) return null;

      let percentage: number | null = null;
      if (matchedTodo && matchedTodo.todos.length > 0) {
        const completed = matchedTodo.todos.filter((t) => t.isCompleted).length;
        percentage = (completed / matchedTodo.todos.length) * 100;
      }

      return { percentage, isExamDay };
    },
    [todoList, examDates],
  );

  // 초기 스크롤 위치 설정
  React.useEffect(() => {
    if (currentMonthRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const target = currentMonthRef.current;
      container.scrollTop = target.offsetTop - 56; // 헤더 높이 보정
    }
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 화면 중앙 기준으로 현재 월 감지
    const monthElements = container.querySelectorAll('[data-month-key]');
    const containerRect = container.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;

    let currentVisible = '';
    let minDistance = Infinity;

    monthElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elementCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(centerY - elementCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        currentVisible = el.getAttribute('data-month-key') || '';
      }
    });

    if (currentVisible) {
      setVisibleMonth(currentVisible);
      setShowTodayButton(currentVisible !== currentMonthKey);
    }

    // 무한 스크롤: 상단에 도달
    if (container.scrollTop < 200) {
      setMonths((prev) => {
        const firstMonth = prev[0];
        const newMonths: MonthData[] = [];

        for (let i = 6; i >= 1; i--) {
          const date = dayjs(`${firstMonth.year}-${firstMonth.month + 1}-01`).subtract(i, 'month');
          newMonths.push({
            year: date.year(),
            month: date.month(),
            key: `${date.year()}-${date.month()}`,
          });
        }

        // 스크롤 위치 보정
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop += 2000; // 대략적인 6개월 높이
          }
        });

        return [...newMonths, ...prev];
      });
    }

    // 무한 스크롤: 하단에 도달
    if (container.scrollHeight - container.scrollTop - container.clientHeight < 200) {
      setMonths((prev) => {
        const lastMonth = prev[prev.length - 1];
        const newMonths: MonthData[] = [];

        for (let i = 1; i <= 6; i++) {
          const date = dayjs(`${lastMonth.year}-${lastMonth.month + 1}-01`).add(i, 'month');
          newMonths.push({
            year: date.year(),
            month: date.month(),
            key: `${date.year()}-${date.month()}`,
          });
        }

        return [...prev, ...newMonths];
      });
    }
  }, [currentMonthKey]);

  // 오늘로 이동
  const scrollToToday = () => {
    if (currentMonthRef.current && scrollContainerRef.current) {
      currentMonthRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 날짜 선택 핸들러
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarBottomSheetOpen(true);
  };

  return (
    <div className="relative h-full flex flex-col bg-bg-secondary">
      {/* 스크롤 가능한 캘린더 영역 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="pt-safe">
          {months.map((monthData) => {
            const isCurrentMonth = monthData.key === currentMonthKey;

            return (
              <div
                key={monthData.key}
                data-month-key={monthData.key}
                ref={isCurrentMonth ? currentMonthRef : undefined}
                className="pb-6"
              >
                <MonthGrid
                  year={monthData.year}
                  month={monthData.month}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  getDayData={getDayData}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 오늘로 이동 버튼 */}
      <AnimatePresence>
        {showTodayButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToToday}
            className="absolute bottom-24 right-4 px-4 py-2.5 bg-primary text-white rounded-full shadow-lg flex items-center gap-2 font-body-sb active:scale-95 transition-transform"
          >
            <ChevronUp size={18} />
            오늘
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export { MonthGrid } from './month-grid';
