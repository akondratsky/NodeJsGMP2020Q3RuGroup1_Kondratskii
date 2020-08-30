import { Router } from 'express';

export interface IGroupRouter {
    create(baseUrl: string): Router
}
