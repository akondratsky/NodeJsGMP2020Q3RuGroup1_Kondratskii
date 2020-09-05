import { injectable, inject } from 'inversify';
import { IUserService, IUserProvider } from 'app/interfaces';
import { UUID, UserModelView, UpdateUserModelView, NewUserModelView, INJECTABLES } from 'app/types';
import { guidSchema, searchUserSchema, updateUserSchema, newUserSchema } from './validation';


@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(INJECTABLES.UserProvider) private userProvider: IUserProvider
    ) {}

    async search(loginSubstring: string, limit: number | undefined): Promise<Array<UserModelView>> {
        const { error } = searchUserSchema.validate({ loginSubstring, limit });
        if (error) throw error;
        return await this.userProvider.search(loginSubstring, limit);
    }

    async getById(id: UUID): Promise<UserModelView> {
        const { error } = guidSchema.validate(id);
        if (error) throw error;
        return await this.userProvider.getById(id);
    }

    async create(user: NewUserModelView): Promise<UUID> {
        const { error } = newUserSchema.validate(user);
        if (error) throw error;

        return await this.userProvider.create(user);
    }

    async update(user: UpdateUserModelView): Promise<UUID> {
        const { error } = updateUserSchema.validate(user);
        if (error) throw error;
        return await this.userProvider.update(user);
    }

    async delete(id: UUID): Promise<void> {
        const { error } = guidSchema.validate(id);
        if (error) throw error;
        return await this.userProvider.delete(id);
    }
}
