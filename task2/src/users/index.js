import { Router } from 'express';
import { getUserById, updateOrCreateUser, deleteUser, getAutoSuggestUsers } from './service';

const router = Router();

router.get('/:id', (req, res) => {
    const user = getUserById(req.params.id);
    res.status(user ? 200 : 404);
    res.json(user);
});

router.get('/', (req, res) => {
    const loginSubstring = req.query.search;
    const limit = req.query.limit;
    res.json(
        getAutoSuggestUsers(loginSubstring, limit)
    );
});

router.post('/', (req, res) => {
    updateOrCreateUser(req.body);
    res.end();
});

router.delete('/', (req, res) => {
    deleteUser(req.body.id);
    res.end();
});

export default router;
