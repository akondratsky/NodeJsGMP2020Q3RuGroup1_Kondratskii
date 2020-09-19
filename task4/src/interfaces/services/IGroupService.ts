import { UUID, Group, CreateGroupViewModel, UpdateGroupViewModel } from 'app/types';

export type IGroupService = {
    getById(id: UUID): Promise<Group>;

    getAll(): Promise<Array<Group>>;

    create(group: CreateGroupViewModel): Promise<UUID>;

    update(group: UpdateGroupViewModel): Promise<UUID>;

    delete(id: UUID): Promise<void>;
}
