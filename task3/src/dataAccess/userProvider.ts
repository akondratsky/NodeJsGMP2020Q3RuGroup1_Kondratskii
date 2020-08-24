import { User } from 'app/models';
import { Model } from 'sequelize';

export const getById = async (id: string) : Promise<Model<any, any> | null> => {
    const found = await User.findOne({
        where: {
            id
        },
        raw: true
    });

    console.log(found);

    return found;
};
