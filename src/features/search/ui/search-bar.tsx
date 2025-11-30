import React from 'react';
import { BackIcon } from '@/shared';
import { Search } from 'lucide-react';
import { useSearchStore } from '../model/search.store';

interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ inputRef }) => {
  const {
    isSearch,
    isFocus,
    inputValue,
    handleBackClick,
    handleInputFocus,
    handleInputChange,
  } = useSearchStore();

  if (!isSearch) return null;

  return (
    <div className="flex items-center gap-2 w-full h-13 transition-all duration-normal">
      <button
        onClick={handleBackClick}
        className={`shrink-0 p-2 rounded-sm text-primary hover:bg-bg-secondary active:scale-95 transition-all duration-fast ${isFocus ? 'opacity-100 w-auto' : 'opacity-0 w-0 p-0 overflow-hidden'}`}
      >
        <BackIcon />
      </button>
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
        />
        <input
          ref={inputRef}
          placeholder="자격증 검색..."
          className="w-full h-13 pl-11 pr-4 rounded-md bg-bg-secondary border-2 border-transparent focus:border-primary focus:bg-bg-primary outline-none transition-all duration-normal text-text-primary placeholder:text-text-tertiary font-body-m"
          value={inputValue}
          onFocus={handleInputFocus}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};
