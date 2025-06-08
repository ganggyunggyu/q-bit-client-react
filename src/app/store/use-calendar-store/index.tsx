import { create } from 'zustand';

interface CalendarState {
  selectedDate: Date;
  displayDate: Date;
  setSelectedDate: (date: Date) => void;
  setDisplayDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date(2025, 4, 17),
  displayDate: new Date(2025, 4, 17),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setDisplayDate: (date) => set({ displayDate: date }),
}));
