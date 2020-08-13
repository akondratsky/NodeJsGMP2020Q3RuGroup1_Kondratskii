import { Router } from 'express';
import { logger } from './logger';
import {
    getUserById,
    updateOrCreateUser,
    deleteUser,
    getAutoSuggestUsers
} from './usersService';

const router = Router();

router.get('/:id', (req, res) => {
    const user = getUserById(req.params.id);
    res.status(user ? 200 : 404);
    res.json(user);
});

router.get('/', (req, res) => {
    const loginSubstring: string = <string> req.query.search;
    const limit: number = +(<string>req.query.limit) || 0;
    res.json(
        getAutoSuggestUsers(loginSubstring, limit)
    );
});

router.post('/', (req, res) => {
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

router.delete('/', (req, res) => {
    const userId = req.body.id;
    logger.info(`Deleting user with ID=${userId}`);
    deleteUser(userId);
    res.end();
});

export default router;
