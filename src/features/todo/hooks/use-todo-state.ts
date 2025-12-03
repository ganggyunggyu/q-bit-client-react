import React from 'react';
import { useFindByDate } from '@/entities/todo/hooks/todo.hooks';
import { CreateTodoItemDto } from '@/entities/todo/model/todo.model';

const createEmptyTodo = (): CreateTodoItemDto => ({
  title: '',
  isCompleted: false,
});

export const getLocalDateString = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

export const useTodoState = (selectedDate: Date) => {
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

  const addTodo = () => {
    if (todos[todos.length - 1]?.title.trim() === '') return;
    setTodos([...todos, createEmptyTodo()]);
  };

  const updateTodo = (idx: number, updates: Partial<CreateTodoItemDto>) => {
    const updated = [...todos];
    updated[idx] = { ...todos[idx], ...updates };
    setTodos(updated);
  };

  return { todos, setTodos, addTodo, updateTodo };
};
