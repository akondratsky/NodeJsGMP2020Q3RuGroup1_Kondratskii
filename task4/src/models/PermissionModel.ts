import { DataTypes, Model } from 'sequelize';
import { UserModel } from './UserModel';
import { GroupModel } from './GroupModel';
import { UUID } from 'app/types';
import { sequelize } from 'app/config';

type UserGroupAttributes = {
    userId: UUID,
    groupId: UUID
}

export class PermissionModel extends Model<UserGroupAttributes> {}

PermissionModel.init({
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'UserModel',
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'GroupModel',
            key: 'id'
        }
    }
}, {
    tableName: 'UserGroups',
    timestamps: false,
    sequelize
});

UserModel.belongsToMany(GroupModel, { through: 'UserGroups' });
GroupModel.belongsToMany(UserModel, { through: 'UserGroups' });
