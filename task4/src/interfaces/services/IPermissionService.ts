import { UUID } from 'app/types';

export interface IPermissionService {
    addUsersToGroup(groupId: UUID, userIds: Array<UUID>): Promise<number>
}
