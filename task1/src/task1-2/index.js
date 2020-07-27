const csv = require('csvtojson');
const fs = require('fs');
const PluckObjectTransformStream = require('./PluckObjectTransformStream');

const csvFile = './csv/table.csv';
const outputFile = './output_task1-2.txt';

const handleError = (err) => console.error(err);

const readStream = fs.createReadStream(csvFile);
const writeStream = fs.createWriteStream(outputFile);
const pluckTransformer = new PluckObjectTransformStream([
    { field: 'Book' },
    { field: 'Author' },
    { field: 'Price', isNumber: true }
]);

readStream.on('error', handleError);
writeStream.on('error', handleError);
pluckTransformer.on('error', handleError);

readStream
    .pipe(csv())
    .pipe(pluckTransformer)
    .pipe(writeStream);
