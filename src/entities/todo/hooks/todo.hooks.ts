// src/entities/todo/hooks/todo.hooks.ts

import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todo.api';
import {
  CreateTodoDto,
  GetTodosFilterDto,
  UpdateTodoDto,
  UpdateTodoCompletionDto,
  Todo,
  YearlyTodoResponse,
  StreakResponse,
} from '../model/todo.model';

export const todoKeys = {
  all: ['todos'] as const,
  byDate: (date: string) => ['todoByDate', date] as const,
  week: (sunday: string) => ['weekTodos', sunday] as const,
  month: (year: number, month: number) => ['monthTodos', year, month] as const,
  yearly: (year: number) => ['yearlyTodos', year] as const,
  streak: ['streak'] as const,
  exists: (date: string) => ['todoExists', date] as const,
  detail: (id: string) => ['todo', id] as const,
};

const TODO_QUERY_KEYS = ['todos', 'todoByDate', 'weekTodos', 'monthTodos', 'yearlyTodos', 'streak', 'todoExists'] as const;

const invalidateAllTodoQueries = (queryClient: QueryClient) => {
  TODO_QUERY_KEYS.forEach((key) => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
};

// Todo 생성 훅
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTodoDto) => todoApi.create(dto),
    onSuccess: () => invalidateAllTodoQueries(queryClient),
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
    onSuccess: () => invalidateAllTodoQueries(queryClient),
  });
};

// 특정 Todo 완료 상태 토글 훅
export const useToggleCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTodoCompletionDto }) =>
      todoApi.toggleComplete(id, dto),
    onSuccess: () => invalidateAllTodoQueries(queryClient),
  });
};

// 특정 Todo 삭제 훅
export const useRemoveTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoApi.remove(id),
    onSuccess: () => invalidateAllTodoQueries(queryClient),
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

// 연간 투두 요약 조회 훅
export const useGetYearlyTodos = (year: number) => {
  return useQuery<YearlyTodoResponse>({
    queryKey: todoKeys.yearly(year),
    queryFn: () => todoApi.getYearlyTodos(year),
    enabled: !!year,
  });
};

// 스트릭 조회 훅
export const useGetStreak = () => {
  return useQuery<StreakResponse>({
    queryKey: todoKeys.streak,
    queryFn: () => todoApi.getStreak(),
  });
};