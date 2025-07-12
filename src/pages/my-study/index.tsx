import { slideVariants } from '@/app/motion';
import { useCreateOrUpdateMemo } from '@/entities/memo/hooks/memo.hooks';
import {
  useFindByDate,
  useCreateTodo,
  useFindAllTodos,
} from '@/entities/todo/hooks/todo.hooks';
import {
  CreateTodoDto,
  CreateTodoItemDto,
  Todo,
} from '@/entities/todo/model/todo.model';
import { Button, CheckBoxInput, Tabs } from '@/shared';
import { TitleAppBar, WeeklyCalendar } from '@/widgets';
import { AnimatePresence, motion } from 'framer-motion';
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

  console.log(todos);
  return { todos, setTodos };
};

const MyStudyPage = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTab, setSelectedTab] = React.useState('planner');
  const { todos, setTodos } = useTodoState(selectedDate);
  const [memo, setMemo] = React.useState('');

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: createMemo } = useCreateOrUpdateMemo();

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

    createTodo(todoDto);
  };

  const handleAddTodo = () => {
    if (todos[todos.length - 1]?.title.trim() === '') return;
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

              {/* memo 관련 섹션 제거 */}
              <section className="px-4 flex flex-col gap-4 pb-6">
                <p className="font-headline-m">메모</p>
                <textarea
                  placeholder="메모"
                  className="w-full h-32 px-4 py-3 rounded-3xl border border-divide bg-white text-body-m text-gray-900 placeholder:text-black-assistive/27 resize-none outline-none"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </section>

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
              className="h-full p-4"
              initial="initial"
              animate="animate"
              exit="exit"
              custom={-1}
            >
              <h2 className="font-headline-m mb-4">투두 통계</h2>
              <TodoCompletionStats />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default MyStudyPage;

interface TodoStats {
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
}

const calculateTodoStats = (todos: Todo[]): TodoStats => {
  let totalTodos = 0;
  let completedTodos = 0;

  todos.forEach((todoEntry) => {
    todoEntry.todos.forEach((todoItem) => {
      totalTodos++;
      if (todoItem.isCompleted) {
        completedTodos++;
      }
    });
  });

  const completionRate =
    totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

  return {
    totalTodos,
    completedTodos,
    completionRate: parseFloat(completionRate.toFixed(2)),
  };
};

const TodoCompletionStats: React.FC = () => {
  const { data: allTodos, isLoading } = useFindAllTodos({});

  if (isLoading) {
    return <p>통계 불러오는 중...</p>;
  }

  if (!allTodos || allTodos.length === 0) {
    return <p>아직 투두 데이터가 없습니다.</p>;
  }

  const stats = calculateTodoStats(allTodos);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <p className="text-body-m">총 투두 개수: {stats.totalTodos}</p>
      <p className="text-body-m">완료된 투두: {stats.completedTodos}</p>
      <p className="font-title-sb text-primary text-lg mt-2">
        완료율: {stats.completionRate}%
      </p>
      {/* 여기에 원형 차트 같은 시각화 추가 가능 */}
    </div>
  );
};
