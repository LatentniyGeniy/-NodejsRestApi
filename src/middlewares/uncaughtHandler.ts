import logger from './logger';

const uncaughtException = () => (error: Error) => {
  logger.error(`uncaughtException: ${error.message} ${error.stack}`);
};

const unhandledRejection = () => async (error: Error) => {
  logger.error(`unhandledRejection: ${error.message} ${error.stack}`);
};

export { uncaughtException, unhandledRejection };