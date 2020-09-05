import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { IMentoringApp, IRouterBuilder } from 'app/interfaces';
import { INJECTABLES } from 'app/types';
import { errorHandler } from './errorHandler';

@injectable()
export class MentoringApp implements IMentoringApp {
    constructor(
        @inject(INJECTABLES.RootRouterBuilder) private rootRouterBuilder: IRouterBuilder
    ) {
    }

    public init(app: Application): void {
        app.use(express.json());
        app.use(this.rootRouterBuilder.create('/'));
        app.use(errorHandler);
    }
}
