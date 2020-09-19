import Joi from '@hapi/joi';


export const guidSchema = Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .messages({
        'string.guid': 'Group ID shoud be valid GUID',
        'string.pattern.base': 'Incorrect UUID',
        'string.empty': 'UUID is required'
    });
