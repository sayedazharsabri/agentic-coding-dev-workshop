import { Request, Response, NextFunction } from 'express';
import { todoService } from '../services/todo.service';

export class TodoController {
  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoService.createTodo(req.body);
      res.status(201).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  }

  async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getTodos();
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  }

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoService.getTodoById(req.params.id);
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoService.updateTodo(req.params.id, req.body);
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      await todoService.deleteTodo(req.params.id);
      res.status(200).json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export const todoController = new TodoController();
