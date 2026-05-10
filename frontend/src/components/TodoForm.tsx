import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => Promise<void>;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(title);
      setTitle(''); // Clear input on success
    } catch (error) {
      // Error is handled by parent, here we just intercept the state reset
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="input-field flex-grow text-lg py-3"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="btn-primary whitespace-nowrap text-lg py-3 px-6"
          disabled={!title.trim() || isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};
