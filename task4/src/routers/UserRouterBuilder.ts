import { IRouterBuilder, IUserController } from 'app/interfaces';
import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';
import { Router, NextFunction, Response, Request } from 'express';

@injectable()
export class UserRouterBuilder implements IRouterBuilder {
    constructor(
        @inject(INJECTABLES.UserController) private userController: IUserController
    ) {}

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
