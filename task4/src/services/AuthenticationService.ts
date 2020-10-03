import { injectable, inject } from 'inversify';
import { ILoggerService } from 'app/interfaces';
import { AuthData, INJECTABLES } from 'app/types';
import { measurable } from 'app/aspect/measurable';
import { IAuthenticationService } from 'app/interfaces';
import { UserModel } from 'app/models';
import { Op } from 'sequelize';
import { AuthenticationError } from 'app/errors';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'app/config';

@injectable()
export class AuthenticationService implements IAuthenticationService {
    constructor(
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

    @measurable
    async login(login: string, password: string): Promise<AuthData> {
        const user = await UserModel.findOne({
            where: {
                [Op.and]: [
                    { login },
                    { password }
                ]
            }
        });

        if (!user) {
            throw new AuthenticationError(login, 'User with such login/password was not found');
        }

        const token = jwt.sign({
            exp: Date.now() + 60 * 60 * 1000, // 1 hour
            data: {
                login
            }
        }, JWT_SECRET);

        return { token };
    }
}
