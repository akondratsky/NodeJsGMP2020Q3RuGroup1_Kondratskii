import { injectable, inject } from 'inversify';
import { ValidationError } from '@hapi/joi';
import { IGroupService, IGroupProvider } from 'app/interfaces';
import { Group, UUID, UpdateGroupViewModel, CreateGroupViewModel, INJECTABLES } from 'app/types';
import { guidSchema, createGroupSchema, updateGroupSchema } from './validation';


// TODO: remove duplicated code in scope of creating of error handler

const assertValidation = (error: ValidationError | undefined, msg: string) : void => {
    if (error) {
        throw new ValidationError(msg, null, null);
    }
};

const validateId = (id: UUID): void => {
    const { error } = guidSchema.validate(id);
    assertValidation(error, 'Incorrect group ID');
};


@injectable()
export class GroupService implements IGroupService {
    private groupProvider: IGroupProvider

    constructor(
        @inject(INJECTABLES.GroupProvider) groupProvider: IGroupProvider
    ) {
        this.groupProvider = groupProvider;
    }

    async getById(id: UUID): Promise<Group> {
        validateId(id);
        return await this.groupProvider.getById(id);
    }

    async getAll(): Promise<Array<Group>> {
        return await this.groupProvider.getAll();
    }

    async create(group: CreateGroupViewModel): Promise<string> {
        const { error } = createGroupSchema.validate(group);
        assertValidation(error, 'Incorrect fields');
        return await this.groupProvider.create(group);
    }

    async update(group: UpdateGroupViewModel): Promise<UUID> {
        const { error } = updateGroupSchema.validate(group);
        assertValidation(error, 'Incorrect fields');
        return await this.groupProvider.update(group);
    }

    async delete(id: UUID): Promise<void> {
        validateId(id);
        return await this.groupProvider.delete(id);
    }
}
