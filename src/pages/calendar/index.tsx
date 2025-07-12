import { useCalendarStore, useUiStore } from '@/app/store';
import { ReminingDateLabel } from '@/entities';
import {
  useCreateTodo,
  useFindByDate,
} from '@/entities/todo/hooks/todo.hooks';
import {
  CreateTodoDto,
  CreateTodoItemDto,
} from '@/entities/todo/model/todo.model';
import { BottomSheet, Button, CheckBoxInput, MainLoading } from '@/shared';
import { formatDate } from '@/shared/util';
import { CalendarBox } from '@/widgets';
import { Plus } from 'lucide-react';
import React from 'react';

const createEmptyTodo = (): CreateTodoItemDto => ({
  title: '',
  isCompleted: false,
});

const getLocalDateString = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

const useTodoState = (selectedDate: Date) => {
  const dateKey = getLocalDateString(selectedDate);
  const { data: todoData, isLoading } = useFindByDate(dateKey);
  const [todos, setTodos] = React.useState<CreateTodoItemDto[]>([]);

  React.useEffect(() => {
    if (!todoData || isLoading) return;

    const parsedTodos = (
      todoData.todos.length > 0 ? todoData.todos : [createEmptyTodo()]
    ).map((t) => ({
      title: t.title ?? '',
      isCompleted: !!t.isCompleted,
    }));

    setTodos(parsedTodos);
  }, [todoData, isLoading]);

  return { todos, setTodos, isLoading };
};

const Calendar = () => {
  const { isCalendarBottomSheetOpen, setIsCalendarBottomSheetOpen } =
    useUiStore();
  const { selectedDate } = useCalendarStore();
  const { weekday, day, month } = formatDate(selectedDate);
  const { todos, setTodos, isLoading: isTodoLoading } =
    useTodoState(selectedDate);
  const { mutate: createTodo } = useCreateTodo();

  const handleSubmitClick = () => {
    const scheduledDate = getLocalDateString(selectedDate);
    const validTodos = todos.filter((t) => t.title.trim() !== '');

    if (validTodos.length === 0) {
      alert('최소 하나 이상의 할 일이 필요합니다.');
      return;
    }

    const todoDto: CreateTodoDto = {
      date: scheduledDate,
      todos: validTodos,
    };

    createTodo(todoDto, {
      onSuccess: () => {
        setIsCalendarBottomSheetOpen(false);
      },
    });
  };

  const handleAddTodo = () => {
    if (todos[todos.length - 1]?.title.trim() === '') return;
    setTodos([...todos, createEmptyTodo()]);
  };

  if (isTodoLoading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <MainLoading />
      </main>
    );
  }

  return (
    <main className="flex flex-col pb-20">
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
          <p className="font-headline-m">체크리스트</p>
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
              onClick={handleAddTodo}
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
