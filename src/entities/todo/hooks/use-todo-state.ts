import React from 'react';
import { useFindByDate } from './todo.hooks';
import { CreateTodoItemDto } from '../model/todo.model';

export const createEmptyTodo = (): CreateTodoItemDto => ({
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

  console.log(todos);
  return { todos, setTodos, isLoading };
};
