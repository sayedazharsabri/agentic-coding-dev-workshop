import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import todoRoutes from './routes/todo.routes';
import { AppError } from './utils/AppError';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/todos', todoRoutes);

// Unhandled route middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(errorHandler);

export default app;
