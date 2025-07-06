import { axios } from '@/app/config';
import {
  CreateTodoDto,
  GetTodosFilterDto,
  UpdateTodoDto,
  UpdateTodoCompletionDto,
  Todo,
} from '../model/todo.model';

export const todoApi = {
  create: async (dto: CreateTodoDto): Promise<Todo> => {
    const response = await axios.post('/todo', dto);
    return response.data;
  },

  findAll: async (filterDto: GetTodosFilterDto): Promise<Todo[]> => {
    const response = await axios.get('/todo', { params: filterDto });
    return response.data;
  },

  findOne: async (id: string): Promise<Todo> => {
    const response = await await axios.get(`/todo/${id}`);
    return response.data;
  },

  update: async (id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> => {
    const response = await axios.patch(`/todo/${id}`, updateTodoDto);
    return response.data;
  },

  toggleComplete: async (
    id: string,
    updateTodoCompletionDto: UpdateTodoCompletionDto,
  ): Promise<Todo> => {
    const response = await axios.patch(
      `/todo/${id}/complete`,
      updateTodoCompletionDto,
    );
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    const response = await axios.delete(`/todo/${id}`);
    return response.data;
  },

  findByDate: async (date: string): Promise<Todo> => {
    const response = await axios.get('/todo/date', { params: { date } });
    return response.data;
  },

  getWeekTodos: async (sunday: string): Promise<Todo[]> => {
    const response = await axios.get('/todo/week', { params: { sunday } });
    return response.data;
  },

  exists: async (date: string): Promise<{ exists: boolean }> => {
    const response = await axios.get('/todo/exists', { params: { date } });
    return response.data;
  },

  getMonthTodos: async (year: number, month: number): Promise<Todo[]> => {
    const response = await axios.get('/todo/month', {
      params: { year, month },
    });
    return response.data;
  },
};
