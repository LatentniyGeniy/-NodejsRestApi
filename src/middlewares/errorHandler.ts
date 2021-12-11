import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import logger from './logger';

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.name === 'Error' ? StatusCodes.NOT_FOUND : StatusCodes.INTERNAL_SERVER_ERROR;
  const messageReason = getReasonPhrase(statusCode);

    res.statusMessage = error.message || 'Error';
    logger.error(`${statusCode} ${error.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({  statusCode, messageReason });

  next();
};




