import { slideVariants } from '@/app/motion';
import { useCreateOrUpdateMemo } from '@/entities/memo/hooks/memo.hooks';
import { useCreateTodo } from '@/entities/todo/hooks/todo.hooks';
import { CreateTodoDto } from '@/entities/todo/model/todo.model';
import { CertSelector, useTodoState, getLocalDateString } from '@/features/todo';
import { Button, CheckBoxInput, Tabs } from '@/shared';
import { WeeklyCalendar, TodoCompletionStats } from '@/widgets';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Sparkles, ChevronRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyStudyPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTab, setSelectedTab] = React.useState('planner');
  const { todos, setTodos, addTodo, updateTodo } = useTodoState(selectedDate);
  const [memo, setMemo] = React.useState('');
  const [selectedCert, setSelectedCert] = React.useState<{
    certId?: string;
    certName?: string;
  }>({});

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: createMemo } = useCreateOrUpdateMemo();

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
      alert('최소 하나 이상의 할 일이 필요합니다.');
      return;
    }

    const todoDto: CreateTodoDto = {
      date: scheduledDate,
      todos: validTodos,
    };

    createTodo(todoDto, {
      onSuccess: () => {
        setSelectedCert({});
      },
    });
  };

  return (
    <main className="flex flex-col h-screen bg-bg-secondary pt-safe">
      <div className="sticky top-0 z-10 bg-bg-secondary">
        <Tabs
          tabKey="study-tab"
          selected={selectedTab}
          onSelect={setSelectedTab}
          tabs={[
            { id: 'planner', label: '플래너' },
            { id: 'stats', label: '통계' },
          ]}
        />
      </div>
      <section className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === 'planner' && (
            <motion.div
              key="planner"
              variants={slideVariants}
              className="min-h-full"
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
                      onChange={() => updateTodo(idx, { isCompleted: !todo.isCompleted })}
                      inputProps={{
                        value: todo.title,
                        onChange: (e) => updateTodo(idx, { title: e.target.value }),
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
              className="p-4 space-y-4"
              initial="initial"
              animate="animate"
              exit="exit"
              custom={-1}
            >
              <TodoCompletionStats />

              <button
                onClick={() => navigate('/weekly-report')}
                className="flex items-center justify-between p-4 bg-linear-to-r from-primary to-primary-dark rounded-xl text-white shadow-primary active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={20} />
                  <div className="text-left">
                    <p className="font-body-sb">AI 주간 리포트</p>
                    <p className="font-caption-m opacity-80">나의 학습 패턴을 분석해보세요</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default MyStudyPage;
