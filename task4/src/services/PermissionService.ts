import { injectable, inject } from 'inversify';
import { IPermissionService, IPermissionProvider, ILoggerService } from 'app/interfaces';
import { UUID, INJECTABLES } from 'app/types';
import { addUsersToGroupSchema } from './validation';
import { measurable } from 'app/aspect/measurable';


@injectable()
export class PermissionService implements IPermissionService {
    constructor(
        @inject(INJECTABLES.PermissionProvider) private permissionProvider: IPermissionProvider,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

    @measurable
    async addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number> {
        const { error } = addUsersToGroupSchema.validate({ groupId, userIds });

        if (error) {
            this.loggerService.error(
                this, this.addUsersToGroup, 'Incorrect request to add users to group', { groupId, userIds }
            );
            throw error;
        }

        return await this.permissionProvider.addUsersToGroup(groupId, userIds);
    }
}
