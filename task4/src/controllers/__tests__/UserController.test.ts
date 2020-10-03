import request from 'supertest';
import { app } from 'app/app';

const UUID_REGEX = /[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/;

describe('UserController', () => {
    let bearerToken: string;

    const authToken = (): [string, string] => ['Authorization', `Bearer ${bearerToken}`];

    let userId: string;
    const newLogin = 'testUserLogin';
    const newPassword = 'testUserPwd';
    const newAge = 42;
    const newAgeUpdated = 43;

    beforeAll(() => {
        return request(app)
            .post('/login')
            .send({
                login: 'admin',
                password: 'qwerty'
            })
            .then(({ body: { token } }) => {
                bearerToken = token;
            });
    });

    it('creates user', async () => {
        const response = await request(app)
            .post('/users')
            .set(...authToken())
            .send({
                login: newLogin,
                password: newPassword,
                age: newAge
            });
        // check user was created
        expect(response.status).toBe(200);
        expect(UUID_REGEX.test(response.body)).toBe(true);
        userId = response.body;
    });

    it('gets user', async () => {
        const response = await request(app)
            .get(`/users?id=${userId}`)
            .set(...authToken());
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: userId,
            login: newLogin,
            age: newAge
        });
    });

    it('updates user', async () => {
        const response = await request(app)
            .patch('/users')
            .set(...authToken())
            .send({
                id: userId,
                age: newAgeUpdated
            });
        expect(response.status).toBe(200);
        expect(UUID_REGEX.test(response.body)).toBe(true);
    });

    it('get all users', async () => {
        const response = await request(app)
            .get('/users')
            .set(...authToken());
        expect(Array.isArray(response.body)).toBe(true);
        const user = response.body.find(
            ({ id }: { id: string }) => id === userId
        );
        expect(user).toEqual({
            id: userId,
            login: newLogin,
            age: newAgeUpdated
        });
    });

    it('delete user', async () => {
        const response = await request(app)
            .delete(`/users?id=${userId}`)
            .set(...authToken());
        expect(response.status).toBe(200);
    });

    it('get user which was deleted returns 404', async () => {
        const response = await request(app)
            .get(`/users?id=${userId}`)
            .set(...authToken());
        expect(response.status).toBe(400);
    });
});
