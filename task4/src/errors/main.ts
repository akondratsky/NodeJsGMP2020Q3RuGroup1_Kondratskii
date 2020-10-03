export class GroupNotFoundError extends Error {}

export class UserNotFoundError extends Error {}

export class BadImplementationError extends Error {}

export class AuthenticationError extends Error {
    constructor(public login: string, message: string) {
        super(message);
    }
};