import Joi from '@hapi/joi';
import {} from 'app/types';

import { PERMISSION } from 'app/services/constants';
import { GUID_PATTERN } from '../../constants';

export const updateGroupSchema = Joi.object({
    id:  Joi.string()
        .pattern(GUID_PATTERN)
        .required(),
    name: Joi.string()
        .optional(),
    permissions: Joi.array()
        .items(
            Joi.any().allow(...Object.keys(PERMISSION))
        )
        .optional()
});
