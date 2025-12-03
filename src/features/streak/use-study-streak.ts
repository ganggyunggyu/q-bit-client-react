import { useMemo } from 'react';
import { useGetMonthTodos } from '@/entities/todo/hooks/todo.hooks';
import { Todo } from '@/entities/todo/model/todo.model';

export type StreakLevel = 'ice' | 'fire-tiny' | 'fire-small' | 'fire-medium' | 'fire-large' | 'fire-max';

const formatDateStr = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const hasCompletedTodo = (todos: Todo[], dateStr: string): boolean => {
  const todo = todos.find((t) => t.scheduledDateStr === dateStr);
  if (!todo) return false;
  return todo.todos.some((t) => t.isCompleted);
};

export const useStudyStreak = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const { data: currentMonthTodos, isLoading: isCurrentLoading } =
    useGetMonthTodos(currentYear, currentMonth);
  const { data: lastMonthTodos, isLoading: isLastLoading } =
    useGetMonthTodos(lastMonthYear, lastMonth);

  const isLoading = isCurrentLoading || isLastLoading;

  const { streak, longestStreak } = useMemo(() => {
    if (!currentMonthTodos && !lastMonthTodos) {
      return { streak: 0, longestStreak: 0 };
    }

    const allTodos = [...(lastMonthTodos || []), ...(currentMonthTodos || [])];

    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    const checkDate = new Date(today);

    // 오늘 아직 완료한 게 없으면 어제부터 체크
    const todayStr = formatDateStr(today);
    if (!hasCompletedTodo(allTodos, todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // 연속 스트릭 계산 (최대 60일)
    for (let i = 0; i < 60; i++) {
      const dateStr = formatDateStr(checkDate);

      if (hasCompletedTodo(allTodos, dateStr)) {
        tempStreak++;
        if (i === 0 || currentStreak > 0) {
          currentStreak = tempStreak;
        }
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        if (currentStreak > 0) break; // 현재 스트릭이 끊기면 중단
        tempStreak = 0;
      }

      checkDate.setDate(checkDate.getDate() - 1);
    }

    maxStreak = Math.max(maxStreak, tempStreak);

    return {
      streak: currentStreak,
      longestStreak: Math.max(maxStreak, currentStreak),
    };
  }, [currentMonthTodos, lastMonthTodos, today]);

  const streakLevel: StreakLevel = useMemo(() => {
    if (streak >= 30) return 'fire-max';
    if (streak >= 14) return 'fire-large';
    if (streak >= 7) return 'fire-medium';
    if (streak >= 3) return 'fire-small';
    if (streak >= 1) return 'fire-tiny';
    return 'ice';
  }, [streak]);

  return {
    streak,
    longestStreak,
    streakLevel,
    isLoading,
  };
};
