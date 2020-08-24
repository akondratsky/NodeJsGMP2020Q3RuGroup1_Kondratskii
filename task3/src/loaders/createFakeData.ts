import { User } from 'app/types';
import { v4 as uuid } from 'uuid';

const names: string[] = ['aleksandr', 'petr', 'ivan', 'aleksei'];
const passwords: string[] = ['qwerty', '12345', 'qwerty123'];
const ages: number[] = [42, 13, 23];

const getRandomFrom = (array: Array<string | number>): string | number => {
    return array[Math.floor(Math.random() * array.length)];
};


export const createFakeData = (number: number): User[] => {
    const users = [];
    users.push({
        id: 'e7fddbd6-b49b-45d3-9843-c070b0e52acc',
        login: 'admin',
        password: 'admin',
        age: 15,
        isDeleted: false
    } as User);

    for (let i = 0; i < number - 1; i++) {
        users.push({
            id: uuid(),
            login: getRandomFrom(names) + getRandomFrom(ages).toString(),
            password: getRandomFrom(passwords),
            age: getRandomFrom(ages),
            isDeleted: false
        } as User);
    }
    return users;
};
