/* eslint-disable @typescript-eslint/no-var-requires */

const { Client } = require('pg');
const { readFileSync } = require('fs');

const sql = (fileName) => readFileSync(fileName, 'utf-8');

module.exports = async () => {
    console.log('Starting initializing of database for testing');

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

    console.log('Database was initialized for testing');
};
