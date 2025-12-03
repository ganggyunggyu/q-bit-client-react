import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { AppBar } from '@/widgets';
import { Button, AILoadingSpinner } from '@/shared';
import { useGetWeeklyReport, DailyStat } from '@/entities/ai-report';

const LeaveConfirmModal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-bg-primary rounded-2xl p-6 shadow-xl"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-cautious/10 flex items-center justify-center mb-4">
              <AlertTriangle size={28} className="text-cautious" />
            </div>
            <h3 className="font-title-sb text-text-primary mb-2">
              정말 나가시겠어요?
            </h3>
            <p className="font-body-m text-text-secondary mb-6">
              조금만 기다리면 AI 분석 결과가 나와요!
            </p>
            <div className="flex gap-3 w-full">
              <Button
                variant="secondary"
                size="md"
                onClick={onConfirm}
                className="flex-1"
              >
                나가기
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={onCancel}
                className="flex-1"
              >
                기다리기
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, icon, color }) => (
  <div className="flex-1 p-4 bg-bg-primary rounded-xl shadow-sm">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
      {icon}
    </div>
    <p className="font-caption-m text-text-tertiary mb-1">{label}</p>
    <p className="font-headline-sb text-text-primary">{value}</p>
  </div>
);

const DailyBar: React.FC<{ stat: DailyStat; maxTotal: number }> = ({ stat, maxTotal }) => {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(stat.date);
  const dayName = dayNames[date.getDay()];
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const height = maxTotal > 0 ? (stat.total / maxTotal) * 100 : 0;
  const completedHeight = stat.total > 0 ? (stat.completed / stat.total) * height : 0;

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="relative w-full h-24 flex items-end justify-center">
        <div
          className="relative w-6 bg-bg-tertiary rounded-t-md transition-all"
          style={{ height: `${height}%` }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md"
            style={{ height: stat.total > 0 ? `${(stat.completed / stat.total) * 100}%` : '0%' }}
          />
        </div>
      </div>
      <span className={`font-caption-m ${isWeekend ? 'text-urgent' : 'text-text-tertiary'}`}>
        {dayName}
      </span>
    </div>
  );
};

const SectionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
  delay?: number;
}> = ({ title, icon, items, color, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-bg-primary rounded-xl p-5 shadow-sm"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h3 className="font-body-sb text-text-primary">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span className="font-body-m text-text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  </motion.section>
);

interface WeekInfo {
  weekNum: number;
  sundayDate: string;
  startDate: Date;
  endDate: Date;
  label: string;
  isCurrent: boolean;
}

const getWeeksInMonth = (year: number, month: number): WeekInfo[] => {
  const weeks: WeekInfo[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 첫 번째 일요일 찾기
  let currentSunday = new Date(firstDay);
  const firstDayOfWeek = firstDay.getDay();
  if (firstDayOfWeek !== 0) {
    currentSunday.setDate(firstDay.getDate() - firstDayOfWeek);
  }

  let weekNum = 1;
  while (currentSunday <= lastDay) {
    const startDate = new Date(currentSunday);
    const endDate = new Date(currentSunday);
    endDate.setDate(endDate.getDate() + 6);

    // 해당 주가 이 달에 포함되는지 확인 (일요일~토요일 중 하나라도 이 달이면 포함)
    const isInMonth = startDate.getMonth() === month || endDate.getMonth() === month;

    if (isInMonth) {
      const isCurrent = today >= startDate && today <= endDate;
      weeks.push({
        weekNum,
        sundayDate: startDate.toISOString().split('T')[0],
        startDate,
        endDate,
        label: `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`,
        isCurrent,
      });
      weekNum++;
    }

    currentSunday.setDate(currentSunday.getDate() + 7);
  }

  return weeks;
};

const WeeklyReportPage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = React.useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selectedWeekIndex, setSelectedWeekIndex] = React.useState<number | null>(null);
  const [showLeaveModal, setShowLeaveModal] = React.useState(false);

  const weeks = React.useMemo(
    () => getWeeksInMonth(selectedMonth.year, selectedMonth.month),
    [selectedMonth.year, selectedMonth.month],
  );

  // 현재 주 자동 선택
  React.useEffect(() => {
    const currentWeekIdx = weeks.findIndex((w) => w.isCurrent);
    if (currentWeekIdx !== -1) {
      setSelectedWeekIndex(currentWeekIdx);
    } else if (weeks.length > 0) {
      setSelectedWeekIndex(weeks.length - 1);
    }
  }, [weeks]);

  const selectedWeek = selectedWeekIndex !== null ? weeks[selectedWeekIndex] : null;
  const sundayDate = selectedWeek?.sundayDate || '';

  const { data: report, isLoading, refetch, isRefetching } = useGetWeeklyReport(sundayDate);

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { ...prev, month: prev.month - 1 };
    });
    setSelectedWeekIndex(null);
  };

  const handleNextMonth = () => {
    const now = new Date();
    const isCurrentMonth = selectedMonth.year === now.getFullYear() && selectedMonth.month === now.getMonth();
    if (isCurrentMonth) return;

    setSelectedMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { ...prev, month: prev.month + 1 };
    });
    setSelectedWeekIndex(null);
  };

  const isCurrentMonth =
    selectedMonth.year === today.getFullYear() && selectedMonth.month === today.getMonth();

  const isAnalyzing = isLoading || isRefetching;

  React.useEffect(() => {
    if (!isAnalyzing) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAnalyzing]);

  const handleBack = () => {
    if (isAnalyzing) {
      setShowLeaveModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleLeaveConfirm = () => {
    setShowLeaveModal(false);
    navigate(-1);
  };

  const maxTotal = report?.dailyStats
    ? Math.max(...report.dailyStats.map((s) => s.total), 1)
    : 1;

  return (
    <main className="min-h-screen bg-bg-secondary pt-safe">
      <AppBar variant="titleBack" title="주간 리포트" onBack={handleBack} />

      <LeaveConfirmModal
        isOpen={showLeaveModal}
        onConfirm={handleLeaveConfirm}
        onCancel={() => setShowLeaveModal(false)}
      />

      <div className="px-(--layout-page-px) pt-4">
        {/* 월 선택 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg bg-bg-primary shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} className="text-text-secondary" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span className="font-body-sb text-text-primary">
              {selectedMonth.year}년 {selectedMonth.month + 1}월
            </span>
          </div>
          <button
            onClick={handleNextMonth}
            disabled={isCurrentMonth}
            className={`p-2 rounded-lg bg-bg-primary shadow-sm active:scale-95 transition-transform ${
              isCurrentMonth ? 'opacity-40' : ''
            }`}
          >
            <ChevronRight size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* 주차 선택 (세로 리스트) */}
        <div className="flex flex-col gap-2 mb-6">
          {weeks.map((week, index) => (
            <button
              key={week.sundayDate}
              onClick={() => setSelectedWeekIndex(index)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all active:scale-[0.98] ${
                selectedWeekIndex === index
                  ? 'bg-primary text-white shadow-primary'
                  : 'bg-bg-primary shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-body-sb ${
                    selectedWeekIndex === index ? 'text-white' : 'text-text-primary'
                  }`}
                >
                  {week.weekNum}주차
                </span>
                <span
                  className={`font-caption-m ${
                    selectedWeekIndex === index ? 'text-white/80' : 'text-text-tertiary'
                  }`}
                >
                  {week.label}
                </span>
              </div>
              {week.isCurrent && (
                <span
                  className={`px-2 py-0.5 rounded-full font-caption-m ${
                    selectedWeekIndex === index
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  이번 주
                </span>
              )}
            </button>
          ))}
        </div>

        {isLoading || isRefetching ? (
          <AILoadingSpinner
            message="AI가 학습 패턴을 분석 중이에요"
            subMessage="최대 30초 정도 걸릴 수 있어요"
          />
        ) : report ? (
          <div className="flex flex-col gap-6">
            {/* 요약 카드 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-br from-primary to-primary-dark rounded-xl p-5 text-white shadow-primary"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} />
                <span className="font-body-sb">AI 주간 요약</span>
              </div>
              <p className="font-body-m leading-relaxed">{report.summary}</p>
            </motion.section>

            {/* 통계 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-3"
            >
              <StatCard
                label="전체 할 일"
                value={report.totalTodos}
                icon={<Target size={18} className="text-primary" />}
                color="bg-primary/10"
              />
              <StatCard
                label="완료"
                value={report.completedTodos}
                icon={<CheckCircle2 size={18} className="text-green" />}
                color="bg-green/10"
              />
              <StatCard
                label="달성률"
                value={`${report.weeklyCompletionRate}%`}
                icon={
                  report.weeklyCompletionRate >= 70 ? (
                    <TrendingUp size={18} className="text-primary" />
                  ) : (
                    <TrendingDown size={18} className="text-urgent" />
                  )
                }
                color={report.weeklyCompletionRate >= 70 ? 'bg-primary/10' : 'bg-urgent/10'}
              />
            </motion.div>

            {/* 일별 차트 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-primary rounded-xl p-5 shadow-sm"
            >
              <h3 className="font-body-sb text-text-primary mb-4">일별 진행 현황</h3>
              <div className="flex gap-2">
                {report.dailyStats.map((stat) => (
                  <DailyBar key={stat.date} stat={stat} maxTotal={maxTotal} />
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-primary" />
                  <span className="font-caption-m text-text-tertiary">완료</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-bg-tertiary" />
                  <span className="font-caption-m text-text-tertiary">전체</span>
                </div>
              </div>
            </motion.section>

            {/* 잘한 점 */}
            {report.achievements.length > 0 && (
              <SectionCard
                title="잘한 점"
                icon={<CheckCircle2 size={16} className="text-green" />}
                items={report.achievements}
                color="bg-green/10"
                delay={0.3}
              />
            )}

            {/* 개선할 점 */}
            {report.improvements.length > 0 && (
              <SectionCard
                title="개선할 점"
                icon={<AlertCircle size={16} className="text-cautious" />}
                items={report.improvements}
                color="bg-cautious/10"
                delay={0.4}
              />
            )}

            {/* 다음 주 추천 */}
            {report.nextWeekSuggestions.length > 0 && (
              <SectionCard
                title="다음 주 추천"
                icon={<Lightbulb size={16} className="text-accent" />}
                items={report.nextWeekSuggestions}
                color="bg-accent/10"
                delay={0.5}
              />
            )}

            {/* 격려 메시지 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-bg-primary rounded-xl p-5 shadow-sm text-center"
            >
              <p className="text-2xl mb-3">💪</p>
              <p className="font-body-m text-text-secondary leading-relaxed">
                {report.encouragement}
              </p>
            </motion.section>

            {/* 새로고침 버튼 */}
            <Button
              variant="secondary"
              size="lg"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="gap-2"
            >
              <RefreshCw size={18} className={isRefetching ? 'animate-spin' : ''} />
              리포트 새로고침
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-text-tertiary" />
            </div>
            <p className="font-body-sb text-text-primary mb-2">
              아직 리포트가 없어요
            </p>
            <p className="font-body-m text-text-tertiary mb-6">
              AI가 이번 주 학습 패턴을 분석해드릴게요
            </p>
            <Button variant="primary" onClick={() => refetch()} className="gap-2">
              <Sparkles size={18} />
              리포트 작성하기
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default WeeklyReportPage;
