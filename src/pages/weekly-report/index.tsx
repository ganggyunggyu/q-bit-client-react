import React from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { AppBar } from '@/widgets';
import { Button, MainLoading } from '@/shared';
import { useGetWeeklyReport, WeeklyReportResponse, DailyStat } from '@/entities/ai-report';

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
          className="w-6 bg-bg-tertiary rounded-t-md transition-all"
          style={{ height: `${height}%` }}
        >
          <div
            className="w-full bg-primary rounded-t-md absolute bottom-0"
            style={{ height: `${completedHeight}%` }}
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

const WeeklyReportPage = () => {
  const [weekOffset, setWeekOffset] = React.useState(0);

  const getSundayDate = (offset: number) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek + offset * 7);
    return sunday.toISOString().split('T')[0];
  };

  const sundayDate = getSundayDate(weekOffset);
  const { data: report, isLoading, refetch, isRefetching } = useGetWeeklyReport(sundayDate);

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`;
  };

  const maxTotal = report?.dailyStats
    ? Math.max(...report.dailyStats.map((s) => s.total), 1)
    : 1;

  return (
    <main className="min-h-screen bg-bg-secondary pt-safe pb-(--layout-bottom-bar-height)">
      <AppBar variant="titleBack" title="주간 리포트" />

      <div className="px-(--layout-page-px) pt-4">
        {/* 주차 선택 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="p-2 rounded-lg bg-bg-primary shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} className="text-text-secondary" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span className="font-body-sb text-text-primary">
              {report ? formatDateRange(report.weekStart, report.weekEnd) : '이번 주'}
            </span>
          </div>
          <button
            onClick={() => setWeekOffset((prev) => Math.min(prev + 1, 0))}
            disabled={weekOffset >= 0}
            className={`p-2 rounded-lg bg-bg-primary shadow-sm active:scale-95 transition-transform ${
              weekOffset >= 0 ? 'opacity-40' : ''
            }`}
          >
            <ChevronRight size={20} className="text-text-secondary" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <MainLoading />
          </div>
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
            <Sparkles size={48} className="text-text-tertiary mb-4" />
            <p className="font-body-sb text-text-primary mb-2">
              아직 리포트가 없어요
            </p>
            <p className="font-body-m text-text-tertiary mb-6">
              AI가 이번 주 학습 패턴을 분석해드릴게요
            </p>
            <Button
              variant="primary"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="gap-2"
            >
              {isRefetching ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  리포트 작성하기
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default WeeklyReportPage;
