import Joi from '@hapi/joi';
import { GUID_PATTERN } from 'app/services/validation/constants';

export const updateUserSchema = Joi.object({
    id: Joi.string()
        .pattern(GUID_PATTERN)
        .required(),
    login: Joi.string()
        .optional(),
    password: Joi.string()
        .alphanum()
        .optional(),
    age: Joi.number()
        .min(4)
        .max(130)
        .optional()
});
