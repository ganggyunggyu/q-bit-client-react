import { create } from 'zustand';

interface CalendarState {
  selectedDate: Date;
  displayDate: Date;
  setSelectedDate: (date: Date) => void;
  setDisplayDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date(),
  displayDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setDisplayDate: (date) => set({ displayDate: date }),
}));
