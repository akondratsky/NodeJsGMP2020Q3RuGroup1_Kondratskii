import request from 'supertest';
import { app } from 'app/app';

const UUID_REGEX = /[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/;

describe('GroupController', () => {
    let bearerToken: string;

    const authToken = (): [string, string] => ['Authorization', `Bearer ${bearerToken}`];

    let groupId: string;
    const groupName = 'testUserLogin';
    const groupPermissions = ['READ', 'WRITE'];

    const groupNameUpdated = 'testUserLogin2';
    const groupPermissionsUpdated = ['READ'];

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

    it('creates group', async () => {
        const response = await request(app)
            .post('/groups')
            .set(...authToken())
            .send({
                name: groupName,
                permissions: groupPermissions
            });
        expect(response.status).toBe(200);
        expect(UUID_REGEX.test(response.body)).toBe(true);
        groupId = response.body;
    });

    it('updates group', async () => {
        const response = await request(app)
            .patch('/groups')
            .set(...authToken())
            .send({
                id: groupId,
                name: groupNameUpdated,
                permissions: groupPermissionsUpdated
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(groupId);
    });

    it('gets all groups', async () => {
        const response = await request(app)
            .get('/groups')
            .set(...authToken());
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        const group = response.body.find(
            ({ id }: { id: string }) => id === groupId
        );
        expect(group).toEqual({
            id: groupId,
            name: groupNameUpdated,
            permissions: groupPermissionsUpdated
        });
    });

    it('deletes group', async () => {
        const response = await request(app)
            .delete(`/groups?id=${groupId}`)
            .set(...authToken());
        expect(response.status).toBe(200);
    });

    it('not finds deleted groups', async () => {
        const response = await request(app)
            .get(`/groups?id=${groupId}`)
            .set(...authToken());
        expect(response.status).toBe(400);
    });
});
