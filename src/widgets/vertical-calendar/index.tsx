import React from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { MonthGrid } from './month-grid';
import { YearCalendar } from './year-calendar';
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

export const VerticalCalendar: React.FC = React.memo(() => {
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { setIsCalendarBottomSheetOpen } = useUiStore();

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const currentMonthRef = React.useRef<HTMLDivElement>(null);
  const [months, setMonths] = React.useState<MonthData[]>(() =>
    generateMonths(new Date(), 12),
  );
  const [showTodayButton, setShowTodayButton] = React.useState(false);
  const [visibleMonth, setVisibleMonth] = React.useState<string>('');
  const [showYearView, setShowYearView] = React.useState(false);
  const [yearViewYear, setYearViewYear] = React.useState(dayjs().year());

  // 핀치 제스처 상태
  const [pinchScale, setPinchScale] = React.useState(1);
  const lastTouchDistance = React.useRef<number | null>(null);

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
      container.scrollTop = target.offsetTop - 56;
    }
  }, []);

  // 핀치 제스처 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDistance.current = distance;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = distance / lastTouchDistance.current;
      setPinchScale(Math.max(0.5, Math.min(1.5, scale)));
    }
  };

  const handleTouchEnd = () => {
    if (pinchScale < 0.8) {
      // 핀치 아웃 (줌아웃) → 년뷰로 전환
      setYearViewYear(visibleYear);
      setShowYearView(true);
    }
    setPinchScale(1);
    lastTouchDistance.current = null;
  };

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
            container.scrollTop += 2000;
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

  // 년뷰 토글
  const handleYearViewToggle = () => {
    setYearViewYear(visibleYear);
    setShowYearView(true);
  };

  // 월 선택 (년뷰에서)
  const handleMonthSelect = (year: number, month: number) => {
    setShowYearView(false);
    // 해당 월로 스크롤
    setTimeout(() => {
      const targetKey = `${year}-${month}`;
      const container = scrollContainerRef.current;
      if (!container) return;

      const targetElement = container.querySelector(`[data-month-key="${targetKey}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="relative h-full flex flex-col bg-bg-secondary">
      {/* 스크롤 가능한 캘린더 영역 */}
      <motion.div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{ scrollBehavior: 'auto' }}
        animate={{
          scale: pinchScale < 1 ? pinchScale : 1,
          opacity: pinchScale < 0.9 ? 0.7 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="pt-safe">
          {months.map((monthData, idx) => {
            const isCurrentMonth = monthData.key === currentMonthKey;
            const isFirstVisible = idx === 0 || monthData.key === visibleMonth;

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
                  onYearViewToggle={handleYearViewToggle}
                  showYearViewButton={isFirstVisible || monthData.key === visibleMonth}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 오늘로 이동 버튼 */}
      <AnimatePresence>
        {showTodayButton && !showYearView && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToToday}
            className="absolute bottom-24 right-4 z-20 px-4 py-2.5 bg-primary text-white rounded-full shadow-lg flex items-center gap-2 font-body-sb active:scale-95 transition-transform"
          >
            <ChevronUp size={18} />
            오늘
          </motion.button>
        )}
      </AnimatePresence>

      {/* 년뷰 오버레이 */}
      <AnimatePresence>
        {showYearView && (
          <YearCalendar
            year={yearViewYear}
            onMonthSelect={handleMonthSelect}
            onClose={() => setShowYearView(false)}
            getDayData={getDayData}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

VerticalCalendar.displayName = 'VerticalCalendar';

export { MonthGrid } from './month-grid';
export { YearCalendar } from './year-calendar';
