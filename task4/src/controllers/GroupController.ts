import { inject, injectable } from 'inversify';
import { IGroupController, IGroupService } from 'app/interfaces';
import { Group, UUID, CreateGroupViewModel, UpdateGroupViewModel } from 'app/types';
import { INJECTABLES } from 'app/types';
import { Request, Response } from 'express';

@injectable()
export class GroupContoller implements IGroupController {
    public constructor(
        @inject(INJECTABLES.GroupService) private groupService: IGroupService
    ) {}

    public async get(req: Request, res: Response): Promise<Response<Group | Array<Group>>> {
        return res.json(
            req.query.id ?
                await this.groupService.getById(req.query.id as UUID)
                : await this.groupService.getAll()
        );
    }

    public async create(req: Request, res: Response): Promise<Response<UUID>> {
        return res.json(
            await this.groupService.create(req.body as CreateGroupViewModel)
        );
    }

    public async update(req: Request, res: Response): Promise<Response<UUID>> {
        return res.json(
            await this.groupService.update(req.body as UpdateGroupViewModel)
        );
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await this.groupService.delete(req.query.id as string);
        res.end();
    }
}
