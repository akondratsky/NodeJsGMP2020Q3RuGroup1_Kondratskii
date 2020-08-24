import { User, UserAttributes } from 'app/models';
import { Op } from 'sequelize';

export const getById = async (id: string) : Promise<User | null> => {
    return await User.findOne({
        where: {
            id
        },
        raw: true
    });
};

export const find = async (loginSubstring: string, limit: number | null) : Promise<User[]> => {
    return await User.findAll({
        where: {
            login: {
                [Op.substring]: loginSubstring
            }
        },
        limit: limit === null ? void 0 : limit,
        raw: true
    });
};

export const updateOrCreate = async (user: UserAttributes) : Promise<string> => {
    const [updatedUser] = await User.upsert(user);
    return await updatedUser.get('id') as string;
};

export const softDelete = async (id: string) : Promise<boolean> => {
    const user = await getById(id);
    if (!user) {
        return false;
    }
    await User.update({
        isDeleted: true
    }, {
        where: {
            id
        }
    });
    return true;
};
