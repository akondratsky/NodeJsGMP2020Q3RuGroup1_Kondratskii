import { IUserRouter, IUserController } from 'app/interfaces';
import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';
import { Router, NextFunction, Response, Request } from 'express';

@injectable()
export class UserRouter implements IUserRouter {
    private userController: IUserController;

    constructor(
        @inject(INJECTABLES.IUserController) userController: IUserController
    ) {
        this.userController = userController;
    }

    create(baseUrl: string) : Router {
        return Router()
            .get(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                return await this.userController.get(req, res, next);
            })
            .post(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                return await this.userController.create(req, res, next);
            })
            .patch(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                return await this.userController.update(req, res, next);
            })
            .delete(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                return await this.userController.delete(req, res, next);
            });
    }
}
