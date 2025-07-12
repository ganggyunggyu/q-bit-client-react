import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce, delay } from 'es-toolkit';

import { TitleBellAppBar, TopCertList } from '@/widgets';
import { CertCard } from '@/features';

import { useGetMe } from '@/entities/auth/hooks/auth.hooks';
import {
  useGetSearchCertByJmnm,
  useGetUpcomingCerts,
} from '@/entities/cert/hooks/cert.hooks';
import { BackIcon, Button, MainLoading, useRouter } from '@/shared';
import { PROJECT_NAME_EN } from '@/shared/constants/core';

const MainPage = () => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  useRouter();
  const { data: certList, isLoading: certLoading } = useGetUpcomingCerts(3);
  const { data: results = [], isLoading: searchLoading } =
    useGetSearchCertByJmnm(query);

  const { data: user } = useGetMe();

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const debouncedSetQuery = React.useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
        setIsTyping(false);
      }, 300),
    [],
  );

  const handleInputFocus = () => {
    searchInputRef.current.focus();
    setIsFocus(true);
  };
  const handleInputBlur = () => setIsFocus(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(true);
    debouncedSetQuery(value);
  };

  const handleSearchPage = async () => {
    setIsSearch(true);
    await delay(500);
    handleInputFocus();
  };
  const handleBackClick = () => {
    setIsSearch(false);
    setInputValue('');
    setQuery('');
    handleInputBlur();
  };

  return (
    <main className="pb-[80px] bg-alternative overflow-hidden text-black-normal">
      <section className="flex gap-4 flex-col justify-center w-full pt-10">
        {!isSearch && <TitleBellAppBar title={PROJECT_NAME_EN} />}

        <motion.div layout className="mx-4 ">
          <div
            className={`relative w-full h-[44px] flex transition-all
            ${isSearch ? 'opacity-100' : 'opacity-0 hidden'}
            `}
          >
            <button
              onClick={handleBackClick}
              className={`w-full h-full absolute top-0  ${isFocus ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'} transition-all`}
            >
              <BackIcon />
            </button>
            <input
              ref={searchInputRef}
              className={`absolute top-0 px-4 right-0 text-start h-full border-[1.5px] rounded-full border-primary focus:border-primary bg-white transition-all ${isFocus ? 'w-[88%]' : 'w-full'}`}
              value={inputValue}
              onFocus={handleInputFocus}
              // onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </div>

          <motion.div
            layout
            animate={{
              opacity: isSearch ? 0 : 1,
              y: isSearch ? -50 : 0,
              pointerEvents: isSearch ? 'none' : 'auto',
            }}
            transition={{ duration: 0.1 }}
            className={`w-full pb-6 ${isSearch && 'hidden'}`}
          >
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
          </motion.div>
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
                  <div className="pb-2">
                    <span className="text-primary">20대</span>
                    <span>에게 가장 인기 많은 자격증</span>
                  </div>
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
          <motion.section
            key="search-results-section"
            className="pb-[100px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="mt-3 px-4 space-y-2 min-h-[80px]">
              <article className="flex gap-2">
                <Button size="sm" variant="trans">
                  전체
                </Button>
                <Button size="sm" variant="normal">
                  접수중
                </Button>
                <Button size="sm" variant="normal">
                  접수 예정
                </Button>
              </article>

              {(isTyping || searchLoading) && (
                <div className="w-full flex items-center justify-center h-[50vh]">
                  <MainLoading />
                </div>
              )}

              {!isTyping && !searchLoading && results.length > 0 && (
                <React.Fragment>
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
                </React.Fragment>
              )}

              {!isTyping &&
                !searchLoading &&
                inputValue.trim() !== '' &&
                results.length === 0 && (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-body-s"
                  >
                    검색 결과 없음
                  </motion.li>
                )}
            </ul>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainPage;
