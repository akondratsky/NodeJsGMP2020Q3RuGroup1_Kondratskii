import { Router } from 'express';

export interface IUserRouter {
    create(baseUrl: string): Router
}
