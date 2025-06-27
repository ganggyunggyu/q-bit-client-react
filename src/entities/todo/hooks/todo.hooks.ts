import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postTodo, getTodoList, getTodoByDate, getTodoExists } from '../api';

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
