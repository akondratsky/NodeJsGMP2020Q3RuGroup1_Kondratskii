import Joi from '@hapi/joi';

import { GUID_PATTERN } from '../constants';


export const guidSchema = Joi.string()
    .pattern(GUID_PATTERN)
    .required()
    .messages({
        'string.pattern.base': 'Incorrect UUID',
        'string.empty': 'UUID is required'
    });
