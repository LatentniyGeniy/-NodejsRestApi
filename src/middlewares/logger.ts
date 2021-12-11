import { createLogger, transports, format } from 'winston';

import config from '../common/config';

const { NODE_ENV } = config;

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.File({ filename: './logs/errors.log', level: 'error' }),
    new transports.File({ filename: './logs/all.log', level: 'info' }),
  ],
});

if (NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

export default logger;