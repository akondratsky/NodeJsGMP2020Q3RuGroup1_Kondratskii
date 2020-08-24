import { Router } from 'express';
import { logger } from 'app/services';
import {
    getUserById,
    updateOrCreateUser,
    deleteUser,
    getAutoSuggestUsers
} from 'app/services/users';
import { validator, userSchema, idSchema, searchSchema } from 'app/services/validators';

const router = Router();

router.get('/:id', validator.params(idSchema), (req, res) => {
    const user = getUserById(req.params.id);
    res.status(user ? 200 : 404);
    res.json(user);
});

router.get('/', validator.query(searchSchema), (req, res) => {
    const loginSubstring: string = req.query.search ? req.query.search as string : '';
    const limit: number | null = req.query.limit === void 0 ? null : +(req.query.limit);
    res.json(
        getAutoSuggestUsers(loginSubstring, limit)
    );
});

router.post('/', validator.body(userSchema), (req, res) => {
    const user = req.body;
    logger.info(`Updating/creating user: ${JSON.stringify(user)}`);
    const userId = updateOrCreateUser(req.body);
    if (userId) {
        res.send({ id: userId });
    } else {
        res.status(404);
    }
    res.end();
});

router.delete('/', validator.body(idSchema), (req, res) => {
    const userId = req.body.id;
    logger.info(`Deleting user with ID=${userId}`);
    deleteUser(userId);
    res.end();
});

export default router;
