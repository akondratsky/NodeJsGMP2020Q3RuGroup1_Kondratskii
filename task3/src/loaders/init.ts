import express, { Application } from 'express';
import { requestLoggerMiddleware } from './requestLoggerMiddleware';
import { userRouter } from 'app/routers';

export const init = async (app: Application): Promise<void> => {
    app.use(requestLoggerMiddleware);
    app.use(express.json());
    app.use('/users', userRouter);
};
