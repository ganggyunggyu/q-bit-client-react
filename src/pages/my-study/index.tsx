import { slideVariants } from '@/app/motion';
import { Button, CheckBoxInput, Tabs } from '@/shared';
import { TitleAppBar, WeeklyCalendar } from '@/widgets';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export const MyStudyPage = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTab, setSelectedTab] = React.useState('planner');

  return (
    <main className="h-[calc(100vh - 184px)] py-2 bg-alternative">
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
              <WeeklyCalendar
                selectedDate={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
              />

              <section className="p-4">
                <p className="font-headline-m">체크리스트</p>
                <div className="border border-divide rounded-3xl bg-white">
                  <CheckBoxInput label="할일을 입력하세요." />
                  <CheckBoxInput label="할일을 입력하세요." />
                  <CheckBoxInput label="할일을 입력하세요." />
                </div>
              </section>

              <section className="p-4">
                <p className="font-headline-m">메모</p>
                <div className="border border-divide rounded-3xl bg-white">
                  <CheckBoxInput label="할일을 입력하세요." />
                  <CheckBoxInput label="할일을 입력하세요." />
                  <CheckBoxInput label="할일을 입력하세요." />
                </div>
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
