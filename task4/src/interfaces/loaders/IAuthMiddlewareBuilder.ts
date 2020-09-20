import { Handler } from 'express';

export type AuthenticationMiddleware = Handler;

export interface IAuthMiddlewareBuilder {
    getAuthInitializerMiddleware(): Handler;
    getAuthMiddleware(): Handler;
}
