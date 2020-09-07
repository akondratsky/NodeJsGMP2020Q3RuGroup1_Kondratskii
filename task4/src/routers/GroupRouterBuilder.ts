import { injectable, inject } from 'inversify';
import { Router, Request, Response, NextFunction } from 'express';
import { IRouterBuilder, IGroupController } from 'app/interfaces';
import { INJECTABLES } from 'app/types';

@injectable()
export class GroupRouter implements IRouterBuilder {
    constructor(
        @inject(INJECTABLES.GroupController) private groupController: IGroupController
    ) {}

    create(baseUrl: string) : Router {
        return Router()
            .get(baseUrl, (req: Request, res: Response, next: NextFunction): void => {
                this.groupController.find(req, res, next);
            })
            .post(baseUrl, (req: Request, res: Response, next: NextFunction): void => {
                this.groupController.create(req, res, next);
            })
            .patch(baseUrl, (req: Request, res: Response, next: NextFunction): void => {
                this.groupController.update(req, res, next);
            })
            .delete(baseUrl, (req: Request, res: Response, next: NextFunction): void => {
                this.groupController.delete(req, res, next);
            });
    }
}
