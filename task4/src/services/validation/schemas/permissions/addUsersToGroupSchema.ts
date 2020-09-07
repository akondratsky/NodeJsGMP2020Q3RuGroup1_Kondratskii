import Joi from '@hapi/joi';

export const addUsersToGroupSchema = Joi.object({
    groupId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .label('Group ID'),
    userIds: Joi.array()
        .items(
            Joi.string().guid({ version: 'uuidv4' }).label('User ID')
        )
        .required()
        .label('Array of User IDs')
}).options({
    abortEarly: false,
    errors: {
        wrap: { label: false }
    }
});
