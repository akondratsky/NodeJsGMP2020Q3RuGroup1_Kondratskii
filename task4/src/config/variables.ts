import { argv } from 'yargs';

export const PORT = argv.PORT || 4000;

export const CONNECTION_STRING = argv.CONNECTION_STRING || 'postgres://eynuhexy:qcrTBGpF7uIlN1ttErKyMQKX10_xVIoN' +
    '@lallah.db.elephantsql.com:5432/eynuhexy';
