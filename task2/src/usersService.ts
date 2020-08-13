import { User } from './schemas';
import { createFakeData } from './createFakeData';
import { logger } from './logger';


const users: User[] = createFakeData(42);

const findUserIndexById = (idToSearch: string) => {
    return users.findIndex(({ id }) => id === idToSearch);
}


export const getUserById = (idToFind: string) : User | undefined => {
    const user = users.find(({ id }) => id === idToFind);
    if (user) {
        logger.info(`User found by ID=${idToFind}`);
    } else {
        logger.error(`User with ID does not exist, ID=${idToFind}`);
    }
    return user;
};


export const updateOrCreateUser = (user: User): string | null => {
    const index = findUserIndexById(user.id);

    if (~index) {
        users[index] = { ...user };
        logger.info(`User successfully updated, ID=${user.id}`);
        return user.id;
    }

    users.push(user);
    logger.info(`Successfully created new user with ID=${user.id}`)
    return user.id;
};


export const deleteUser = (userId: string): void => {
    const userIndex = findUserIndexById(userId);
    if (~userIndex) {
        users[userIndex].isDeleted = true;
        logger.info(`User marked as deleted: ${userId}`);
    } else {
        logger.error(`User ID does not exist: ${userId}`)
    }
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number | null): User[] => {
    let numberOfFound = 0;
    const foundUsers = [];
    const isEmpty = loginSubstring.length === 0;
    for (let i = 0; i < users.length; i++) {
        if (limit !== null && numberOfFound >= limit) break;
        if (isEmpty || users[i].login.includes(loginSubstring)) {
            foundUsers.push(users[i]);
            numberOfFound++;
        }
    }
    logger.info(`Found ${numberOfFound} users, limit: ${limit}, search: ${loginSubstring}`);
    return foundUsers;
};
