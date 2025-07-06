// src/pages/my-study/index.tsx

import { slideVariants } from '@/app/motion';
import {
  useFindByDate, // 변경
  useCreateTodo, // 변경
} from '@/entities/todo/hooks/todo.hooks'; // 경로 변경
import {
  CreateTodoDto, // 추가
  CreateTodoItemDto, // 추가
} from '@/entities/todo/model/todo.model'; // 경로 변경
import { Button, CheckBoxInput, Tabs } from '@/shared';
import { TitleAppBar, WeeklyCalendar } from '@/widgets';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import React from 'react';

// 로컬 Todo 타입 정의 제거

const createEmptyTodo = (): CreateTodoItemDto => ({ title: '', isCompleted: false }); // 변경

const getLocalDateString = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

const useTodoState = (selectedDate: Date) => {
  const dateKey = getLocalDateString(selectedDate);
  const { data: todoData, isLoading } = useFindByDate(dateKey); // 변경
  const [todos, setTodos] = React.useState<CreateTodoItemDto[]>([]); // 타입 변경
  // const [memo, setMemo] = React.useState(''); // memo 관련 상태 제거

  React.useEffect(() => {
    if (!todoData || isLoading) return;

    const parsedTodos = (
      todoData.todos.length > 0 ? todoData.todos : [createEmptyTodo()]
    ).map((t) => ({
      title: t.title ?? '', // 변경
      isCompleted: !!t.isCompleted, // 변경
    }));

    setTodos(parsedTodos);
    // setMemo(todoData.memo?.content ?? ''); // memo 관련 상태 제거
  }, [todoData, isLoading]);

  console.log(todos);
  return { todos, setTodos }; // 반환값 변경
};

const MyStudyPage = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTab, setSelectedTab] = React.useState('planner');
  const { todos, setTodos } = // 반환값 변경
    useTodoState(selectedDate);
  // const [memo, setMemo] = React.useState(''); // memo 관련 상태 제거

  const { mutate: createTodo } = useCreateTodo(); // 변경

  const handleSubmitClick = () => {
    const scheduledDate = getLocalDateString(selectedDate);
    const validTodos = todos.filter((t) => t.title.trim() !== ''); // 변경

    if (validTodos.length === 0) {
      alert('최소 하나 이상의 할 일이 필요합니다.');
      return;
    }

    const todoDto: CreateTodoDto = { // CreateTodoDto 타입 명시
      date: scheduledDate,
      todos: validTodos,
    };

    createTodo(todoDto); // memo 관련 인자 제거
  };

  const handleAddTodo = () => {
    if (todos[todos.length - 1]?.title.trim() === '') return; // 변경
    setTodos([...todos, createEmptyTodo()]);
  };

  return (
    <main className="h-[calc(100vh - 184px)] bg-alternative pb-[100px]">
      <TitleAppBar title="내 스터디" />
      <Tabs
        tabKey="study-tab"
        selected={selectedTab}
        onSelect={setSelectedTab}
        tabs={[
          { id: 'planner', label: '플래너' },
          { id: 'stats', label: '통계' },
        ]}
      />
      <div className="relative min-h-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === 'planner' && (
            <motion.div
              key="planner"
              variants={slideVariants}
              className="h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              <section className="pb-6">
                <WeeklyCalendar
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />
              </section>

              <section className="px-4 flex flex-col gap-4 pb-6">
                <p className="font-headline-m">체크리스트</p>
                <div className="border border-divide rounded-3xl bg-white">
                  {todos.map((todo, idx) => (
                    <CheckBoxInput
                      key={`${idx}-${todo.isCompleted}`} // 변경
                      label="할일을 입력하세요."
                      checked={Boolean(todo.isCompleted)} // 변경
                      onChange={() => {
                        const updated = [...todos];
                        updated[idx] = {
                          ...todo,
                          isCompleted: !todo.isCompleted, // 변경
                        };
                        setTodos(updated);
                      }}
                      inputProps={{
                        value: todo.title, // 변경
                        onChange: (e) => {
                          const updated = [...todos];
                          updated[idx] = {
                            ...todo,
                            title: e.target.value, // 변경
                          };
                          setTodos(updated);
                        },
                      }}
                    />
                  ))}

                  <Button
                    className="rounded-3xl rounded-t-none gap-2 bg-white py-3 h-[48px] active:bg-alternative active:border-0"
                    size="lg"
                    disabled={todos[todos.length - 1]?.title.trim() === ''} // 변경
                    onClick={handleAddTodo}
                  >
                    <div className="bg-divide text-normal rounded-full">
                      <Plus size={20} />
                    </div>
                    <p className="text-black-normal">추가</p>
                  </Button>
                </div>
              </section>

              {/* memo 관련 섹션 제거 */}
              {/* <section className="px-4 flex flex-col gap-4 pb-6">
                <p className="font-headline-m">메모</p>
                <textarea
                  placeholder="메모"
                  className="w-full h-32 px-4 py-3 rounded-3xl border border-divide bg-white text-body-m text-gray-900 placeholder:text-black-assistive/27 resize-none outline-none"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </section> */}

              <section className="px-4">
                <Button onClick={handleSubmitClick} size="lg">
                  저장
                </Button>
              </section>
            </motion.div>
          )}

          {selectedTab === 'stats' && (
            <motion.div
              key="stats"
              variants={slideVariants}
              className="h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              custom={-1}
            >
              <Button size="lg">전체 분석</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default MyStudyPage;