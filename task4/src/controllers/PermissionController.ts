import { inject, injectable } from 'inversify';
import {  IPermissionController, IPermissionService } from 'app/interfaces';
import { INJECTABLES, UUID } from 'app/types';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class PermissionController implements IPermissionController {
    public constructor(
        @inject(INJECTABLES.PermissionService) private permissionService: IPermissionService
    ) {}

    public async addUsersToGroup(req: Request, res: Response, next: NextFunction): Promise<Response<number>> {
        const groupId = req.body.groupId as UUID;
        const userIds = req.body.userIds as Array<UUID>;
        return res.json(
            await this.permissionService.addUsersToGroup(groupId, userIds).catch(next)
        );
    }
}
