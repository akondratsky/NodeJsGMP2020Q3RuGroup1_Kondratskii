import Joi from '@hapi/joi';

export const searchUserSchema = Joi.object({
    limit: Joi.number().min(1).optional().label('limit'),
    loginSubstring: Joi.string().allow('').optional()
});
