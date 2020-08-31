import { IMentoringApp, IRouterBuilder } from 'app/interfaces';
import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';

@injectable()
export class MentoringApp implements IMentoringApp {
    private userRouterBuilder: IRouterBuilder;
    private groupRouterBuilder: IRouterBuilder;
    private permissionRouterBuilder: IRouterBuilder;

    // TODO: create single rootRouterBuilder and create all tree of routes in it
    constructor(
        @inject(INJECTABLES.UserRouterBuilder) userRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.GroupRouterBuilder) groupRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.PermissionRouterBuilder) permissionRouterBuilder: IRouterBuilder
    ) {
        this.userRouterBuilder = userRouterBuilder;
        this.groupRouterBuilder = groupRouterBuilder;
        this.permissionRouterBuilder = permissionRouterBuilder;
    }

    public init(app: Application): void {
        app.use(express.json());
        app.use(this.userRouterBuilder.create('/users'));
        app.use(this.groupRouterBuilder.create('/groups'));
        app.use(this.permissionRouterBuilder.create('/permissions'));
        // TODO: Error Handler
    }
}
