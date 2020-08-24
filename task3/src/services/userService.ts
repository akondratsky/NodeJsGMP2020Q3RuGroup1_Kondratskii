import { logger } from 'app/services/logger';
import { userProvider } from 'app/dataAccess';
import { User } from 'app/models';

// const users: User[] = createFakeData(42);

// const findUserIndexById = async (idToSearch: string) => {
//     const foundUsers = await UserModel.findAll({
//         where: {
//             id: idToSearch
//         }
//     });
//     return foundUsers.length ? foundUsers[0] : null;
// };


export const getUserById = async (idToFind: string) : Promise<User | null> => {
    const user = await userProvider.getById(idToFind);

    if (user) {
        logger.info(`User found by ID=${idToFind}`);
    } else {
        logger.error(`User with ID does not exist, ID=${idToFind}`);
    }

    return user;
};


// export const updateOrCreateUser = async (user: User): Promise<string | null> => {
//     const index = await findUserIndexById(user.id);

//     if (index > -1) {
//         users[index] = { ...user };
//         logger.info(`User successfully updated, ID=${user.id}`);
//         return user.id;
//     }

//     users.push(user);
//     logger.info(`Successfully created new user with ID=${user.id}`);
//     return user.id;
// };


// export const deleteUser = (userId: string): void => {
//     const userIndex = findUserIndexById(userId);
//     if (userIndex > -1) {
//         users[userIndex].isDeleted = true;
//         logger.info(`User marked as deleted: ${userId}`);
//     } else {
//         logger.error(`User ID does not exist: ${userId}`);
//     }
// };

// export const getAutoSuggestUsers = (loginSubstring: string, limit: number | null): User[] => {
//     let numberOfFound = 0;
//     const foundUsers = [];
//     const isEmpty = loginSubstring.length === 0;
//     for (let i = 0; i < users.length; i++) {
//         if (limit !== null && numberOfFound >= limit) break;
//         if (isEmpty || users[i].login.includes(loginSubstring)) {
//             foundUsers.push(users[i]);
//             numberOfFound++;
//         }
//     }
//     logger.info(`Found ${numberOfFound} users, limit: ${limit}, search: ${loginSubstring}`);
//     return foundUsers;
// };
