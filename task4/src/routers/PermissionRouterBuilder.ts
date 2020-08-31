import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';
import { Router, NextFunction, Response, Request } from 'express';
import { IRouterBuilder, IPermissionController } from 'app/interfaces';

@injectable()
export class PermissionRouterBuilder implements IRouterBuilder {
    private permissionController: IPermissionController;

    constructor(
        @inject(INJECTABLES.PermissionController) permissionController: IPermissionController
    ) {
        this.permissionController = permissionController;
    }

    create(baseUrl: string) : Router {
        return Router()
            .post(baseUrl, async (req: Request, res: Response, next: NextFunction) => {
                return await this.permissionController.addUsersToGroup(req, res, next);
            });
    }
}
