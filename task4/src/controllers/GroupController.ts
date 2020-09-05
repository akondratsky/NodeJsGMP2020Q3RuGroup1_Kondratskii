import { inject, injectable } from 'inversify';
import { IGroupController, IGroupService } from 'app/interfaces';
import { Group, UUID, CreateGroupViewModel, UpdateGroupViewModel } from 'app/types';
import { INJECTABLES } from 'app/types';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class GroupContoller implements IGroupController {
    public constructor(
        @inject(INJECTABLES.GroupService) private groupService: IGroupService
    ) {}

    public async get(req: Request, res: Response, next: NextFunction): Promise<Response<Group | Array<Group>>> {
        return res.json(
            req.query.id ?
                await this.groupService.getById(req.query.id as UUID).catch(next)
                : await this.groupService.getAll().catch(next)
        );
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<UUID>> {
        return res.json(
            await this.groupService.create(req.body as CreateGroupViewModel).catch(next)
        );
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<UUID>> {
        return res.json(
            await this.groupService.update(req.body as UpdateGroupViewModel).catch(next)
        );
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.groupService.delete(req.query.id as string).catch(next);
        res.end();
    }
}
