import { config as configureApplication } from 'dotenv';

const { error, parsed: config } = configureApplication({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

if (error || !config) {
    throw new Error('Invalid configuration');
}


export const PORT = config.NODEMENT_PORT || 4000;

export const CONNECTION_STRING = config.NODEMENT_CONN_STRING || 'postgres://eynuhexy:7l8IW5q-dbASGstIQLfFZkL4g9kyWm4p' +
    '@lallah.db.elephantsql.com:5432/eynuhexy';

export const DEBUG = config.NODEMENT_DEBUG === 'true';
