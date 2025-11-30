import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  AppBar,
  TopCertList,
  MainActions,
  UpcomingCertsSection,
  MyRemindCertsSection,
} from '@/widgets';
import { SearchBar, SearchResults, useSearchStore } from '@/features/search';

import { PROJECT_NAME_EN } from '@/shared/constants/core';

const MainPage = () => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const { isSearch, handleInputFocus } = useSearchStore();

  React.useEffect(() => {
    if (isSearch) {
      searchInputRef.current?.focus();
      handleInputFocus();
    }
  }, [isSearch, handleInputFocus]);

  return (
    <main className="bg-bg-secondary text-text-primary pt-safe overflow-x-hidden">
      <section className="flex flex-col gap-(--layout-content-gap)">
        {!isSearch && <AppBar variant="titleBell" title={PROJECT_NAME_EN} />}

        <motion.div layout className="px-(--layout-page-px)">
          <SearchBar inputRef={searchInputRef} />

          <motion.div
            layout
            animate={{
              opacity: isSearch ? 0 : 1,
              y: isSearch ? -50 : 0,
              pointerEvents: isSearch ? 'none' : 'auto',
            }}
            transition={{ duration: 0.1 }}
            className={`w-full pb-(--layout-section-gap) ${isSearch && 'hidden'}`}
          >
            <MainActions />
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
            className="flex flex-col gap-(--layout-section-gap)"
          >
            <MyRemindCertsSection />
            <section className="flex flex-col gap-(--layout-content-gap) pt-(--layout-section-gap) pb-8 px-(--layout-page-px) bg-bg-primary">
              <TopCertList
                title={
                  <div className="pb-2">
                    <span className="text-primary">20대</span>
                    <span>에게 가장 인기 많은 자격증</span>
                  </div>
                }
              />
            </section>
            <UpcomingCertsSection />
          </motion.div>
        ) : (
          <motion.section
            key="search-results-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="px-(--layout-page-px)"
          >
            <SearchResults />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainPage;
