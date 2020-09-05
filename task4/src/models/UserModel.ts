import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from 'app/config';
import { User, NewUserModelView } from 'app/types';

export class UserModel extends Model<User | NewUserModelView> {}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
}, {
    tableName: 'Users',
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    sequelize
});

