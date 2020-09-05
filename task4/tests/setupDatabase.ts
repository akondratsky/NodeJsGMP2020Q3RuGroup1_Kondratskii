import 'mocha';
import { before } from 'mocha';
import { Client } from 'pg';
import { readFileSync } from 'fs';

const sql = (fileName: string): string => readFileSync(fileName, 'utf-8');

before(async () => {
    const client = new Client({
        user: 'ewevhcne',
        host: 'lallah.db.elephantsql.com',
        database: 'ewevhcne',
        password: '66JWBbuRn122Hw7OajJdPp9PqRMal5RX'
    });

    await client.connect();

    await client.query(sql('./sql/createUsers.sql'));
    await client.query(sql('./sql/createGroups.sql'));
    await client.query(sql('./sql/createUserGroups.sql'));

    await Promise.resolve();
});
