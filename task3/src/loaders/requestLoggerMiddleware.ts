import { Request, Response, NextFunction } from 'express';
import { loggerService } from 'app/services';

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    loggerService.info(`${req.method}:${req.path} requested in ${new Date().toISOString()}`);
    next();
};
