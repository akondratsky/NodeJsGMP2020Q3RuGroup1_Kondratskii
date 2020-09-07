import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from 'app/config';
import { Group, CreateGroupViewModel } from 'app/types';

export class GroupModel extends Model<Group | CreateGroupViewModel> {}

GroupModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(
            DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
        ),
        defaultValue: []
    }
}, {
    tableName: 'Groups',
    timestamps: true,
    paranoid: false,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sequelize
});

