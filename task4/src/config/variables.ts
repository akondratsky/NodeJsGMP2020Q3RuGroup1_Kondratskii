import { argv } from 'yargs';

export const PORT = argv.port as number || 4000;

export const CONNECTION_STRING = argv.connectionString as string || 'postgres://eynuhexy:qcrTBGpF7uIlN1ttErKyMQKX10_xVIoN' +
    '@lallah.db.elephantsql.com:5432/eynuhexy';
