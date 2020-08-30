import { UUID, UserModelView } from 'app/types';
import { Request, Response, NextFunction } from 'express';


export interface IUserController {
    get(req: Request, res: Response, next: NextFunction) : Promise<Response<UserModelView>>;
    create(req: Request, res: Response, next: NextFunction) : Promise<Response<UUID>>;
    update(req: Request, res: Response, next: NextFunction) : Promise<Response<UserModelView>>;
    delete(req: Request, res: Response, next: NextFunction) : Promise<void>;
}
