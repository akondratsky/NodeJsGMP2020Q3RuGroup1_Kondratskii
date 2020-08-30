import { Request, Response, NextFunction } from 'express';


export interface IPermissionController {
    addUsersToGroup(req: Request, res: Response, next: NextFunction) : Promise<Response<number>>;
}
