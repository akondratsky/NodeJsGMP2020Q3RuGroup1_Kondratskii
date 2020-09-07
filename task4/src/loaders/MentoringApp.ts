import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { IMentoringApp, IRouterBuilder, IErrorHandlersBuilder, ILoggerService } from 'app/interfaces';
import { INJECTABLES } from 'app/types';

@injectable()
export class MentoringApp implements IMentoringApp {
    constructor(
        @inject(INJECTABLES.RootRouterBuilder) private rootRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.ErrorHandlersBuilder) private errorHandlersBuilder: IErrorHandlersBuilder,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService
    ) {
    }

    // eslint-disable-next-line
    fatalErrorHandler = (error: any) => {
        this.loggerService.error('FATAL: Uncaught error', error);
    }

    public init(app: Application): void {
        process.on('uncaughtException', this.fatalErrorHandler);
        process.on('unhandledRejection', this.fatalErrorHandler);

        app.use(express.json());
        app.use(this.rootRouterBuilder.create('/'));
        app.use(...this.errorHandlersBuilder.create());
    }
}
