import { injectable } from 'inversify';
import {  IPermissionProvider } from 'app/interfaces';
import { UUID } from 'app/types';
import { PermissionModel } from 'app/models';

@injectable()
export class PermissionProvider implements IPermissionProvider {
    async addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number> {
        for (let i = 0; i < userIds.length; i++) {
            const result = await PermissionModel.create({
                groupId,
                userId: userIds[i]
            });
            console.log('====================', result);
        }

        return 0;
    }
}
