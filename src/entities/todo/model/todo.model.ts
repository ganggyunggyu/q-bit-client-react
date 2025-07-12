// src/entities/todo/model/todo.model.ts

export interface CreateTodoItemDto {
  title: string;
  description?: string;
  isCompleted?: boolean;
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
  }[];
  createdAt: string;
  updatedAt: string;
}
