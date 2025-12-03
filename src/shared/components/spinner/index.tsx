import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div
      className={cn(
        'rounded-full border-primary border-t-transparent animate-spin',
        sizeMap[size],
        className,
      )}
    />
  );
};

interface AILoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

const floatingIcons = [
  { Icon: Sparkles, delay: 0, position: 'top-0 left-1/2 -translate-x-1/2' },
  { Icon: Brain, delay: 0.3, position: 'bottom-0 left-0' },
  { Icon: Zap, delay: 0.6, position: 'bottom-0 right-0' },
];

export const AILoadingSpinner: React.FC<AILoadingSpinnerProps> = ({
  message = 'AI가 분석 중이에요',
  subMessage = '잠시만 기다려주세요',
}) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* 메인 스피너 영역 */}
      <div className="relative w-32 h-32">
        {/* 외부 링 - 느리게 회전 */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          style={{ borderTopColor: 'var(--color-primary)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* 중간 링 - 반대로 회전 */}
        <motion.div
          className="absolute inset-3 rounded-full border-4 border-accent/20"
          style={{ borderBottomColor: 'var(--color-accent)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* 내부 링 - 빠르게 회전 */}
        <motion.div
          className="absolute inset-6 rounded-full border-4 border-primary/30"
          style={{ borderLeftColor: 'var(--color-primary)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* 중앙 아이콘 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-primary">
            <Sparkles className="text-white" size={24} />
          </div>
        </motion.div>

        {/* 플로팅 아이콘들 */}
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-bg-primary shadow-sm flex items-center justify-center">
              <Icon size={16} className="text-primary" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 텍스트 영역 */}
      <div className="text-center">
        <motion.p
          className="font-body-sb text-text-primary mb-1"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
          <span className="inline-block w-6 text-left">{dots}</span>
        </motion.p>
        <p className="font-caption-m text-text-tertiary">{subMessage}</p>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-48 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-primary to-accent rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ width: '50%' }}
        />
      </div>
    </div>
  );
};
