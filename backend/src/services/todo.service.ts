import { TodoModel, ITodo } from '../models/todo.model';
import { AppError } from '../utils/AppError';

export class TodoService {
  async createTodo(data: Partial<ITodo>): Promise<ITodo> {
    const todo = new TodoModel(data);
    return await todo.save();
  }

  async getTodos(): Promise<ITodo[]> {
    return await TodoModel.find().sort({ createdAt: -1 });
  }

  async getTodoById(id: string): Promise<ITodo> {
    const todo = await TodoModel.findById(id);
    if (!todo) throw new AppError('Todo not found', 404);
    return todo;
  }

  async updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo> {
    const todo = await TodoModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!todo) throw new AppError('Todo not found', 404);
    return todo;
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await TodoModel.findByIdAndDelete(id);
    if (!result) throw new AppError('Todo not found', 404);
  }
}

export const todoService = new TodoService();
