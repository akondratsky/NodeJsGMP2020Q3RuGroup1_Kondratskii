import { IMentoringApp, IRouterBuilder } from 'app/interfaces';
import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';

@injectable()
export class MentoringApp implements IMentoringApp {
    private userRouter: IRouterBuilder;
    private groupRouter: IRouterBuilder;
    private permissionRouter: IRouterBuilder;

    constructor(
        @inject(INJECTABLES.UserRouterBuilder) userRouter: IRouterBuilder,
        @inject(INJECTABLES.GroupRouterBuilder) groupRouter: IRouterBuilder,
        @inject(INJECTABLES.PermissionRouterBuilder) permissionRouter: IRouterBuilder
    ) {
        this.userRouter = userRouter;
        this.groupRouter = groupRouter;
        this.permissionRouter = permissionRouter;
    }

    public init(app: Application): void {
        app.use(express.json());
        app.use(this.userRouter.create('/users'));
        app.use(this.groupRouter.create('/groups'));
        app.use(this.permissionRouter.create('/permissions'));
    }
}
