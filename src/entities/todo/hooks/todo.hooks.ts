import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postTodo,
  getTodoList,
  getTodoByDate,
  getTodoExists,
  getTodoWeek,
  getTodoMonth,
} from '../api';

export const usePostTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoList'] });
    },
  });
};

export const useGetTodoList = () => {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: getTodoList,
  });
};

export const useGetTodoByDate = (date: string) => {
  return useQuery({
    queryKey: ['todoByDate', date],
    queryFn: () => getTodoByDate(date),
    enabled: !!date,
  });
};

export const useGetTodoExists = (date: string) => {
  return useQuery({
    queryKey: ['todoExists', date],
    queryFn: () => getTodoExists(date),
    enabled: !!date,
  });
};

export const useGetTodoWeek = (sunday: string) => {
  return useQuery({
    queryKey: ['todoWeek', sunday],
    queryFn: () => getTodoWeek(sunday),
    enabled: !!sunday,
  });
};

export const useGetTodoMonth = (year: number, month: number) => {
  return useQuery({
    queryKey: ['todoMonth', year, month],
    queryFn: () => getTodoMonth(year, month),
    enabled: !!year && !!month,
  });
};
