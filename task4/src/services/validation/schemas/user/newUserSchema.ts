import Joi from '@hapi/joi';

export const newUserSchema = Joi.object({
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
