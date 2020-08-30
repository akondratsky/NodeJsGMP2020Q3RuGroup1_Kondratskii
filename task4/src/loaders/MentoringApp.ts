import { IMentoringApp, IUserRouter, IGroupRouter, IPermissionRouter } from 'app/interfaces';
import express, { Application } from 'express';
import { injectable, inject } from 'inversify';
import { INJECTABLES } from 'app/types';

@injectable()
export class MentoringApp implements IMentoringApp {
    private userRouter: IUserRouter;
    private groupRouter: IGroupRouter;
    private permissionRouter: IPermissionRouter;

    constructor(
        @inject(INJECTABLES.IUserRouter) userRouter: IUserRouter,
        @inject(INJECTABLES.IGroupRouter) groupRouter: IGroupRouter,
        @inject(INJECTABLES.IPermissionRouter) permissionRouter: IPermissionRouter
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
