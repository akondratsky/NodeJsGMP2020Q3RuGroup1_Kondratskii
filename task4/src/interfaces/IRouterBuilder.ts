import { Router } from 'express';

export interface IRouterBuilder {
    create(baseUrl: string): Router
}
