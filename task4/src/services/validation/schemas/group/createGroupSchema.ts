import Joi from '@hapi/joi';
import {} from 'app/types';
import { PERMISSION } from 'app/services/constants';

export const createGroupSchema = Joi.object({
    name: Joi.string()
        .required()
        .label('Group name'),
    permissions: Joi.array()
        .items(
            Joi.string()
                .valid(...Object.keys(PERMISSION))
                .label('Permission')
        )
        .required()
        .label('Array of permissions')
}).options({
    abortEarly: false,
    errors: {
        wrap: { label: false }
    }
});
