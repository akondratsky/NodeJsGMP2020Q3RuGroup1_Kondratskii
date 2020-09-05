import { Sequelize } from 'sequelize';
import { CONNECTION_STRING } from 'app/config';

export const sequelize = new Sequelize(CONNECTION_STRING);

