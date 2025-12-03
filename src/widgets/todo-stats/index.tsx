import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target, Flame, Trophy, Sparkles } from 'lucide-react';
import { useFindAllTodos } from '@/entities/todo/hooks/todo.hooks';
import { calculateTodoStats } from '@/entities/todo/lib/calculate-todo-stats';
import { Spinner } from '@/shared';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 140,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-bg-tertiary"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-display-b text-text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {Math.round(percentage)}%
        </motion.span>
        <span className="font-caption-m text-text-tertiary">달성률</span>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'primary' | 'success' | 'warning';
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, delay = 0 }) => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <motion.div
      className="flex-1 bg-bg-primary rounded-xl p-3 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className={`w-8 h-8 rounded-lg ${colorMap[color]} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="font-headline-m text-text-primary">{value}</p>
      <p className="font-caption-m text-text-tertiary">{label}</p>
    </motion.div>
  );
};

const getEncouragingMessage = (rate: number): { icon: React.ReactNode; message: string } => {
  if (rate >= 80) {
    return { icon: <Trophy className="text-warning" size={20} />, message: '대단해요! 목표 달성까지 얼마 안 남았어요!' };
  }
  if (rate >= 50) {
    return { icon: <Flame className="text-urgent" size={20} />, message: '잘하고 있어요! 절반 이상 완료했어요!' };
  }
  if (rate > 0) {
    return { icon: <Sparkles className="text-primary" size={20} />, message: '좋은 시작이에요! 조금씩 해나가요!' };
  }
  return { icon: <Target className="text-text-tertiary" size={20} />, message: '오늘의 첫 투두를 완료해보세요!' };
};

export const TodoCompletionStats: React.FC = () => {
  const { data: allTodos, isLoading } = useFindAllTodos({});

  if (isLoading) {
    return (
      <div className="bg-bg-primary rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="font-body-m text-text-tertiary">통계 불러오는 중...</p>
      </div>
    );
  }

  if (!allTodos || allTodos.length === 0) {
    return (
      <motion.div
        className="bg-bg-primary rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
          <Target size={28} className="text-text-tertiary" />
        </div>
        <p className="font-body-sb text-text-primary mb-1">아직 투두 데이터가 없어요</p>
        <p className="font-caption-m text-text-tertiary">플래너에서 할 일을 추가해보세요!</p>
      </motion.div>
    );
  }

  const stats = calculateTodoStats(allTodos);
  const remaining = stats.totalTodos - stats.completedTodos;
  const { icon, message } = getEncouragingMessage(stats.completionRate);

  return (
    <motion.div
      className="bg-bg-primary rounded-2xl p-5 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 원형 프로그레스 */}
      <div className="flex justify-center mb-5">
        <CircularProgress percentage={stats.completionRate} />
      </div>

      {/* 격려 메시지 */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-5 py-2 px-4 bg-bg-secondary rounded-full mx-auto w-fit"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        {icon}
        <p className="font-caption-sb text-text-secondary">{message}</p>
      </motion.div>

      {/* 스탯 카드 */}
      <div className="flex gap-3">
        <StatCard
          icon={<Target size={16} />}
          label="전체"
          value={stats.totalTodos}
          color="primary"
          delay={0.2}
        />
        <StatCard
          icon={<CheckCircle2 size={16} />}
          label="완료"
          value={stats.completedTodos}
          color="success"
          delay={0.3}
        />
        <StatCard
          icon={<Circle size={16} />}
          label="남은 일"
          value={remaining}
          color="warning"
          delay={0.4}
        />
      </div>
    </motion.div>
  );
};
