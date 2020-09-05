import { injectable, inject } from 'inversify';
import { IUserService, IUserProvider, ILoggerService } from 'app/interfaces';
import { UUID, UserModelView, UpdateUserModelView, NewUserModelView, INJECTABLES } from 'app/types';
import {
    guidSchema,
    searchUserSchema,
    updateUserSchema,
    newUserSchema,
    getObjectFromValidationError
} from './validation';
import { UserNotFoundError } from 'app/errors';


@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(INJECTABLES.UserProvider) private userProvider: IUserProvider,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

    async search(loginSubstring: string, limit: number | undefined): Promise<Array<UserModelView>> {
        const { error } = searchUserSchema.validate({ loginSubstring, limit });

        if (error) {
            this.loggerService.error(
                'Incorrect request to SEARCH users',
                getObjectFromValidationError(error)
            );
            throw error;
        }
        const users = await this.userProvider.search(loginSubstring, limit);

        this.loggerService.debug(`Found ${users.length} users, loginSubstring="${loginSubstring}", limit=${limit}`);

        return users;
    }

    async getById(id: UUID): Promise<UserModelView> {
        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(
                'Incorrect request to GET user',
                id
            );
            throw error;
        }

        const user = await this.userProvider.getById(id);

        this.loggerService.debug('User found by id', user);

        return user;
    }

    async create(user: NewUserModelView): Promise<UUID> {
        const { error } = newUserSchema.validate(user);

        if (error) {
            this.loggerService.error(
                'Incorrect request to CREATE user',
                getObjectFromValidationError(error)
            );
            throw error;
        }

        const id = await this.userProvider.create(user);

        this.loggerService.info('New user created', { id, ...user });

        return id;
    }

    async update(user: UpdateUserModelView): Promise<UUID> {
        const { error } = updateUserSchema.validate(user);

        if (error) {
            this.loggerService.error(
                'Incorrect request to UPDATE user',
                getObjectFromValidationError(error)
            );
            throw error;
        }

        const userId = await this.userProvider.update(user);

        this.loggerService.debug(`User successfully updated, ID=${userId}`);

        return userId;
    }

    async delete(id: UUID): Promise<void> {
        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(
                'Incorrect request to DELETE user',
                id
            );
            throw error;
        }

        await this.userProvider.delete(id);

        this.loggerService.info('User successfully deleted', id);
    }
}
