import { UUID } from './UUID'
import { Permission } from './Permission';

export type Group = {
    id: UUID,
    name: string,
    permissions: Array<Permission>
};
