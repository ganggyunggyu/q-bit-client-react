import { axios } from '@/app/config';
import { useCalendarStore, useUiStore } from '@/app/store';
import { ReminingDateLabel } from '@/entities';
import { BottomSheet, Button, CheckBoxInput, cn } from '@/shared';
import { formatDate } from '@/shared/util';
import { CalendarBox } from '@/widgets';

export const getTodo = async () => {
  const result = await axios.get('/todo');

  console.log(result);
};

const Calendar = () => {
  const { isCalendarBottomSheetOpen, setIsCalendarBottomSheetOpen } =
    useUiStore();
  const { selectedDate } = useCalendarStore();

  const { weekday, day } = formatDate(selectedDate);

  getTodo();

  return (
    <main className="flex">
      <CalendarBox />

      <BottomSheet
        isBottomSheet={isCalendarBottomSheetOpen}
        setIsBottomSheet={setIsCalendarBottomSheetOpen}
      >
        <section className="flex items-center justify-between py-4">
          <div className="flex gap-3">
            <p className="font-title-sb text-primary">{day}일</p>
            <p className="font-title-sb text-primary">{weekday}요일</p>
          </div>
          <ReminingDateLabel day={10} />
        </section>

        <section className="py-4">
          <p className="font-headline-m ">체크리스트</p>
          <div className="border border-divide rounded-3xl">
            <CheckBoxInput label="할일을 입력하세요." />
            <CheckBoxInput label="할일을 입력하세요." />
            <CheckBoxInput label="할일을 입력하세요." />
          </div>
        </section>

        <section className="py-4">
          <p className="font-headline-m">메모</p>
        </section>

        <Button variant="outline" size="lg">
          수정
        </Button>
      </BottomSheet>
    </main>
  );
};

export default Calendar;
