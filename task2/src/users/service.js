const users = [{
    id: '42',
    login: 'mooglass_domas',
    password: 'hehehe',
    age: 42,
    isDeleted: false
}];

export const getUserById = (idToFind) => {
    return users.find(({ id }) => id === idToFind);
};

const findIndexById = (idToSearch) => users.findIndex(({ id }) => id === idToSearch);

export const updateOrCreateUser = (user) => {
    const existingUserIndex = findIndexById(user.id);
    if (existingUserIndex === -1) {
        users.push(user);not
    } else {
        users[existingUserIndex] = user;
    }
};

export const deleteUser = (idToDelete) => {
    const existingUserIndex = findIndexById(idToDelete);
    if (!existingUserIndex) throw new Error('id does not exist');
    users[existingUserIndex].isDeleted = true;
};

export const getAutoSuggestUsers = (loginSubstring, limit) => {
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
