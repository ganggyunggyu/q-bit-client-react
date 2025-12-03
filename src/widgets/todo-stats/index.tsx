import React from 'react';
import { useFindAllTodos } from '@/entities/todo/hooks/todo.hooks';
import { calculateTodoStats } from '@/entities/todo/lib/calculate-todo-stats';

export const TodoCompletionStats: React.FC = () => {
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
    </div>
  );
};
