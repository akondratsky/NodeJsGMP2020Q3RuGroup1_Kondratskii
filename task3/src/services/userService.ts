import { loggerService } from 'app/services/loggerService';
import { userProvider } from 'app/dataAccess';
import { User, UserAttributes } from 'app/models';

export const getById = async (id: string) : Promise<User | null> => {
    const user = await userProvider.getById(id);

    if (user) {
        loggerService.info(`User found by ID=${id}`);
    } else {
        loggerService.error(`User with ID does not exist, ID=${id}`);
    }

    return user;
};

export const getAutoSuggest = async (loginSubstring: string, limit: number | null): Promise<User[]> => {
    const users = await userProvider.find(loginSubstring, limit);
    loggerService.info(`Found ${users.length} users, limit: ${limit}, search: "${loginSubstring}"`);
    return users;
};

export const updateOrCreate = async (user: UserAttributes): Promise<string> => {
    loggerService.info(`Updating/creating user: ${JSON.stringify(user)}`);
    const id = userProvider.updateOrCreate(user);
    loggerService.info(`User successfully created/updated, ID=${id}`);
    return id;
};

export const softDelete = async (id: string): Promise<boolean> => {
    loggerService.info(`Deleting user with ID=${id}`);
    const isDeleted = userProvider.softDelete(id);
    if (isDeleted) {
        loggerService.info(`Successfully deleted user ${id}`);
    } else {
        loggerService.error(`User not found ${id}`);
    }
    return isDeleted;
};
