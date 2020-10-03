import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import {
    IMentoringApp,
    IRouterBuilder,
    IErrorHandlersBuilder,
    ILoggerService,
    IAuthMiddlewareBuilder
} from 'app/interfaces';
import { INJECTABLES } from 'app/types';
import cors from 'cors';


@injectable()
export class MentoringApp implements IMentoringApp {
    constructor(
        @inject(INJECTABLES.RootRouterBuilder) private rootRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.ErrorHandlersBuilder) private errorHandlersBuilder: IErrorHandlersBuilder,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService,
        @inject(INJECTABLES.AuthMiddlewareBuilder) private authMiddlewareBuilder: IAuthMiddlewareBuilder
    ) {
    }

    fatalErrorHandler = (error: unknown): void => {
        this.loggerService.error(this, this.fatalErrorHandler, 'FATAL: Uncaught error', error);
    }

    public init(app: Application): void {
        process.on('uncaughtException', this.fatalErrorHandler);
        process.on('unhandledRejection', this.fatalErrorHandler);

        app.use(express.json());

        app.use(cors());    // CORS with default configuration

        app.use(this.authMiddlewareBuilder.getAuthInitializerMiddleware());
        app.use(this.authMiddlewareBuilder.getAuthRoutingMiddleware());
        app.use(this.authMiddlewareBuilder.getAuthMiddleware());

        app.use(this.rootRouterBuilder.create('/'));
        app.use(...this.errorHandlersBuilder.create());
    }
}
