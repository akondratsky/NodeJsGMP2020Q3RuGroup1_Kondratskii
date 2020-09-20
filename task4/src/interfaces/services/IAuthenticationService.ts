import { AuthData } from 'app/types';

export type IAuthenticationService = {
    login(username: string, password: string): Promise<AuthData>;
}
