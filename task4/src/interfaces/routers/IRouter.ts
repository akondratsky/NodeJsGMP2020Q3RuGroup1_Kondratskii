import { Router } from 'express';

interface IRouter {
    create(baseUrl: string): Router
}
