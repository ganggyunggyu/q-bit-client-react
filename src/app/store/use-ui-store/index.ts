import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type UiStore = {
  isCalendarBottomSheetOpen: boolean;
  setIsCalendarBottomSheetOpen: (isOpen: boolean) => void;
};

export const useUiStore = create<UiStore>()(
  subscribeWithSelector((set) => ({
    isCalendarBottomSheetOpen: false,
    setIsCalendarBottomSheetOpen: (isOpen) =>
      set({ isCalendarBottomSheetOpen: isOpen }),
  })),
);
