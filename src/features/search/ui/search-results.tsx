import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchCertsByKeyword } from '@/entities/cert/hooks/cert.hooks';
import { CertCard } from '@/features';
import { Button, MainLoading } from '@/shared';
import { useSearchStore } from '../model/search.store';

export const SearchResults: React.FC = () => {
  const { query, inputValue, isTyping } = useSearchStore();

  const { data: resultsData, isLoading: searchLoading } =
    useSearchCertsByKeyword(query);
  const results = Array.isArray(resultsData) ? resultsData : [];

  return (
    <ul className="mt-3 px-4 space-y-2 min-h-[80px]">
      <article className="flex gap-2">
        <Button size="sm" variant="primary">
          전체
        </Button>
        <Button size="sm" variant="secondary">
          접수중
        </Button>
        <Button size="sm" variant="secondary">
          접수 예정
        </Button>
      </article>

      {(isTyping || searchLoading) && (
        <div className="w-full flex items-center justify-center h-[50vh]">
          <MainLoading />
        </div>
      )}

      {!isTyping && !searchLoading && results.length > 0 && (
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
            className="text-neutral text-body-s"
          >
            검색 결과 없음
          </motion.li>
        )}
    </ul>
  );
};
