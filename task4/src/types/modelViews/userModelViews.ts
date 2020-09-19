import { User } from '../User';

export type NewUserModelView = Omit<User, 'id'>;

export type UserModelView = Omit<User, 'password'>;

export type UpdateUserModelView = {
    id: string,
    login?: string,
    password?: string,
    age?: number
}
