import { injectable, inject } from 'inversify';
import { ValidationError } from '@hapi/joi';
import { IGroupService, IGroupProvider } from 'app/interfaces';
import { Group, UUID, UpdateGroupViewModel, CreateGroupViewModel, INJECTABLES } from 'app/types';
import { guidSchema } from './validation';


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
        @inject(INJECTABLES.IGroupProvider) groupProvider: IGroupProvider
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

    create(group: CreateGroupViewModel): Promise<string> {
        console.log('create', group);
        throw new Error('Method not implemented.');
    }

    update(group: UpdateGroupViewModel): Promise<UUID> {
        console.log('update', group);
        throw new Error('Method not implemented.');
    }

    delete(id: UUID): Promise<boolean> {
        console.log('delete', id);
        throw new Error('Method not implemented.');
    }
}
