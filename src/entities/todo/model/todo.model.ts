// src/entities/todo/model/todo.model.ts

export interface CreateTodoItemDto {
  title: string;
  description?: string;
  isCompleted?: boolean;
  certId?: string;
  certName?: string;
}

export interface CreateTodoDto {
  date: string;
  todos: CreateTodoItemDto[];
}

export interface UpdateTodoDto {
  date?: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface UpdateTodoCompletionDto {
  isCompleted: boolean;
}

export interface GetTodosFilterDto {
  date?: string;
  isCompleted?: boolean;
  search?: string;
}

// 서버에서 반환하는 Todo 객체에 대한 인터페이스 (예상)
export interface Todo {
  _id: string;
  userId: string;
  date: string;
  scheduledDateStr: string;
  scheduledDate: string;
  todos: {
    _id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    certId?: string;
    certName?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// 연간 투두 요약
export interface DailyTodoSummary {
  date: string;
  totalCount: number;
  completedCount: number;
  percentage: number;
}

export interface YearlyStats {
  totalDays: number;
  totalTodos: number;
  completedTodos: number;
  averageRate: number;
}

export interface YearlyTodoResponse {
  year: number;
  data: DailyTodoSummary[];
  stats: YearlyStats;
}

// 스트릭
export interface StreakResponse {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakStartDate: string;
}
