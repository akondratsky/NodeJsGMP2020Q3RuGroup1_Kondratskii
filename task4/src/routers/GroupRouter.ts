import { injectable, inject } from 'inversify';
import { Router, Request, Response, NextFunction } from 'express';
import { IGroupRouter, IGroupController } from 'app/interfaces';
import { INJECTABLES } from 'app/types';

@injectable()
export class GroupRouter implements IGroupRouter {
    private groupController: IGroupController;

    constructor(
        @inject(INJECTABLES.IGroupController) groupController: IGroupController
    ) {
        this.groupController = groupController;
    }

    create(baseUrl: string) : Router {
        return Router()
            .get(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                this.groupController.get(req, res, next);
            })
            .post(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                this.groupController.create(req, res, next);
            })
            .patch(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                this.groupController.update(req, res, next);
            })
            .delete(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                this.groupController.delete(req, res, next);
            });
    }
}
