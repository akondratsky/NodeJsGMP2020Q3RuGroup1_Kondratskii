import { injectable, inject } from 'inversify';
import { IUserService, IUserProvider } from 'app/interfaces';
import { UUID, UserModelView, UpdateUserModelView, NewUserModelView, INJECTABLES } from 'app/types';
import { guidSchema, searchUserSchema, updateUserSchema, newUserSchema } from './validation';
import { ValidationError } from '@hapi/joi';

const assertValidation = (error: ValidationError | undefined, msg: string) : void => {
    if (error) {
        throw new ValidationError(msg, null, null);
    }
};

const validateId = (id: UUID): void => {
    const { error } = guidSchema.validate(id);
    assertValidation(error, 'Incorrect ID');
};


@injectable()
export class UserService implements IUserService {
    private userProvider: IUserProvider;

    constructor(
        @inject(INJECTABLES.IUserProvider) userProvider: IUserProvider
    ) {
        this.userProvider = userProvider;
    }

    async search(loginSubstring: string, limit: number | undefined): Promise<Array<UserModelView>> {
        const { error } = searchUserSchema.validate({ loginSubstring, limit });
        assertValidation(error, 'Incorrect search parameters');
        return await this.userProvider.search(loginSubstring, limit);
    }

    async getById(id: UUID): Promise<UserModelView> {
        validateId(id);
        return await this.userProvider.getById(id);
    }

    async create(user: NewUserModelView): Promise<UUID> {
        const { error } = newUserSchema.validate(user);
        assertValidation(error, 'Incorrect user fields format');

        return await this.userProvider.create(user);
    }

    async update(user: UpdateUserModelView): Promise<UUID> {
        const { error } = updateUserSchema.validate(user);
        assertValidation(error, 'Incorrect user fields format');
        return await this.userProvider.update(user);
    }

    async delete(id: UUID): Promise<void> {
        validateId(id);
        return await this.userProvider.delete(id);
    }
}
