import { Router } from 'express';
import { userService } from 'app/services';
import { validator, userSchema, idSchema, searchSchema } from 'app/services/validators';

const router = Router();

router.get('/:id', validator.params(idSchema), async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.status(user ? 200 : 404);
    res.json(user);
});

router.get('/', validator.query(searchSchema), async (req, res) => {
    const loginSubstring: string = req.query.search ? req.query.search as string : '';
    const limit: number | null = req.query.limit === void 0 ? null : +(req.query.limit);
    const foundUsers = await userService.getAutoSuggest(loginSubstring, limit);
    res.json(foundUsers);
});

router.post('/', validator.body(userSchema), (req, res) => {
    const userId = userService.updateOrCreate(req.body);
    res.json({ id: userId });
});

router.delete('/', validator.body(idSchema), async (req, res) => {
    const userId = req.body.id;
    const isDeleted = await userService.softDelete(userId);
    res.sendStatus(isDeleted ? 200 : 404);
});

export default router;
