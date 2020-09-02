import { IMentoringApp, IRouterBuilder } from 'app/interfaces';
import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';

@injectable()
export class MentoringApp implements IMentoringApp {
    constructor(
        @inject(INJECTABLES.RootRouterBuilder) private rootRouterBuilder: IRouterBuilder
    ) {}

    public init(app: Application): void {
        app.use(express.json());
        app.use(this.rootRouterBuilder.create('/'));
        // TODO: Error Handler
    }
}
