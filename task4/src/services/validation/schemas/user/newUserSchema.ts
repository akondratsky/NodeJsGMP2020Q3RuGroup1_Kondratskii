import Joi from '@hapi/joi';

const MIN_AGE = 4;
const MAX_AGE = 130;

export const newUserSchema = Joi.object({
    login: Joi.string()
        .required()
        .label('Login'),
    password: Joi.string()
        .alphanum()
        .required()
        .label('Password'),
    age: Joi.number()
        .min(MIN_AGE)
        .max(MAX_AGE)
        .optional()
        .label('Age')
}).options({
    abortEarly: false,
    errors: {
        wrap: { label: false }
    }
});
