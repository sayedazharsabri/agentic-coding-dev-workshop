/**
 * Custom logger utility
 * Debug logs are visible only when NODE_ENV is 'development'
 */

const formatMessage = (level: string, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

export const logger = {
  info: (message: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'test') {
      console.info(formatMessage('INFO', message), meta || '');
    }
  },

  warn: (message: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(formatMessage('WARN', message), meta || '');
    }
  },

  error: (message: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(formatMessage('ERROR', message), meta || '');
    }
  },

  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('DEBUG', message), meta || '');
    }
  }
};
