import { Group, UUID, CreateGroupViewModel, UpdateGroupViewModel } from 'app/types';

export interface IGroupProvider {
    getById(id: UUID): Promise<Group>;
    getAll(): Promise<Array<Group>>;
    create(group: CreateGroupViewModel): Promise<UUID>;
    update(group: UpdateGroupViewModel): Promise<UUID>;
    delete(id: UUID): Promise<void>;
}
