import { create } from 'zustand';

type UiStore = {
  isCalendarBottomSheetOpen: boolean;
  setIsCalendarBottomSheetOpen: (isOpen: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isCalendarBottomSheetOpen: false,
  setIsCalendarBottomSheetOpen: (isOpen) =>
    set({ isCalendarBottomSheetOpen: isOpen }),
}));
