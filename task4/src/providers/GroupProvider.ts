import { injectable } from 'inversify';
import { IGroupProvider } from 'app/interfaces';
import { UpdateGroupViewModel, Group, CreateGroupViewModel, UUID } from 'app/types';
import { GroupModel } from 'app/models';
import { Permission } from 'app/types/Permission';
import { GroupNotFoundError } from 'app/errors';

const flattenGroup = (model: GroupModel): Group => {
    const id = model.get('id') as UUID;
    const name = model.get('name') as string;
    const permissions = model.get('permissions') as Array<Permission>;

    return {
        id,
        name,
        permissions
    };
};

@injectable()
export class GroupProvider implements IGroupProvider {
    async getById(id: UUID): Promise<Group> {
        const group = await GroupModel.findOne({
            where: { id }
        });

        if (!group) {
            throw new GroupNotFoundError(id);
        }

        return flattenGroup(group);
    }

    async getAll(): Promise<Array<Group>> {
        const result = await GroupModel.findAll();
        return result.map(flattenGroup);
    }

    async create(group: CreateGroupViewModel): Promise<UUID> {
        const newGroup = await GroupModel.create(group);
        return newGroup.get('id') as UUID;
    }

    async update(group: UpdateGroupViewModel): Promise<string> {
        const [numberOfUpdated] = await GroupModel.update(group, {
            where: { id: group.id }
        });
        if (numberOfUpdated !== 1) {
            throw new GroupNotFoundError(group.id);
        }
        return group.id;
    }

    async delete(id: UUID): Promise<void> {
        const numberOfDeleted = await GroupModel.destroy({
            where: { id }
        });
        if (numberOfDeleted !== 1) {
            throw new GroupNotFoundError(id);
        }
    }
}
