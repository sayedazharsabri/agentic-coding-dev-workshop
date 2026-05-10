import api from './api';
import { ITodo, ITodoInput, ApiResponse } from '../types/todo.types';

export const todoService = {
  getTodos: async (): Promise<ITodo[]> => {
    const response = await api.get<ApiResponse<ITodo[]>>('/todos');
    return response.data.data || [];
  },

  createTodo: async (todo: ITodoInput): Promise<ITodo> => {
    const response = await api.post<ApiResponse<ITodo>>('/todos', todo);
    return response.data.data as ITodo;
  },

  updateTodo: async (id: string, todo: Partial<ITodoInput>): Promise<ITodo> => {
    const response = await api.put<ApiResponse<ITodo>>(`/todos/${id}`, todo);
    return response.data.data as ITodo;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await api.delete<ApiResponse<null>>(`/todos/${id}`);
  },
};
