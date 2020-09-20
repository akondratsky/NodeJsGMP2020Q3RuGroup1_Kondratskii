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


@injectable()
export class MentoringApp implements IMentoringApp {
    constructor(
        @inject(INJECTABLES.RootRouterBuilder) private rootRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.ErrorHandlersBuilder) private errorHandlersBuilder: IErrorHandlersBuilder,
        @inject(INJECTABLES.LoggerService) private loggerService: ILoggerService,
        @inject(INJECTABLES.AuthMiddlewareBuilder) private authMiddlewareBuilder: IAuthMiddlewareBuilder
    ) {
    }

    // eslint-disable-next-line
    fatalErrorHandler = (error: any) => {
        this.loggerService.error(this, this.fatalErrorHandler, 'FATAL: Uncaught error', error);
    }

    public init(app: Application): void {
        process.on('uncaughtException', this.fatalErrorHandler);
        process.on('unhandledRejection', this.fatalErrorHandler);

        app.use(express.json());

        app.post('/login', (req, res) => {
            console.log('sending jwt token');
            res.json(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJoZWxsbyI6IndvcmxkIn0.Q3TbgSmdTkEI3rVRUjhustYCh2uBOx9SE0mi1hefDwE');
        });

        app.use(this.authMiddlewareBuilder.getAuthInitializerMiddleware());
        app.use(this.authMiddlewareBuilder.getAuthMiddleware());

        app.use(this.rootRouterBuilder.create('/'));
        app.use(...this.errorHandlersBuilder.create());
    }
}
