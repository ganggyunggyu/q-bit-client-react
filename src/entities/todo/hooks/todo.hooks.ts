// src/entities/todo/hooks/todo.hooks.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todo.api';
import {
  CreateTodoDto,
  GetTodosFilterDto,
  UpdateTodoDto,
  UpdateTodoCompletionDto,
  Todo,
} from '../model/todo.model';

// Todo 생성 훅
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTodoDto) => todoApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todoByDate'] });
      queryClient.invalidateQueries({ queryKey: ['weekTodos'] });
      queryClient.invalidateQueries({ queryKey: ['monthTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todoExists'] });
    },
  });
};

// Todo 목록 조회 훅 (필터링 및 검색)
export const useFindAllTodos = (filterDto: GetTodosFilterDto) => {
  return useQuery<Todo[]> ({
    queryKey: ['todos', filterDto],
    queryFn: () => todoApi.findAll(filterDto),
  });
};

// 특정 Todo 조회 훅
export const useFindOneTodo = (id: string) => {
  return useQuery<Todo> ({
    queryKey: ['todo', id],
    queryFn: () => todoApi.findOne(id),
    enabled: !!id,
  });
};

// 특정 Todo 업데이트 훅
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTodoDto }) => todoApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todoByDate'] });
      queryClient.invalidateQueries({ queryKey: ['weekTodos'] });
      queryClient.invalidateQueries({ queryKey: ['monthTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todoExists'] });
    },
  });
};

// 특정 Todo 완료 상태 토글 훅
export const useToggleCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTodoCompletionDto }) =>
      todoApi.toggleComplete(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todoByDate'] });
      queryClient.invalidateQueries({ queryKey: ['weekTodos'] });
      queryClient.invalidateQueries({ queryKey: ['monthTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todoExists'] });
    },
  });
};

// 특정 Todo 삭제 훅
export const useRemoveTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todoByDate'] });
      queryClient.invalidateQueries({ queryKey: ['weekTodos'] });
      queryClient.invalidateQueries({ queryKey: ['monthTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todoExists'] });
    },
  });
};

// 특정 날짜의 Todo 조회 훅
export const useFindByDate = (date: string) => {
  return useQuery<Todo> ({
    queryKey: ['todoByDate', date],
    queryFn: () => todoApi.findByDate(date),
    enabled: !!date,
  });
};

// 지정한 주간의 TODO 리스트 전체 조회 훅
export const useGetWeekTodos = (sunday: string) => {
  return useQuery<Todo[]> ({
    queryKey: ['weekTodos', sunday],
    queryFn: () => todoApi.getWeekTodos(sunday),
    enabled: !!sunday,
  });
};

// 해당 날짜에 투두가 이미 존재하는지 여부 훅
export const useTodoExists = (date: string) => {
  return useQuery<{ exists: boolean }> ({
    queryKey: ['todoExists', date],
    queryFn: () => todoApi.exists(date),
    enabled: !!date,
  });
};

// 특정 월의 TODO 리스트 조회 훅
export const useGetMonthTodos = (year: number, month: number) => {
  return useQuery<Todo[]> ({
    queryKey: ['monthTodos', year, month],
    queryFn: () => todoApi.getMonthTodos(year, month),
    enabled: !!year && !!month,
  });
};