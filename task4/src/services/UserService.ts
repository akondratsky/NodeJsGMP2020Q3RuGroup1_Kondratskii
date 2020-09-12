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

// import { loggable } from 'app/aspect/logger';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(INJECTABLES.UserProvider) private userProvider: IUserProvider,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

    async search(loginSubstring: string, limit: number | undefined): Promise<Array<UserModelView>> {
        this.loggerService.debug(
            this, this.search, `Searching users with loginSubstring="${loginSubstring}", limit=${limit}`
        );

        const { error } = searchUserSchema.validate({ loginSubstring, limit });

        if (error) {
            this.loggerService.error(
                this, this.search, 'Incorrect request to SEARCH users', getObjectFromValidationError(error)
            );
            throw error;
        }
        const users = await this.userProvider.search(loginSubstring, limit);

        this.loggerService.debug(
            this, this.search, `Found ${users.length} users, loginSubstring="${loginSubstring}", limit=${limit}`
        );

        return users;
    }

    async getById(id: UUID): Promise<UserModelView> {
        this.loggerService.debug(
            this, this.getById, `Getting user with id="${id}"`
        );

        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(this, this.getById, 'Incorrect request to GET user', id);
            throw error;
        }

        const user = await this.userProvider.getById(id);

        this.loggerService.debug(this, this.getById, 'User found by id', user);

        return user;
    }

    async create(user: NewUserModelView): Promise<UUID> {
        this.loggerService.debug(
            this, this.create, 'Creating user', { login: user.login, age: user.age }
        );

        const { error } = newUserSchema.validate(user);

        if (error) {
            this.loggerService.error(
                this, this.create, 'Incorrect request to CREATE user', getObjectFromValidationError(error)
            );
            throw error;
        }

        const id = await this.userProvider.create(user);

        this.loggerService.info(this, this.create, 'New user created', { id, ...user });

        return id;
    }

    async update(user: UpdateUserModelView): Promise<UUID> {
        this.loggerService.debug(
            this, this.update, 'Updating user', { id: user.id, login: user.login, age: user.password }
        );

        const { error } = updateUserSchema.validate(user);

        if (error) {
            this.loggerService.error(
                this, this.update, 'Incorrect request to UPDATE user', getObjectFromValidationError(error)
            );
            throw error;
        }

        const userId = await this.userProvider.update(user);

        this.loggerService.debug(this, this.update, `User successfully updated, ID=${userId}`);

        return userId;
    }

    async delete(id: UUID): Promise<void> {
        this.loggerService.debug(
            this, this.update, 'Deleting user', id
        );

        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(this, this.delete, 'Incorrect request to DELETE user', id);
            throw error;
        }

        await this.userProvider.delete(id);

        this.loggerService.info(this, this.delete, 'User successfully deleted', id);
    }
}
