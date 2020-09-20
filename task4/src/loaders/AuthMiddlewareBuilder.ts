import { IAuthMiddlewareBuilder, ILoggerService } from 'app/interfaces';
import { INJECTABLES } from 'app/types';
import { Handler } from 'express';
import { inject, injectable } from 'inversify';

import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { JsonWebTokenError } from 'jsonwebtoken';

@injectable()
export class AuthMiddlewareBuilder implements IAuthMiddlewareBuilder {
    constructor(
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {
        passport.serializeUser((user, done) => done(null, user));

        passport.deserializeUser((user, done) => done(null, user));

        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secreeeet'
        }, (jwtPayload, done) => {
            this.loggerService.debug(this, this.constructor, 'Authenticating user');
            return done(null, true);
        }));
    }

    getAuthInitializerMiddleware = (): Handler => {
        return passport.initialize();
    }

    getAuthMiddleware = (): Handler => {
        return (req, res, next) => {
            passport.authenticate('jwt', (err, user, info) => {
                if (err) {
                    console.log('error');
                    return next(err);
                }
                if (info instanceof JsonWebTokenError) {
                    console.log('jsonwebtokenerror');
                    return next(info);
                }
                if (!user) {
                    return console.log('no user');
                }
                this.loggerService.debug(this, this.getAuthMiddleware, 'User successfully authenticated');
                return next();
            })(req, res, next);
        };
    }
}
