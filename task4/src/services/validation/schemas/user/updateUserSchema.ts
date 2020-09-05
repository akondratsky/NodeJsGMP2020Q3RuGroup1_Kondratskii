import Joi from '@hapi/joi';

export const updateUserSchema = Joi.object({
    id: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .label('User ID'),
    login: Joi.string()
        .optional(),
    password: Joi.string()
        .alphanum()
        .optional()
        .label('Password'),
    age: Joi.number()
        .min(4)
        .max(130)
        .optional()
        .label('Age')
}).options({
    abortEarly: false,
    errors: {
        wrap: { label: false }
    }
});
