import { injectable, inject } from 'inversify';
import { ValidationError } from '@hapi/joi';
import { IPermissionService, IPermissionProvider } from 'app/interfaces';
import { UUID, INJECTABLES } from 'app/types';
import { guidSchema } from './validation';


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
export class PermissionService implements IPermissionService {
    constructor(
        @inject(INJECTABLES.PermissionProvider) private permissionProvider: IPermissionProvider
    ) {}

    async addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number> {
        [groupId, ...userIds].forEach(id => validateId(id));
        return await this.permissionProvider.addUsersToGroup(groupId, userIds);
    }
}
