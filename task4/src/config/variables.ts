import { argv } from 'yargs';

export const PORT = argv.port as number || 4000;

export const CONNECTION_STRING = argv.connectionString as string || 'postgres://eynuhexy:7l8IW5q-dbASGstIQLfFZkL4g9kyWm4p' +
    '@lallah.db.elephantsql.com:5432/eynuhexy';
