import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, X } from 'lucide-react';
import { useSearchStore } from '../model/search.store';

interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ inputRef }) => {
  const {
    isSearch,
    inputValue,
    handleBackClick,
    handleInputFocus,
    handleInputChange,
  } = useSearchStore();

  if (!isSearch) return null;

  const handleClear = () => {
    handleInputChange('');
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 w-full py-2"
    >
      {/* 뒤로가기 버튼 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onClick={handleBackClick}
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:bg-bg-tertiary active:scale-95 transition-all"
      >
        <ArrowLeft size={22} />
      </motion.button>

      {/* 검색 인풋 */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.9 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.05 }}
        className="relative flex-1"
      >
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
        />
        <input
          ref={inputRef}
          placeholder="자격증을 검색해보세요"
          className="w-full h-12 pl-11 pr-11 rounded-xl bg-bg-tertiary border-2 border-transparent focus:border-primary focus:bg-bg-primary outline-none transition-all duration-200 text-text-primary placeholder:text-text-tertiary font-body-m"
          value={inputValue}
          onFocus={handleInputFocus}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {inputValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-text-tertiary/20 flex items-center justify-center hover:bg-text-tertiary/30 transition-colors"
          >
            <X size={14} className="text-text-tertiary" />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};
