import { motion } from 'framer-motion';
import { Flame, Snowflake } from 'lucide-react';
import { StreakLevel } from './use-study-streak';

interface StudyStreakBadgeProps {
  streak: number;
  streakLevel: StreakLevel;
  isLoading?: boolean;
}

const streakConfig: Record<StreakLevel, { color: string; bgColor: string; size: number }> = {
  ice: { color: 'text-blue-400', bgColor: 'bg-blue-50', size: 16 },
  'fire-tiny': { color: 'text-orange-300', bgColor: 'bg-orange-50', size: 16 },
  'fire-small': { color: 'text-orange-400', bgColor: 'bg-orange-50', size: 18 },
  'fire-medium': { color: 'text-orange-500', bgColor: 'bg-orange-100', size: 20 },
  'fire-large': { color: 'text-red-500', bgColor: 'bg-red-100', size: 22 },
  'fire-max': { color: 'text-red-600', bgColor: 'bg-red-100', size: 24 },
};

export const StudyStreakBadge = ({
  streak,
  streakLevel,
  isLoading,
}: StudyStreakBadgeProps) => {
  const config = streakConfig[streakLevel];
  const isIce = streakLevel === 'ice';

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-secondary animate-pulse">
        <div className="w-4 h-4 rounded-full bg-bg-tertiary" />
        <div className="w-12 h-4 rounded bg-bg-tertiary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bgColor}`}
    >
      {isIce ? (
        <Snowflake size={config.size} className={config.color} />
      ) : (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Flame size={config.size} className={config.color} />
        </motion.div>
      )}
      <span className={`font-body-sb ${config.color}`}>
        {isIce ? '스트릭 시작하기' : `${streak}일 연속`}
      </span>
    </motion.div>
  );
};
