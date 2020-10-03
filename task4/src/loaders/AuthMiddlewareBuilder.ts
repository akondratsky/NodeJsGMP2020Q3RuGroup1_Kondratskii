import { IAuthenticationService, IAuthMiddlewareBuilder, ILoggerService } from 'app/interfaces';
import { INJECTABLES } from 'app/types';
import { Handler, Router } from 'express';
import { inject, injectable } from 'inversify';

import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET } from 'app/config';
import { AuthenticationError } from 'app/errors';

@injectable()
export class AuthMiddlewareBuilder implements IAuthMiddlewareBuilder {
    constructor(
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService,
        @inject(INJECTABLES.AuthenticationService) private authService: IAuthenticationService
    ) {
        passport.serializeUser((user, done) => done(null, user));

        passport.deserializeUser((user, done) => done(null, user));

        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        }, (jwtPayload, done) => {
            this.loggerService.debug(this, this.constructor, 'Authenticating user', jwtPayload);
            const { exp, data: { login } } = jwtPayload;
            if (Date.now() > exp) {
                return done(new AuthenticationError(login, 'Session expired'));
            }
            return done(null, true);
        }));
    }

    getAuthInitializerMiddleware = (): Handler => {
        return passport.initialize();
    }

    getAuthRoutingMiddleware = (): Router => {
        return Router()
            .post('/login', async (req, res, next) => {
                const { login, password } = req.body;
                this.loggerService.debug(this, this.getAuthRoutingMiddleware, `Authentication try with login "${login}"`);
                await this.authService.login(login, password)
                    .then(result => res.json(result))
                    .catch(next);
            });
    }

    /*
     * Custom middleware with custom error handling
      https://stackoverflow.com/questions/35980685/is-node-passport-custom-callback-as-middleware-possible-for-express-routes
    */
    getAuthMiddleware = (): Handler => {
        return (req, res, next) => {
            passport.authenticate('jwt', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (info instanceof JsonWebTokenError) {
                    return next(info);
                }
                if (!user) {
                    return next(new AuthenticationError('', 'User not authenticated'));
                }
                this.loggerService.debug(this, this.getAuthMiddleware, 'User successfully authenticated');
                return next();
            })(req, res, next);
        };
    }
}
