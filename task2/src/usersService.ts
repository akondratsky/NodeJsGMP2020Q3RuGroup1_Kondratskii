interface User {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
}

const users: User[] = [
    ({
        id: '42',
        login: 'mooglass_domas',
        password: 'hehehe',
        age: 42,
        isDeleted: false
    } as User)
];

export const getUserById = (idToFind: string) : User | undefined => {
    return users.find(({ id }) => id === idToFind);
};

const findIndexById = (idToSearch: string) => users.findIndex(({ id }) => id === idToSearch);

export const updateOrCreateUser = (user: User): void => {
    const existingUserIndex = findIndexById(user.id);
    if (existingUserIndex === -1) {
        users.push(user);
    } else {
        users[existingUserIndex] = user;
    }
};

export const deleteUser = (idToDelete: string): void => {
    const existingUserIndex = findIndexById(idToDelete);
    if (!existingUserIndex) throw new Error('id does not exist');
    users[existingUserIndex].isDeleted = true;
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] => {
    let numberOfFound = 0;
    const foundUsers = [];

    for (let i = 0; i < users.length; i++) {
        if (numberOfFound >= limit) break;
        if (users[i].login.includes(loginSubstring)) {
            foundUsers.push(users[i]);
            numberOfFound++;
        }
    }

    return foundUsers;
};
