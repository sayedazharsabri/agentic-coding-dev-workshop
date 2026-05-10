import dotenv from 'dotenv';
// Load environment variables before anything else
dotenv.config();

import app from './app';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();

    // Start listening on port
    const server = app.listen(PORT, () => {
      logger.info(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled rejections globally
    process.on('unhandledRejection', (err: Error) => {
      logger.error('Unhandled Rejection! Shutting down...', err);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions globally
    process.on('uncaughtException', (err: Error) => {
      logger.error('Uncaught Exception! Shutting down...', err);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start the server', error);
    process.exit(1);
  }
};

startServer();
