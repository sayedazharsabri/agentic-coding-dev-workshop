import { useState, useEffect, useCallback } from 'react';
import { ITodo, ITodoInput } from '../types/todo.types';
import { todoService } from '../services/todo.service';

/**
 * Custom hook to encapsulate Todo state management and API logic.
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData: ITodoInput) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err: any) {
      throw Error(err?.response?.data?.message || 'Failed to create todo');
    }
  };

  const updateTodo = async (id: string, updates: Partial<ITodoInput>) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err: any) {
      throw Error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      throw Error('Failed to delete todo');
    }
  };

  return { todos, loading, error, addTodo, updateTodo, deleteTodo, refetch: fetchTodos };
};
