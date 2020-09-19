import { Request, Response, NextFunction } from 'express';

interface Middleware {
    <T>(req: Request & T, res: Response, next: NextFunction): void;
}

export type MiddlewareParams = Parameters<Middleware>;
