import React from 'react';
import { debounce } from 'es-toolkit';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, ChevronRight, Award, TrendingUp } from 'lucide-react';

import { AppBar } from '@/widgets';
import { useSearchCertsByKeyword } from '@/entities/cert/hooks/cert.hooks';
import { useRouter, Spinner } from '@/shared';

const POPULAR_KEYWORDS = ['정보처리기사', 'SQLD', '컴퓨터활용능력', 'ADsP', '빅데이터분석기사'];

const Search = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const { navigate } = useRouter();

  const debouncedSetQuery = React.useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
        setIsTyping(false);
      }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(true);
    debouncedSetQuery(value);
  };

  const { data: results = [], isLoading } = useSearchCertsByKeyword(query);

  const handleNameClick = (id: string) => {
    navigate(`/search/${id}`);
  };

  const handleKeywordClick = (keyword: string) => {
    setInputValue(keyword);
    setQuery(keyword);
  };

  const showInitialState = !inputValue.trim() && !isTyping && !isLoading;
  const showLoading = isTyping || isLoading;
  const showResults = !isTyping && !isLoading && results.length > 0;
  const showNoResults = !isTyping && !isLoading && inputValue.trim() !== '' && results.length === 0;

  return (
    <main className="min-h-screen bg-bg-secondary pt-safe">
      <AppBar
        variant="search"
        inputProps={{
          placeholder: '자격증을 검색해보세요',
          value: inputValue,
          onChange: handleChange,
        }}
      />

      <div className="px-(--layout-page-px) pt-4">
        <AnimatePresence mode="wait">
          {/* 초기 상태 - 인기 검색어 */}
          {showInitialState && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              {/* 인기 검색어 */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-primary" />
                  <h3 className="font-body-sb text-text-primary">인기 검색어</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_KEYWORDS.map((keyword, index) => (
                    <button
                      key={keyword}
                      onClick={() => handleKeywordClick(keyword)}
                      className="flex items-center gap-2 px-3 py-2 bg-bg-primary rounded-full shadow-sm active:scale-95 transition-transform"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-caption-sb flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="font-body-m text-text-secondary">{keyword}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* 검색 팁 */}
              <section className="bg-bg-primary rounded-xl p-4 shadow-sm">
                <p className="font-body-sb text-text-primary mb-2">검색 팁</p>
                <ul className="space-y-1">
                  <li className="font-caption-m text-text-tertiary">• 자격증 이름으로 검색해보세요</li>
                  <li className="font-caption-m text-text-tertiary">• 약어로도 검색할 수 있어요 (예: 정처기)</li>
                </ul>
              </section>
            </motion.div>
          )}

          {/* 로딩 상태 */}
          {showLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-12"
            >
              <Spinner size="lg" />
            </motion.div>
          )}

          {/* 검색 결과 */}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="font-caption-m text-text-tertiary mb-3">
                검색 결과 {results.length}건
              </p>
              <ul className="flex flex-col gap-2">
                {results.map((result, index) => (
                  <motion.li
                    key={result._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleNameClick(result._id)}
                      className="w-full flex items-center justify-between p-4 bg-bg-primary rounded-xl shadow-sm active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award size={20} className="text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="font-body-sb text-text-primary">{result.name}</p>
                          {result.agency && (
                            <p className="font-caption-m text-text-tertiary">{result.agency}</p>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-text-tertiary" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* 검색 결과 없음 */}
          {showNoResults && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
                <SearchIcon size={28} className="text-text-tertiary" />
              </div>
              <p className="font-body-sb text-text-primary mb-1">
                '{inputValue}'에 대한 검색 결과가 없어요
              </p>
              <p className="font-caption-m text-text-tertiary">
                다른 키워드로 검색해보세요
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Search;
