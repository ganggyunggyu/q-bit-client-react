import { create } from 'zustand';
import { debounce } from 'es-toolkit';
import { UI_TIMING } from '@/shared/constants/ui';

interface SearchState {
  isSearch: boolean;
  isFocus: boolean;
  inputValue: string;
  query: string;
  isTyping: boolean;

  setIsSearch: (value: boolean) => void;
  setIsFocus: (value: boolean) => void;
  setInputValue: (value: string) => void;
  setQuery: (value: string) => void;
  setIsTyping: (value: boolean) => void;

  handleInputChange: (value: string) => void;
  handleSearchPage: () => Promise<void>;
  handleBackClick: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  reset: () => void;
}

const debouncedSetQuery = debounce((set, value: string) => {
  set({ query: value, isTyping: false });
}, UI_TIMING.DEBOUNCE_DELAY);

export const useSearchStore = create<SearchState>((set) => ({
  isSearch: false,
  isFocus: false,
  inputValue: '',
  query: '',
  isTyping: false,

  setIsSearch: (value) => set({ isSearch: value }),
  setIsFocus: (value) => set({ isFocus: value }),
  setInputValue: (value) => set({ inputValue: value }),
  setQuery: (value) => set({ query: value }),
  setIsTyping: (value) => set({ isTyping: value }),

  handleInputChange: (value: string) => {
    set({ inputValue: value, isTyping: true });
    debouncedSetQuery(set, value);
  },

  handleSearchPage: async () => {
    set({ isSearch: true });
    await new Promise((resolve) =>
      setTimeout(resolve, UI_TIMING.ANIMATION_DELAY),
    );
  },

  handleBackClick: () => {
    set({
      isSearch: false,
      inputValue: '',
      query: '',
      isFocus: false,
    });
  },

  handleInputFocus: () => set({ isFocus: true }),
  handleInputBlur: () => set({ isFocus: false }),

  reset: () =>
    set({
      isSearch: false,
      isFocus: false,
      inputValue: '',
      query: '',
      isTyping: false,
    }),
}));
