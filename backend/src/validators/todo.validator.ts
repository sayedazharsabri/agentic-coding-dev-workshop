import { z } from 'zod';

/**
 * Validation schemas for Todo using Zod
 */

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }).min(1, 'Title cannot be empty').max(100, 'Title cannot exceed 100 characters'),
    
    description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
    
    isCompleted: z.boolean().optional()
  })
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Todo ID format')
  }),
  body: z.object({
    title: z.string().min(1, 'Title cannot be empty').max(100).optional(),
    description: z.string().max(500).optional(),
    isCompleted: z.boolean().optional()
  }) // At least one field must be provided, we can handle logic in controller/service
});

export const getTodoByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Todo ID format')
  })
});
