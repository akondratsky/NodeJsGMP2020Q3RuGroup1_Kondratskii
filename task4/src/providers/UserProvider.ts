import { injectable } from 'inversify';
import { IUserProvider } from 'app/interfaces';
import { User, UpdateUserModelView, UserModelView, NewUserModelView, UUID } from 'app/types';
import { UserModel } from 'app/models';
import { UserNotFoundError } from 'app/errors';
import { Op } from 'sequelize';

const flattenUser = (model: UserModel): User => {
    const id = model.get('id') as UUID;
    const login = model.get('login') as string;
    const password = model.get('password') as string;
    const age = model.get('age') ? model.get('age') as number : void 0;

    return {
        id,
        login,
        password,
        age
    };
};

@injectable()
export class UserProvider implements IUserProvider {
    async search(loginSubstring: string, limit: number | undefined): Promise<Array<UserModelView>> {
        const foundUsers = await UserModel.findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring
                }
            },
            limit
        });

        return foundUsers.map((usr) => {
            const { id, login, age } = flattenUser(usr);
            return { id, login, age };
        });
    }

    async getById(id: string): Promise<UserModelView> {
        const user = await UserModel.findOne({
            where: { id }
        });

        if (!user) {
            throw new UserNotFoundError(id);
        }

        const login = user.get('login') as string;
        const age = user.get('age') ? user.get('age') as number : void 0;

        return {
            id,
            login,
            age
        };
    }

    async create(user: NewUserModelView): Promise<UUID> {
        const newUser = await UserModel.create(user);
        return newUser.get('id') as UUID;
    }

    async update(user: UpdateUserModelView): Promise<UUID> {
        const [numberOfUpdated] = await UserModel.update(user, {
            where: { id: user.id }
        });
        if (numberOfUpdated !== 1) {
            throw new UserNotFoundError(user.id);
        }
        return user.id;
    }

    async delete(id: UUID): Promise<void> {
        const numberOfDeleted = await UserModel.destroy({
            where: { id }
        });
        if (numberOfDeleted !== 1) {
            throw new UserNotFoundError(id);
        }
    }
}
