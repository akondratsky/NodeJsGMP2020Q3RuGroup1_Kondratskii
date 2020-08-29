import winston from 'winston';

export const loggerService = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'task2api.log' })
    ]
});
