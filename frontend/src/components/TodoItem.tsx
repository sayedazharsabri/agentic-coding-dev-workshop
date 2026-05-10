import React from 'react';
import { ITodo } from '../types/todo.types';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`flex items-center justify-between p-4 border-b border-gray-100 transition-colors hover:bg-gray-50 bg-white ${todo.isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex items-center flex-grow gap-4">
        {/* Custom Checkbox */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={todo.isCompleted}
            onChange={(e) => onToggle(todo._id, e.target.checked)}
          />
          <div className="w-6 h-6 border-2 border-blue-400 rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors">
            {todo.isCompleted && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </label>
        
        {/* Title */}
        <span className={`text-lg transition-all ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.title}
        </span>
      </div>

      {/* Actions */}
      <button
        onClick={() => onDelete(todo._id)}
        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors focus:outline-none"
        aria-label="Delete Todo"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
};
