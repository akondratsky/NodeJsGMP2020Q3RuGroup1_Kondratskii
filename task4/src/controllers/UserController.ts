import { inject, injectable } from 'inversify';
import { IUserService, IUserController } from 'app/interfaces';
import { UUID, UserModelView, NewUserModelView, UpdateUserModelView } from 'app/types';
import { INJECTABLES } from 'app/types';
import { Request, Response } from 'express';

@injectable()
export class UserController implements IUserController {
    public constructor(
        @inject(INJECTABLES.UserService) private userService: IUserService
    ) {}

    public async get(req: Request, res: Response): Promise<Response<UserModelView>> {
        if (req.query.id) {
            return res.json(
                await this.userService.getById(req.query.id as UUID)
            );
        }

        const loginSubstring = req.query.loginSubstring !== undefined ? req.query.loginSubstring as string : '';
        const limit = req.query.limit !== undefined ? +req.query.limit : undefined;

        return res.json(
            await this.userService.search(loginSubstring as string, limit)
        );
    }

    public async create(req: Request, res: Response): Promise<Response<UUID>> {
        return res.json(
            await this.userService.create(req.body as NewUserModelView)
        );
    }

    public async update(req: Request, res: Response): Promise<Response<UserModelView>> {
        return res.json(
            await this.userService.update(req.body as UpdateUserModelView)
        );
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await this.userService.delete(req.query.id as UUID);
        res.end();
    }
}
