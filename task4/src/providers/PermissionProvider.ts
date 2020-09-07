import { injectable, inject } from 'inversify';
import {  IPermissionProvider, ILoggerService } from 'app/interfaces';
import { UUID, INJECTABLES } from 'app/types';
import { PermissionModel } from 'app/models';

@injectable()
export class PermissionProvider implements IPermissionProvider {
    constructor(
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

    async addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number> {
        const records = [];
        for (let i = 0; i < userIds.length; i++) {
            records.push({ groupId, userId: userIds[i] });
        }

        const result = await PermissionModel.bulkCreate(records);

        this.loggerService.info(`Successfully assigned role to ${result.length} users`, { groupId, userIds });

        return result.length;
    }
}
