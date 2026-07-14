import toast from 'react-hot-toast';
import { useCalendarStore, useUiStore } from '@/app/store';
import { RemainingDateLabel } from '@/entities';
import { useCreateTodo } from '@/entities/todo/hooks/todo.hooks';
import { CreateTodoDto } from '@/entities/todo/model/todo.model';
import { CertSelector, useTodoState, getLocalDateString } from '@/features/todo';
import { BottomSheet, Button, CheckBoxInput, Spinner } from '@/shared';
import { formatDate } from '@/shared/util';
import { VerticalCalendar } from '@/widgets';
import { Plus } from 'lucide-react';
import React from 'react';

const Calendar = () => {
  const { isCalendarBottomSheetOpen, setIsCalendarBottomSheetOpen } =
    useUiStore();
  const { selectedDate } = useCalendarStore();
  const { weekday, day, month } = formatDate(selectedDate);
  const {
    todos,
    setTodos,
    addTodo,
    isLoading: isTodoLoading,
  } = useTodoState(selectedDate);
  const { mutate: createTodo } = useCreateTodo();
  const [selectedCert, setSelectedCert] = React.useState<{
    certId?: string;
    certName?: string;
  }>({});

  const handleCertSelect = (certId?: string, certName?: string) => {
    setSelectedCert({ certId, certName });
  };

  const handleSubmitClick = () => {
    const scheduledDate = getLocalDateString(selectedDate);
    const validTodos = todos
      .filter((t) => t.title.trim() !== '')
      .map((t) => ({
        ...t,
        ...(selectedCert.certId && {
          certId: selectedCert.certId,
          certName: selectedCert.certName,
        }),
      }));

    if (validTodos.length === 0) {
      toast.error('최소 하나 이상의 할 일이 필요합니다.');
      return;
    }

    const todoDto: CreateTodoDto = {
      date: scheduledDate,
      todos: validTodos,
    };

    createTodo(todoDto, {
      onSuccess: () => {
        setIsCalendarBottomSheetOpen(false);
        setSelectedCert({});
      },
    });
  };

  if (isTodoLoading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col">
      <VerticalCalendar />

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
          <RemainingDateLabel day={10} />
        </section>

        <section className="flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <p className="font-headline-m">체크리스트</p>
            <CertSelector
              selectedCertId={selectedCert.certId}
              selectedCertName={selectedCert.certName}
              onSelect={handleCertSelect}
            />
          </div>
          <div className="border border-divide rounded-3xl bg-white">
            {todos.map((todo, idx) => (
              <CheckBoxInput
                key={`${idx}-${todo.isCompleted}`}
                label="할일을 입력하세요."
                checked={Boolean(todo.isCompleted)}
                onChange={() => {
                  const updated = [...todos];
                  updated[idx] = {
                    ...todo,
                    isCompleted: !todo.isCompleted,
                  };
                  setTodos(updated);
                }}
                inputProps={{
                  value: todo.title,
                  onChange: (e) => {
                    const updated = [...todos];
                    updated[idx] = {
                      ...todo,
                      title: e.target.value,
                    };
                    setTodos(updated);
                  },
                }}
              />
            ))}
            <Button
              className="rounded-3xl rounded-t-none gap-2 bg-white py-3 h-[48px] active:bg-alternative active:border-0"
              size="lg"
              disabled={todos[todos.length - 1]?.title.trim() === ''}
              onClick={addTodo}
            >
              <div className="bg-divide text-normal rounded-full">
                <Plus size={20} />
              </div>
              <p className="text-black-normal">추가</p>
            </Button>
          </div>
        </section>

        <Button onClick={handleSubmitClick} size="lg">
          저장
        </Button>
      </BottomSheet>
    </main>
  );
};

export default Calendar;
