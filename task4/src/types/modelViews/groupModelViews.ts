import { Group } from '../Group';
import { UUID } from '../UUID';
import { Permission } from '../Permission';

export type CreateGroupViewModel = Omit<Group, 'id'>;

export type UpdateGroupViewModel = {
    id: UUID,
    name?: string,
    permissions?: Array<Permission>
}
