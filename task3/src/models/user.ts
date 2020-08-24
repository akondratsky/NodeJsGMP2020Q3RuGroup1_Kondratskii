import { DataTypes, Model } from 'sequelize';
import { sequelize } from './connection';

export interface UserAttributes {
    id: string,
    login: string,
    password: string,
    age?: number,
    isDeleted: boolean
}

export class User extends Model<UserAttributes> {}

User.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
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
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'Users',
    timestamps: false,
    sequelize
});
