import React from 'react';
import { ITodo } from '../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  loading: boolean;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, loading, onToggle, onDelete }) => {
  if (loading) {
    return (
      <div className="card text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="card text-center py-16">
        <svg className="mx-auto h-12 w-12 text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-xl text-gray-600 font-medium">No tasks yet</p>
        <p className="text-gray-400 mt-1">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden !padding-0 p-0">
      <ul className="divide-y divide-gray-100 m-0 p-0 list-none">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};
