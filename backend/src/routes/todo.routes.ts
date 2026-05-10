import { Router } from 'express';
import { todoController } from '../controllers/todo.controller';
import { validate } from '../middlewares/validation.middleware';
import {
  createTodoSchema,
  updateTodoSchema,
  getTodoByIdSchema
} from '../validators/todo.validator';

const router = Router();

router.post(
  '/',
  validate(createTodoSchema),
  todoController.createTodo
);

router.get(
  '/',
  todoController.getTodos
);

router.get(
  '/:id',
  validate(getTodoByIdSchema),
  todoController.getTodoById
);

router.put(
  '/:id',
  validate(updateTodoSchema),
  todoController.updateTodo
);

router.delete(
  '/:id',
  validate(getTodoByIdSchema),
  todoController.deleteTodo
);

export default router;
