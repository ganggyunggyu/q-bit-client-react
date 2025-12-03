import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, TrendingUp, Clock, Zap } from 'lucide-react';
import { useRouter } from '@/shared';
import { useSearchStore } from '@/features/search/model/search.store';

const TRENDING_TAGS = ['정보처리기사', '컴활', 'SQLD', 'ADsP', '한국사'];

const QuickTag = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-3 py-1.5 rounded-full bg-bg-tertiary text-text-secondary font-caption-sb whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-colors"
  >
    {label}
  </motion.button>
);

export const MainActions: React.FC = () => {
  const { navigate } = useRouter();
  const { handleSearchPage, handleInputChange } = useSearchStore();

  const handleAiRecommendClick = () => {
    navigate('/ai-recommend');
  };

  const onSearchClick = async () => {
    await handleSearchPage();
  };

  const handleTagClick = async (tag: string) => {
    handleInputChange(tag);
    await handleSearchPage();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 바 */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-2xl bg-bg-primary flex items-center gap-3 shadow-sm border border-divide/50 hover:border-primary/30 transition-all"
        onClick={onSearchClick}
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Search size={20} className="text-primary" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-body-sb text-text-primary">자격증 검색</p>
          <p className="font-caption-m text-text-tertiary">원하는 자격증을 찾아보세요</p>
        </div>
      </motion.button>

      {/* 인기 검색 태그 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={14} className="text-accent" />
          <span className="font-caption-sb text-text-tertiary">인기 검색</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {TRENDING_TAGS.map((tag) => (
            <QuickTag key={tag} label={tag} onClick={() => handleTagClick(tag)} />
          ))}
        </div>
      </div>

      {/* AI 추천 카드 */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAiRecommendClick}
        className="relative w-full p-4 rounded-2xl bg-gradient-to-r from-primary via-primary to-accent text-white overflow-hidden shadow-lg shadow-primary/20"
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
        </div>

        <div className="relative flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Sparkles size={24} />
          </motion.div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <p className="font-headline-sb">AI 맞춤 추천</p>
              <span className="px-2 py-0.5 rounded-full bg-white/20 font-caption-sb text-xs">
                NEW
              </span>
            </div>
            <p className="font-caption-m text-white/80">나에게 딱 맞는 자격증을 찾아드려요</p>
          </div>
          <Zap size={20} className="text-white/60" />
        </div>
      </motion.button>

      {/* 빠른 통계 */}
      <div className="flex gap-3">
        <motion.div
          whileHover={{ y: -2 }}
          className="flex-1 p-3 rounded-xl bg-bg-primary border border-divide/50"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-text-tertiary" />
            <span className="font-caption-m text-text-tertiary">다가오는 시험</span>
          </div>
          <p className="font-body-sb text-primary">12월 14일</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="flex-1 p-3 rounded-xl bg-bg-primary border border-divide/50"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-text-tertiary" />
            <span className="font-caption-m text-text-tertiary">이번 주 학습</span>
          </div>
          <p className="font-body-sb text-accent">+15% 상승</p>
        </motion.div>
      </div>
    </div>
  );
};
