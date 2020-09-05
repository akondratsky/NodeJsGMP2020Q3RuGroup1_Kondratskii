import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { IMentoringApp, IRouterBuilder, IErrorHandlersBuilder } from 'app/interfaces';
import { INJECTABLES } from 'app/types';

@injectable()
export class MentoringApp implements IMentoringApp {
    constructor(
        @inject(INJECTABLES.RootRouterBuilder) private rootRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.ErrorHandlersBuilder) private errorHandlersBuilder: IErrorHandlersBuilder
    ) {
    }

    public init(app: Application): void {
        app.use(express.json());
        app.use(this.rootRouterBuilder.create('/'));
        app.use(...this.errorHandlersBuilder.create());
    }
}
