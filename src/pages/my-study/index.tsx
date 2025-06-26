import { slideVariants } from '@/app/motion';
import { Button, CheckBoxInput, Tabs } from '@/shared';
import { TitleAppBar, WeeklyCalendar } from '@/widgets';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import React from 'react';

export const prevTodos = [
  {
    _id: '666f1234567890abcdef001',
    userId: '666f1234567890abcdef123',
    createDate: '2025-06-25T10:00:00.000Z',
    scheduledDate: '2025-06-27T00:00:00.000Z',
    isComplete: false,
    content: '스터디 계획 세우기',
  },
  {
    _id: '666f1234567890abcdef002',
    userId: '666f1234567890abcdef123',
    createDate: '2025-06-25T10:05:00.000Z',
    scheduledDate: '2025-06-28T00:00:00.000Z',
    isComplete: true,
    content: '기출문제 풀기',
  },
  {
    _id: '666f1234567890abcdef003',
    userId: '666f1234567890abcdef123',
    createDate: '2025-06-25T10:10:00.000Z',
    scheduledDate: '2025-06-29T00:00:00.000Z',
    isComplete: false,
    content: '시험장 위치 확인',
  },
];

const MyStudyPage = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTab, setSelectedTab] = React.useState('planner');

  type Todo = {
    content: string;
    isComplete: boolean;
  };

  const inputTemplate = {
    _id: '',
    userId: '666f1234567890abcdef123',
    createDate: '2025-06-25T10:10:00.000Z',
    scheduledDate: '2025-06-29T00:00:00.000Z',
    isComplete: false,
    content: '',
  };

  const [todos, setTodos] = React.useState<Todo[]>([]);

  const [memo, setMemo] = React.useState('');

  React.useEffect(() => {
    const initTodo = [...todos, inputTemplate];

    setTodos([...initTodo]);
  }, []);

  const handleSubmitClick = () => {
    console.log(selectedDate);
    console.log(todos);
    console.log(memo);
  };
  return (
    <main className="h-[calc(100vh - 184px)] bg-alternative pb-[100px]">
      <TitleAppBar title={'내 스터디'} />
      <Tabs
        tabKey="study-tab"
        selected={selectedTab}
        onSelect={(id) => {
          setSelectedTab(id);
        }}
        tabs={[
          {
            id: 'planner',
            label: '플래너',
          },
          {
            id: 'stats',
            label: '통계',
          },
        ]}
      />
      <div className="relative min-h-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === 'planner' && (
            <motion.div
              key={selectedTab}
              variants={slideVariants}
              className="h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              custom={-1}
            >
              <section className="pb-6">
                <WeeklyCalendar
                  selectedDate={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                />
              </section>

              <section className="px-4 flex flex-col gap-4 pb-6">
                <p className="font-headline-m">체크리스트</p>
                <div className="border border-divide rounded-3xl bg-white">
                  {todos.map((todo, idx) => (
                    <CheckBoxInput
                      key={idx}
                      label="할일을 입력하세요."
                      checked={todo.isComplete}
                      onChange={() => {
                        console.log(todo.isComplete);
                      }}
                      inputProps={{
                        value: todo.content,
                        onChange: (e) => {
                          const updated = [...todos];
                          updated[idx].content = e.target.value;
                          setTodos(updated);
                        },
                      }}
                    />
                  ))}
                  <Button
                    className="rounded-3xl rounded-t-none gap-2 bg-white py-3 h-[48px] active:bg-alternative active:border-0"
                    size="lg"
                    disabled={todos[todos.length - 1]?.content?.trim() === ''}
                    onClick={() => {
                      if (todos[todos.length - 1]?.content?.trim() === '')
                        return;
                      setTodos([...todos, inputTemplate]);
                    }}
                  >
                    <div className="bg-divide text-normal rounded-full">
                      <Plus size={20} />
                    </div>
                    <p className="text-black-normal">추가</p>
                  </Button>
                </div>
              </section>

              <section className="px-4 flex flex-col gap-4 pb-6">
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

              <section className="px-4">
                <Button onClick={handleSubmitClick} size="lg">
                  저장
                </Button>
              </section>
            </motion.div>
          )}

          {selectedTab === 'stats' && (
            <motion.div
              key={selectedTab}
              variants={slideVariants}
              className="h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
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
