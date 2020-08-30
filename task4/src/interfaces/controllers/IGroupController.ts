import { UUID } from 'app/types';
import { Group } from 'app/types/Group';
import { Request, Response, NextFunction } from 'express';

export interface IGroupController {
    get(req: Request, res: Response, next: NextFunction) : Promise<Response<Group | Array<Group>>>;
    create(req: Request, res: Response, next: NextFunction) : Promise<Response<UUID>>;
    update(req: Request, res: Response, next: NextFunction) : Promise<Response<UUID>>;
    delete(req: Request, res: Response, next: NextFunction) : Promise<void>;
}
