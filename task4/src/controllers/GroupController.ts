import { inject, injectable } from 'inversify';
import { IGroupController, IGroupService } from 'app/interfaces';
import { Group, UUID } from 'app/types';
import { INJECTABLES } from 'app/types';
import { Request, Response } from 'express';

@injectable()
export class GroupContoller implements IGroupController {
    private groupService: IGroupService;

    public constructor(
        @inject(INJECTABLES.IGroupService) groupService: IGroupService
    ) {
        this.groupService = groupService;
    }

    public async get(req: Request, res: Response): Promise<Response<Group | Array<Group>>> {
        return res.json(
            req.query.id ?
                await this.groupService.getById(req.query.id as UUID)
                : await this.groupService.getAll()
        );
    }

    public async create(): Promise<Response<UUID>> {
        await Promise.resolve();
        throw new Error('Method not implemented.');
    }

    public async update(): Promise<Response<UUID>> {
        await Promise.resolve();
        throw new Error('Method not implemented.');
    }

    public async delete(): Promise<void> {
        await Promise.resolve();
        throw new Error('Method not implemented.');
    }
}
