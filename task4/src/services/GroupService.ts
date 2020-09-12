import { injectable, inject } from 'inversify';
import { IGroupService, IGroupProvider, ILoggerService } from 'app/interfaces';
import { Group, UUID, UpdateGroupViewModel, CreateGroupViewModel, INJECTABLES } from 'app/types';
import { guidSchema, createGroupSchema, updateGroupSchema } from './validation';


@injectable()
export class GroupService implements IGroupService {
    constructor(
        @inject(INJECTABLES.GroupProvider) private groupProvider: IGroupProvider,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

    async getById(id: UUID): Promise<Group> {
        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(
                this,
                this.getById,
                'Incorrect request to GET group',
                id
            );
            throw error;
        }

        const group = await this.groupProvider.getById(id);

        this.loggerService.debug(this, this.getById, 'Group was found', group);

        return group;
    }

    async getAll(): Promise<Array<Group>> {
        const groups = await this.groupProvider.getAll();

        this.loggerService.debug(this, this.getAll, `Found ${groups.length} groups`);

        return groups;
    }

    async create(group: CreateGroupViewModel): Promise<UUID> {
        const { error } = createGroupSchema.validate(group);

        if (error) {
            this.loggerService.error(
                this,
                this.create,
                'Incorrect request to CREATE groupd',
                group
            );
            throw error;
        }

        const id = await this.groupProvider.create(group);

        this.loggerService.info(
            this,
            this.create,
            `Successfully created group ${id}`,
            { id, ...group }
        );

        return id;
    }

    async update(group: UpdateGroupViewModel): Promise<UUID> {
        const { error } = updateGroupSchema.validate(group);

        if (error) {
            this.loggerService.error(
                this,
                this.update,
                'Incorrect request to UPDATE group',
                group
            );
            throw error;
        }

        const id = await this.groupProvider.update(group);

        this.loggerService.info(
            this,
            this.update,
            `Successfully updated group ${id}`,
            group
        );

        return id;
    }

    async delete(id: UUID): Promise<void> {
        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(
                this,
                this.delete,
                'Incorrect request to DELETE group',
                id
            );
            throw error;
        }

        await this.groupProvider.delete(id);

        this.loggerService.info(
            this,
            this.delete,
            'Group successfully deleted',
            id
        );
    }
}
