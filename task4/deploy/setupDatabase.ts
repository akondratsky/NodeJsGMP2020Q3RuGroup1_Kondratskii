import { Client } from 'pg';
import { readFileSync } from 'fs';

const sql = (fileName: string): string => readFileSync(fileName, 'utf-8');

const setupDatabase = async () => {
    const client = new Client({
        user: 'eynuhexy',
        host: 'lallah.db.elephantsql.com',
        database: 'eynuhexy',
        password: '7l8IW5q-dbASGstIQLfFZkL4g9kyWm4p'
    });

    await client.connect();

    await client.query(sql('./sql/createUsers.sql'));
    await client.query(sql('./sql/createGroups.sql'));
    await client.query(sql('./sql/createUserGroups.sql'));

    await client.end();
};

setupDatabase();
