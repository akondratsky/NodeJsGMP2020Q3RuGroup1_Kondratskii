import { Response, Request, NextFunction } from 'express';
import {  injectable } from 'inversify';
import { IErrorHandlersBuilder, ErrorHandler } from 'app/interfaces';
import { GroupNotFoundError, UserNotFoundError } from 'app/errors';
import { ValidationError } from '@hapi/joi';

@injectable()
export class ErrorHandlersBuilder implements IErrorHandlersBuilder {
    validationErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
        if (!(error instanceof ValidationError)) {
            return next(error);
        }

        const messages = (error as ValidationError).details.map(({ message }) => message);

        res.status(400);
        res.json({
            error: true,
            messages
        });
    }

    groupNotFoundErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
        if (!(error instanceof GroupNotFoundError)) {
            return next(error);
        }
        res.status(400);
        res.json({
            error: true,
            messages: ['Group with such ID was not found']
        });
    }

    userNotFoundErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
        if (!(error instanceof UserNotFoundError)) {
            return next(error);
        }

        res.status(400);
        res.json({
            error: true,
            messages: ['User with such ID was not found']
        });
    }

    create(): Array<ErrorHandler> {
        return [
            this.validationErrorHandler,
            this.groupNotFoundErrorHandler,
            this.userNotFoundErrorHandler
        ];
    }
}
