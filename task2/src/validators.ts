import Joi from '@hapi/joi';

import { createValidator } from 'express-joi-validation';

const GUID_PATTERN = /^[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}$/;

export const validator = createValidator();

export const userSchema = Joi.object({
    id: Joi.string()
        .pattern(GUID_PATTERN)
        .required(),
    login: Joi.string()
        .required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .min(4)
        .max(130),
    isDeleted: Joi.boolean()
});

export const idSchema = Joi.object({
    id: Joi.string()
        .pattern(GUID_PATTERN)
        .required()
});

export const searchSchema = Joi.object({
    limit: Joi.number().min(1),
    search: Joi.string().min(1)
});