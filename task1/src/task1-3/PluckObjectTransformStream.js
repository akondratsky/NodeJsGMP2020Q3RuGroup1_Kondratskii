import { Transform } from 'stream';

export default class PluckObjectTransformStream extends Transform {
    constructor(fieldNames) {
        super();
        if (!fieldNames || !Array.isArray(fieldNames)) {
            throw new Error('createPluckObjectStream takes field names as array');
        }
        this.fieldNames = fieldNames;
    }

    _transform(chunk, encoding, callback) {
        try {
            const serializedObject = chunk.toString('utf8');
            const readObject = JSON.parse(serializedObject);
            const writeObject = {};
            this.fieldNames.forEach(({ field, isNumber }) => {
                writeObject[field.toLowerCase()] = isNumber ?
                    parseFloat(readObject[field])
                    : readObject[field];
            });
            callback(null, JSON.stringify(writeObject) + '\r\n');
          } catch (err) {
            callback(err);
          }
    }
}
