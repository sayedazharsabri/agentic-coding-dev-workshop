import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

/**
 * Middleware to validate incoming request data using Zod schema
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract validation error messages
        const errorMessages = error.errors.map(err => err.message).join(', ');
        return next(new AppError(errorMessages, 400));
      }
      return next(error);
    }
  };
};
