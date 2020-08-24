import { Request, Response, NextFunction } from 'express';
import { logger } from 'app/services';

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method}:${req.path} requested in ${new Date().toISOString()}`);
    next();
};
