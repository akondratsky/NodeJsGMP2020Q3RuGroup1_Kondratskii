import Joi from '@hapi/joi';

export const newUserSchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .min(4)
        .max(130)
        .optional()
});
