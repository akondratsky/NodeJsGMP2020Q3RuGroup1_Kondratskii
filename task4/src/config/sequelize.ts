import { Sequelize } from 'sequelize';
import { DEFAULT_CONNECTION_STRING } from 'app/config';

export const sequelize = new Sequelize(DEFAULT_CONNECTION_STRING);

