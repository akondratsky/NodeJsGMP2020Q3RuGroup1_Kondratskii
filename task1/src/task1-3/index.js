import csv from 'csvtojson';
import fs from 'fs';
import PluckObjectTransformStream from './PluckObjectTransformStream';

const csvFile = './csv/table.csv';
const outputFile = './output_task1-3.txt';

const handleError = (err) => console.error(err);

const readStream = fs.createReadStream(csvFile);
const writeStream = fs.createWriteStream(outputFile);
const pluckTransformer = new PluckObjectTransformStream([
    'Book',
    'Author',
    'Price'
]);

readStream.on('error', handleError);
writeStream.on('error', handleError);
pluckTransformer.on('error', handleError);

readStream
    .pipe(csv())
    .pipe(pluckTransformer)
    .pipe(writeStream);
