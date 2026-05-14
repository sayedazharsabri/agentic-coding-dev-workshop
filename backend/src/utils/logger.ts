import winston from 'winston';

/**
 * Custom logger utility using Winston
 * Debug logs are visible only when NODE_ENV is 'development'
 */

const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
  return `[${timestamp}] [${level}] ${message} ${metaString}`.trim();
});

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    process.env.NODE_ENV === 'development' ? colorize() : winston.format.uncolorize(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'test'
    })
  ]
});
