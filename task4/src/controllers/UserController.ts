import { inject, injectable } from 'inversify';
import { IUserService, IUserController } from 'app/interfaces';
import { UUID, UserModelView, NewUserModelView, UpdateUserModelView } from 'app/types';
import { INJECTABLES } from 'app/types';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class UserController implements IUserController {
    public constructor(
        @inject(INJECTABLES.UserService) private userService: IUserService
    ) {}

    public async get(req: Request, res: Response, next: NextFunction): Promise<Response<UserModelView>> {
        if (req.query.id) {
            return res.json(
                await this.userService.getById(req.query.id as UUID).catch(next)
            );
        }

        const loginSubstring = req.query.loginSubstring !== undefined ? req.query.loginSubstring as string : '';
        const limit = req.query.limit !== undefined ? +req.query.limit : undefined;

        return res.json(
            await this.userService.search(loginSubstring as string, limit).catch(next)
        );
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<UUID>> {
        return res.json(
            await this.userService.create(req.body as NewUserModelView).catch(next)
        );
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<UserModelView>> {
        return res.json(
            await this.userService.update(req.body as UpdateUserModelView).catch(next)
        );
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.userService.delete(req.query.id as UUID)
            .then(() => res.end())
            .catch(next);
    }
}
