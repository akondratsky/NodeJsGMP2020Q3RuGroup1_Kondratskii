import { Router } from 'express';

export interface IPermissionRouter {
    create(baseUrl: string): Router
}
