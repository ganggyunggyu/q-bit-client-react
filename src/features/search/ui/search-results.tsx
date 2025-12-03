import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, SearchX, Sparkles } from 'lucide-react';
import { useSearchCertsByKeyword } from '@/entities/cert/hooks/cert.hooks';
import { CertCard } from '@/features';
import { MainLoading } from '@/shared';
import { useSearchStore } from '../model/search.store';
import { cn } from '@/shared/lib';

const RECENT_SEARCHES = ['정보처리기사', 'SQLD', '컴활'];
const POPULAR_SEARCHES = ['정보처리기사', '컴퓨터활용능력', 'SQLD', 'ADsP', '한국사능력검정'];

type FilterType = 'all' | 'open' | 'upcoming';

const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'px-4 py-2 rounded-full font-body-sb text-sm transition-all whitespace-nowrap',
      active
        ? 'bg-primary text-white shadow-sm'
        : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
    )}
  >
    {label}
  </button>
);

const SearchTag = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-3 py-1.5 rounded-lg bg-bg-tertiary text-text-secondary font-caption-sb hover:bg-primary/10 hover:text-primary transition-colors"
  >
    {label}
  </motion.button>
);

const EmptyState = ({ query }: { query: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 gap-4"
  >
    <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center">
      <SearchX size={28} className="text-text-tertiary" />
    </div>
    <div className="text-center">
      <p className="font-body-sb text-text-primary mb-1">
        '{query}'에 대한 검색 결과가 없어요
      </p>
      <p className="font-caption-m text-text-tertiary">
        다른 키워드로 검색해보세요
      </p>
    </div>
  </motion.div>
);

const InitialState = ({
  onTagClick,
}: {
  onTagClick: (tag: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col gap-6 py-4"
  >
    {/* 최근 검색어 */}
    {RECENT_SEARCHES.length > 0 && (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-text-tertiary" />
          <span className="font-body-sb text-text-secondary">최근 검색</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {RECENT_SEARCHES.map((tag) => (
            <SearchTag key={tag} label={tag} onClick={() => onTagClick(tag)} />
          ))}
        </div>
      </div>
    )}

    {/* 인기 검색어 */}
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <TrendingUp size={16} className="text-accent" />
        <span className="font-body-sb text-text-secondary">인기 검색어</span>
      </div>
      <div className="flex flex-col">
        {POPULAR_SEARCHES.map((tag, index) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onTagClick(tag)}
            className="flex items-center gap-3 py-3 border-b border-divide/50 last:border-0 hover:bg-bg-tertiary/50 -mx-2 px-2 rounded-lg transition-colors"
          >
            <span
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center font-body-sb text-sm',
                index < 3
                  ? 'bg-primary/10 text-primary'
                  : 'bg-bg-tertiary text-text-tertiary'
              )}
            >
              {index + 1}
            </span>
            <span className="font-body-m text-text-primary">{tag}</span>
          </motion.button>
        ))}
      </div>
    </div>

    {/* AI 추천 배너 */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Sparkles size={20} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-body-sb text-text-primary">뭘 준비할지 모르겠다면?</p>
          <p className="font-caption-m text-text-tertiary">AI가 맞춤 자격증을 추천해드려요</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export const SearchResults: React.FC = () => {
  const { query, inputValue, isTyping, handleInputChange, handleSearchPage } = useSearchStore();
  const [filter, setFilter] = React.useState<FilterType>('all');

  const { data: resultsData, isLoading: searchLoading } =
    useSearchCertsByKeyword(query);
  const results = Array.isArray(resultsData) ? resultsData : [];

  const handleTagClick = async (tag: string) => {
    handleInputChange(tag);
    await handleSearchPage();
  };

  const showInitialState = !inputValue.trim() && !isTyping && !searchLoading;
  const showLoading = isTyping || searchLoading;
  const showResults = !isTyping && !searchLoading && results.length > 0;
  const showEmpty = !isTyping && !searchLoading && inputValue.trim() !== '' && results.length === 0;

  return (
    <div className="flex flex-col gap-4 min-h-[60vh]">
      {/* 필터 칩 */}
      {!showInitialState && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
        >
          <FilterChip
            label="전체"
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterChip
            label="접수중"
            active={filter === 'open'}
            onClick={() => setFilter('open')}
          />
          <FilterChip
            label="접수 예정"
            active={filter === 'upcoming'}
            onClick={() => setFilter('upcoming')}
          />
        </motion.div>
      )}

      {/* 초기 상태 */}
      {showInitialState && <InitialState onTagClick={handleTagClick} />}

      {/* 로딩 */}
      {showLoading && (
        <div className="flex items-center justify-center py-20">
          <MainLoading />
        </div>
      )}

      {/* 검색 결과 */}
      {showResults && (
        <div className="flex flex-col gap-3">
          <p className="font-caption-m text-text-tertiary">
            {results.length}개의 검색 결과
          </p>
          <AnimatePresence mode="wait">
            {results.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <CertCard cert={cert} dDay={cert.daysLeft} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 빈 상태 */}
      {showEmpty && <EmptyState query={inputValue} />}
    </div>
  );
};
