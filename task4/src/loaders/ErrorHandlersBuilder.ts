import { Response, Request, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { IErrorHandlersBuilder, ErrorHandler, ILoggerService } from 'app/interfaces';
import { GroupNotFoundError, UserNotFoundError } from 'app/errors';
import { ValidationError } from '@hapi/joi';
import { INJECTABLES } from 'app/types';


@injectable()
export class ErrorHandlersBuilder implements IErrorHandlersBuilder {
    constructor(
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {}

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

    // eslint-disable-next-line
    uncaughtErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
        this.loggerService.error(this, this.uncaughtErrorHandler, 'Uncaught exception', error);
        res.status(500);
        res.json({
            error: true,
            messages: ['Server error']
        });
    }

    create(): Array<ErrorHandler> {
        return [
            this.validationErrorHandler,
            this.groupNotFoundErrorHandler,
            this.userNotFoundErrorHandler,
            this.uncaughtErrorHandler
        ];
    }
}
