import { Response, Request, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IErrorHandlersBuilder, ILoggerService, ErrorHandler } from 'app/interfaces';
import { INJECTABLES } from 'app/types';
import { GroupNotFoundError, UserNotFoundError } from 'app/errors';
import { ValidationError } from '@hapi/joi';

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.loggerService.error('Validation error', (error as any)._original);

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
        this.loggerService.error(error.toString());
        res.json(error);
    }

    userNotFoundErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
        if (!(error instanceof UserNotFoundError)) {
            return next(error);
        }
        this.loggerService.error(error.toString());
        res.json(error);
    }

    create(): Array<ErrorHandler> {
        return [
            this.validationErrorHandler,
            this.groupNotFoundErrorHandler,
            this.userNotFoundErrorHandler
        ];
    }
}
