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
                'Incorrect request to GET group',
                id
            );
            throw error;
        }

        const group = await this.groupProvider.getById(id);

        this.loggerService.debug('Group was found', group);

        return group;
    }

    async getAll(): Promise<Array<Group>> {
        const groups = await this.groupProvider.getAll();

        this.loggerService.debug(`Found ${groups.length} groups`);

        return groups;
    }

    async create(group: CreateGroupViewModel): Promise<UUID> {
        const { error } = createGroupSchema.validate(group);

        if (error) {
            this.loggerService.error(
                'Incorrect request to CREATE groupd',
                group
            );
            throw error;
        }

        const id = await this.groupProvider.create(group);

        this.loggerService.info(
            `Successfully created group ${id}`,
            { id, ...group }
        );

        return id;
    }

    async update(group: UpdateGroupViewModel): Promise<UUID> {
        const { error } = updateGroupSchema.validate(group);

        if (error) {
            this.loggerService.error(
                'Incorrect request to UPDATE group',
                group
            );
            throw error;
        }

        const id = await this.groupProvider.update(group);

        this.loggerService.info(
            `Successfully updated group ${id}`,
            group
        );

        return id;
    }

    async delete(id: UUID): Promise<void> {
        const { error } = guidSchema.validate(id);

        if (error) {
            this.loggerService.error(
                'Incorrect request to DELETE group',
                id
            );
            throw error;
        }

        await this.groupProvider.delete(id);

        this.loggerService.info(
            'Group successfully deleted',
            id
        );
    }
}
