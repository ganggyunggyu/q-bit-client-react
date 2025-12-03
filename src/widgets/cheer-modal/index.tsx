import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Flame, Star, Rocket, Heart } from 'lucide-react';

interface CheerModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak?: number;
  completedTasks?: number;
  totalTasks?: number;
  certName?: string;
}

const cheerMessages = [
  { emoji: '🔥', title: '오늘도 불태웠다!', sub: '꾸준함이 실력이 된다' },
  { emoji: '💪', title: '대단해! 멈추지 마!', sub: '한 걸음씩 목표를 향해' },
  { emoji: '🚀', title: '우주까지 날아갈 기세!', sub: '이 속도면 합격 확정' },
  { emoji: '⭐', title: '오늘의 별을 획득했어!', sub: '내일도 빛나는 하루 되길' },
  { emoji: '🎯', title: '목표를 향해 전진 중!', sub: '집중력 미쳤다' },
  { emoji: '🏆', title: '챔피언 각이다!', sub: '이대로만 가면 합격이야' },
  { emoji: '✨', title: '반짝반짝 빛나는 중!', sub: '노력은 배신하지 않아' },
  { emoji: '🌟', title: '넌 이미 스타야!', sub: '자격증도 곧 네 손에' },
];

const confettiColors = [
  '#62C2B0', // primary
  '#F3C969', // accent
  '#FF6B6B', // coral
  '#4ECDC4', // teal
  '#FFE66D', // yellow
  '#95E1D3', // mint
  '#F38181', // pink
  '#AA96DA', // purple
];

const ConfettiPiece = ({ delay, x }: { delay: number; x: number }) => {
  const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const rotation = Math.random() * 360;
  const size = 8 + Math.random() * 8;

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        left: `${x}%`,
        top: -20,
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: window.innerHeight + 50,
        rotate: rotation + 720,
        opacity: [1, 1, 0.8, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
};

const FloatingEmoji = ({ emoji, delay }: { emoji: string; delay: number }) => {
  const x = 10 + Math.random() * 80;

  return (
    <motion.div
      className="absolute text-3xl"
      style={{ left: `${x}%`, bottom: 0 }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -window.innerHeight * 0.7,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.8],
        rotate: [-10, 10, -10],
      }}
      transition={{
        duration: 3,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      {emoji}
    </motion.div>
  );
};

export const CheerModal: React.FC<CheerModalProps> = ({
  isOpen,
  onClose,
  streak = 0,
  completedTasks = 0,
  totalTasks = 0,
  certName,
}) => {
  const [confetti, setConfetti] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; delay: number }[]>([]);
  const [message] = useState(() => cheerMessages[Math.floor(Math.random() * cheerMessages.length)]);

  const generateConfetti = useCallback(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setConfetti(pieces);
  }, []);

  const generateFloatingEmojis = useCallback(() => {
    const emojis = ['🎉', '✨', '💫', '🌟', '⭐', '🔥', '💪', '🎯'];
    const floaters = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: i * 0.15,
    }));
    setFloatingEmojis(floaters);
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateConfetti();
      generateFloatingEmojis();
    }
  }, [isOpen, generateConfetti, generateFloatingEmojis]);

  if (typeof window === 'undefined') return null;

  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 그라데이션 배경 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#62C2B0] via-[#4DB8A4] to-[#3AA897]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* 컨페티 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map((piece) => (
              <ConfettiPiece key={piece.id} delay={piece.delay} x={piece.x} />
            ))}
          </div>

          {/* 떠오르는 이모지 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingEmojis.map((item) => (
              <FloatingEmoji key={item.id} emoji={item.emoji} delay={item.delay} />
            ))}
          </div>

          {/* 빛나는 원형 효과 */}
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 메인 콘텐츠 */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-8 text-center"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
          >
            {/* 메인 이모지 */}
            <motion.div
              className="text-8xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [-5, 5, -5],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {message.emoji}
            </motion.div>

            {/* 타이틀 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-display-1 text-white font-bold drop-shadow-lg">
                {message.title}
              </h1>
              <p className="font-body-m text-white/90 mt-2">
                {message.sub}
              </p>
            </motion.div>

            {/* 스트릭 표시 */}
            {streak > 0 && (
              <motion.div
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Flame className="text-orange-300" size={24} />
                </motion.div>
                <span className="font-headline-sb text-white">{streak}일 연속 학습 중!</span>
              </motion.div>
            )}

            {/* 진행률 카드 */}
            {totalTasks > 0 && (
              <motion.div
                className="w-full max-w-xs bg-white/20 backdrop-blur-sm rounded-[--radius-lg] p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body-sb text-white">오늘의 학습</span>
                  <span className="font-headline-sb text-white">{progressPercent}%</span>
                </div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p className="font-caption-m text-white/80 mt-2">
                  {completedTasks}/{totalTasks} 완료
                </p>
              </motion.div>
            )}

            {/* 자격증 이름 */}
            {certName && (
              <motion.div
                className="flex items-center gap-2 text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Trophy size={18} />
                <span className="font-body-m">{certName} 도전 중</span>
              </motion.div>
            )}
          </motion.div>

          {/* 닫기 버튼 */}
          <motion.button
            className="absolute bottom-12 px-8 py-4 bg-white rounded-full shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            <span className="font-headline-sb text-[--color-primary]">확인했어요!</span>
          </motion.button>

          {/* 하단 장식 아이콘들 */}
          <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-4 pointer-events-none">
            {[Star, Sparkles, Heart, Rocket].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <Icon className="text-white/40" size={20} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
