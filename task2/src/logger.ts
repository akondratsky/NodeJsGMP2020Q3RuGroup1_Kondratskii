import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'task2api.log' })
    ]
});

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method}:${req.path} requested in ${new Date().toISOString()}`);
    next();
}