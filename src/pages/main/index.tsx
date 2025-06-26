import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'es-toolkit';

import { TitleBellAppBar, TopCertList } from '@/widgets';
import { CertCard } from '@/features';
import {
  getAuthMe,
  useUpcomingCertList,
  useSearchCertNameQuery,
} from '@/entities';
import { BackIcon, Button, Input, useRouter } from '@/shared';
import { PROJECT_NAME_EN } from '@/shared/constants/core';

const MainPage = () => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);

  const [inputValue, setInputValue] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const { navigate } = useRouter();
  const { data: certList, isLoading: certLoading } = useUpcomingCertList({
    limit: 3,
  });
  const { data: results = [], isLoading: searchLoading } =
    useSearchCertNameQuery(query);

  React.useEffect(() => {
    getAuthMe();
  }, []);

  const debouncedSetQuery = React.useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
        setIsTyping(false);
      }, 300),
    [],
  );

  const handleInputFocus = () => setIsFocus(true);
  const handleInputBlur = () => setIsFocus(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(true);
    debouncedSetQuery(value);
  };

  const handleSearchPage = () => setIsSearch(true);
  const handleBackClick = () => {
    setIsSearch(false);
    setInputValue('');
    setQuery('');
  };

  const handleNameClick = (id: string) => {
    navigate(`/search/${id}`);
  };

  return (
    <main className="flex flex-col pb-[80px] bg-alternative overflow-hidden text-black-normal">
      <section className="relative flex gap-4 flex-col justify-center w-full pb-6 ">
        {!isSearch && <TitleBellAppBar title={PROJECT_NAME_EN} />}

        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="w-11/12 mx-auto"
        >
          {isSearch ? (
            <div className="flex items-center w-full">
              <AnimatePresence initial={false} mode="wait">
                {isFocus && (
                  <motion.button
                    key="back-icon"
                    onClick={handleBackClick}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="mr-2 shrink-0"
                  >
                    <BackIcon />
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.div
                key="input-field"
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex-1"
              >
                <Input
                  className="w-full text-start border-[2px]"
                  variant="default"
                  value={inputValue}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                />
              </motion.div>
            </div>
          ) : (
            <article className="pb-2">
              <Button
                className="w-full h-[44px] text-start border-[2px]"
                variant="shadow"
                size="lg"
                isSearch
                onClick={handleSearchPage}
              >
                <p className="w-full text-left pl-10 text-primary/50 font-body-m mb">
                  찾고있는 자격증을 검색해보세요.
                </p>
              </Button>
            </article>
          )}
        </motion.div>
      </section>

      <AnimatePresence mode="wait">
        {!isSearch ? (
          <motion.div
            key="main-contents"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col"
          >
            <section className="flex flex-col gap-2 pt-6 pb-8 px-4 bg-normal">
              <TopCertList
                title={
                  <p className="pb-2">
                    <span className="text-primary">20대</span>
                    <span>에게 가장 인기 많은 자격증</span>
                  </p>
                }
              />
            </section>
            <section className="bg-bg-primary flex flex-col gap-2 rounded-t-2xl pt-4 pb-8 px-4">
              <p className="text-black-primary font-headline-m pb-2">
                접수까지 일주일!
              </p>

              {!certLoading &&
                certList.map((cert, index) => {
                  const scheduleDate = new Date(cert.scheduleDate);
                  const now = new Date();
                  const diffTime = scheduleDate.getTime() - now.getTime();
                  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  return <CertCard key={index} cert={cert} dDay={dDay} />;
                })}
            </section>
          </motion.div>
        ) : (
          <motion.ul
            key="search-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mt-3 px-4 space-y-2 min-h-[80px]"
          >
            {(isTyping || searchLoading) && (
              <div className="flex justify-center items-center py-6">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!isTyping && !searchLoading && results.length > 0 && (
              <React.Fragment>
                {results.map((result) => (
                  <li
                    key={result._id}
                    onClick={() => handleNameClick(result._id)}
                    className="flex items-center text-gray-500 text-body-s gap-2 cursor-pointer"
                  >
                    <span className="i-tabler-search text-gray-400" />
                    {result.jmfldnm}
                  </li>
                ))}
              </React.Fragment>
            )}

            {!isTyping &&
              !searchLoading &&
              inputValue.trim() !== '' &&
              results.length === 0 && (
                <li className="text-gray-400 text-body-s asd">
                  검색 결과 없음
                </li>
              )}
          </motion.ul>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainPage;
