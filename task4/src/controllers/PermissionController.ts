import { inject, injectable } from 'inversify';
import {  IPermissionController, IPermissionService } from 'app/interfaces';
import { INJECTABLES, UUID } from 'app/types';
import { Request, Response } from 'express';

@injectable()
export class PermissionController implements IPermissionController {
    private permissionService: IPermissionService;

    public constructor(
        @inject(INJECTABLES.IPermissionService) permissionService: IPermissionService
    ) {
        this.permissionService = permissionService;
    }

    public async addUsersToGroup(req: Request, res: Response): Promise<Response<number>> {
        const groupId = req.body.groupId as UUID;
        const userIds = req.body.userIds as Array<UUID>;
        return res.json(
            await this.permissionService.addUsersToGroup(groupId, userIds)
        );
    }
}
