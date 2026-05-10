import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

export const TodoPage: React.FC = () => {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleAddTodo = async (title: string) => {
    try {
      setLocalError(null);
      await addTodo({ title });
    } catch (err: any) {
      setLocalError(err.message || 'Failed to add task');
    }
  };

  const handleToggleTodo = async (id: string, isCompleted: boolean) => {
    try {
      setLocalError(null);
      await updateTodo(id, { isCompleted });
    } catch (err: any) {
      setLocalError('Failed to update task status');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      setLocalError(null);
      await deleteTodo(id);
    } catch (err: any) {
      setLocalError('Failed to delete task');
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Global Data Fetch Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Action Error (like adding/deleting) */}
      {localError && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded shadow-sm flex justify-between">
          <p className="text-orange-700">{localError}</p>
          <button onClick={() => setLocalError(null)} className="text-orange-700 hover:text-orange-900 font-bold">×</button>
        </div>
      )}

      {/* Upper section: counts */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
        </span>
      </div>

      <TodoForm onSubmit={handleAddTodo} />
      
      <TodoList
        todos={todos}
        loading={loading}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </main>
  );
};
