import Joi from '@hapi/joi';
import {} from 'app/types';
import { PERMISSION } from 'app/services/constants';

export const createGroupSchema = Joi.object({
    name: Joi.string()
        .required(),
    permissions: Joi.array()
        .items(
            Joi.any().allow(...Object.keys(PERMISSION))
        )
        .required()
});
