import { Sequelize } from 'sequelize';
import { CONNECTION_STRING } from 'app/config';
import { logger } from 'app/services';

export const sequelize = new Sequelize(CONNECTION_STRING, {
    logging: (msg) => {
        logger.info(msg);
    }
});

