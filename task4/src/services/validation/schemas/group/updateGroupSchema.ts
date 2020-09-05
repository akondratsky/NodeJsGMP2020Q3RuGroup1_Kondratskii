import Joi from '@hapi/joi';
import {} from 'app/types';

import { PERMISSION } from 'app/services/constants';

export const updateGroupSchema = Joi.object({
    id: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .label('Group ID'),
    name: Joi.string()
        .optional()
        .label('Group name'),
    permissions: Joi.array()
        .items(
            Joi.string()
                .allow(...Object.keys(PERMISSION))
                .label('Permission')
        )
        .optional()
        .label('Permissions')
}).options({
    abortEarly: false,
    errors: {
        wrap: { label: false }
    }
});
