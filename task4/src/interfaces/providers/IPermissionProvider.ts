import { UUID } from 'app/types';

export interface IPermissionProvider {
    addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number>;

}
