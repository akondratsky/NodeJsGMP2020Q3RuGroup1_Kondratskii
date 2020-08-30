import { UUID, UpdateUserModelView, UserModelView, NewUserModelView } from 'app/types';

export interface IUserProvider {
    search(loginSubstring: string, limit: number | undefined): Promise<Array<UserModelView>>;
    getById(id: UUID): Promise<UserModelView>;
    create(user: NewUserModelView): Promise<UUID>;
    update(user: UpdateUserModelView): Promise<UUID>;
    delete(id: UUID): Promise<void>;
}
