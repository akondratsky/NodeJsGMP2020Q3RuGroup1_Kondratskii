import { injectable, inject } from 'inversify';
import { Router } from 'express';
import { IRouterBuilder } from 'app/interfaces';
import { INJECTABLES } from 'app/types';

const createRootRouter = (router: Router) => {
    const build = () => router;
    const addRouter = (path: string, routerBuilder: IRouterBuilder) => {
        router.use(path, routerBuilder.create(path));
        return { addRouter, build };
    };
    return { addRouter, build };
};


@injectable()
export class RootRouterBuilder implements IRouterBuilder {
    constructor(
        @inject(INJECTABLES.UserRouterBuilder) private userRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.GroupRouterBuilder) private groupRouterBuilder: IRouterBuilder,
        @inject(INJECTABLES.PermissionRouterBuilder) private permissionRouterBuilder: IRouterBuilder
    ) {}

    create(baseUrl: string) : Router {
        const relativePath = (path: string): string => {
            return baseUrl === '/' ? path : baseUrl + path;
        };

        return createRootRouter(Router())
            .addRouter(relativePath('/users'), this.userRouterBuilder)
            .addRouter(relativePath('/groups'), this.groupRouterBuilder)
            .addRouter(relativePath('/permissions'), this.permissionRouterBuilder)
            .build();
    }
}
