import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/**
 * Connects to the MongoDB database using the environment variable URI
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
    
    logger.debug(`Attempting to connect to MongoDB at ${mongoURI}`);
    
    await mongoose.connect(mongoURI);
    
    logger.info('Successfully connected to MongoDB');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};
