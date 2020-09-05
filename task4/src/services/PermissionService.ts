import { injectable, inject } from 'inversify';
import { IPermissionService, IPermissionProvider } from 'app/interfaces';
import { UUID, INJECTABLES } from 'app/types';
import { guidSchema } from './validation';


@injectable()
export class PermissionService implements IPermissionService {
    constructor(
        @inject(INJECTABLES.PermissionProvider) private permissionProvider: IPermissionProvider
    ) {}

    async addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number> {
        [groupId, ...userIds].forEach(id => {
            const { error } = guidSchema.validate(id);
            if (error) throw error;
        });
        return await this.permissionProvider.addUsersToGroup(groupId, userIds);
    }
}
