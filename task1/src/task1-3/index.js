import csv from 'csvtojson';
import fs from 'fs';
import PluckObjectTransformStream from './PluckObjectTransformStream';
import { pipeline } from 'stream';

const csvFile = './csv/table.csv';
const outputFile = './output_task1-2.txt';
const pluckStreamOptions = [
    { field: 'Book' },
    { field: 'Author' },
    { field: 'Price', isNumber: true }
];

pipeline(
    fs.createReadStream(csvFile),
    csv(),
    new PluckObjectTransformStream(pluckStreamOptions),
    fs.createWriteStream(outputFile),
    (err) => err ?
            console.error('pipeline failed', err)
            : console.log('pipeline succeed')
);