import React from 'react';
import { Sparkles, Search } from 'lucide-react';
import { useRouter } from '@/shared';
import { useSearchStore } from '@/features/search/model/search.store';

export const MainActions: React.FC = () => {
  const { navigate } = useRouter();
  const { handleSearchPage } = useSearchStore();

  const handleAiRecommendClick = () => {
    navigate('/ai-recommend');
  };

  const onSearchClick = async () => {
    await handleSearchPage();
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        className="w-full h-13 px-4 rounded-md bg-bg-primary flex items-center gap-3 active:scale-[0.98] transition-all duration-fast shadow-xs hover:shadow-sm"
        onClick={onSearchClick}
      >
        <Search size={20} className="text-text-tertiary" />
        <span className="text-text-tertiary font-body-m">
          찾고있는 자격증을 검색해보세요.
        </span>
      </button>

      <button
        onClick={handleAiRecommendClick}
        className="w-full h-12 px-5 rounded-lg bg-primary text-white font-body-sb flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-fast shadow-primary hover:brightness-[0.97]"
      >
        <Sparkles size={18} />
        AI 자격증 추천 받기
      </button>
    </div>
  );
};
