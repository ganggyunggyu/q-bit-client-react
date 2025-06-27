import { axios } from '@/app/config';
import { useCalendarStore, useUiStore } from '@/app/store';
import { ReminingDateLabel, useGetTodoList } from '@/entities';
import { BottomSheet, Button, CheckBoxInput, cn } from '@/shared';
import { formatDate } from '@/shared/util';
import { CalendarBox } from '@/widgets';
import React from 'react';

const Calendar = () => {
  const { isCalendarBottomSheetOpen, setIsCalendarBottomSheetOpen } =
    useUiStore();
  const { selectedDate } = useCalendarStore();

  const { weekday, day, month } = formatDate(selectedDate);

  const [memo, setMemo] = React.useState('');

  const { data: todoList, isLoading } = useGetTodoList();

  if (!isLoading) {
    console.log('가져온 Todo:', todoList);
  }

  return (
    <main className="flex">
      <CalendarBox />

      <BottomSheet
        isBottomSheet={isCalendarBottomSheetOpen}
        setIsBottomSheet={setIsCalendarBottomSheetOpen}
      >
        <section className="flex items-center justify-between pb-6">
          <div className="flex gap-1.5">
            <p className="font-title-sb text-primary">{month}월</p>
            <p className="font-title-sb text-primary">{day}일</p>
            <p className="font-title-sb text-primary ml-0.5">({weekday})</p>
          </div>
          <ReminingDateLabel day={10} />
        </section>

        <section className="flex flex-col gap-4 pb-6">
          <p className="font-headline-m ">체크리스트</p>
          <div className="border border-divide rounded-3xl">
            <CheckBoxInput label="할일을 입력하세요." />
          </div>
        </section>

        <section className="flex flex-col gap-4 pb-6">
          <p className="font-headline-m">메모</p>
          <textarea
            placeholder="메모"
            className="w-full h-32 px-4 py-3 rounded-3xl border border-divide bg-white text-body-m text-gray-900 placeholder:text-black-assistive/27 resize-none outline-none"
            value={memo}
            onChange={(e) => {
              setMemo(e.target.value);
            }}
          />
        </section>

        <Button variant="outline" size="lg">
          수정
        </Button>
      </BottomSheet>
    </main>
  );
};

export default Calendar;
