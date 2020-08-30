import 'reflect-metadata';
import { Container } from 'inversify';
import { INJECTABLES } from 'app/types';

import * as Interfaces from 'app/interfaces';
import * as Services from 'app/services';
import * as Routers from 'app/routers';
import * as Controllers from 'app/controllers';
import * as Providers from 'app/providers';

import { MentoringApp } from './MentoringApp';


export const appContainer = new Container();


appContainer.bind<Interfaces.IMentoringApp>(INJECTABLES.IMentoringApp).to(MentoringApp);

// user
appContainer.bind<Interfaces.IUserController>(INJECTABLES.IUserController).to(Controllers.UserController);
appContainer.bind<Interfaces.IUserRouter>(INJECTABLES.IUserRouter).to(Routers.UserRouter);
appContainer.bind<Interfaces.IUserService>(INJECTABLES.IUserService).to(Services.UserService);
appContainer.bind<Interfaces.IUserProvider>(INJECTABLES.IUserProvider).to(Providers.UserProvider);
// group
appContainer.bind<Interfaces.IGroupRouter>(INJECTABLES.IGroupRouter).to(Routers.GroupRouter);
appContainer.bind<Interfaces.IGroupController>(INJECTABLES.IGroupController).to(Controllers.GroupContoller);
appContainer.bind<Interfaces.IGroupService>(INJECTABLES.IGroupService).to(Services.GroupService);
appContainer.bind<Interfaces.IGroupProvider>(INJECTABLES.IGroupProvider).to(Providers.GroupProvider);
// permission
appContainer.bind<Interfaces.IPermissionRouter>(INJECTABLES.IPermissionRouter).to(Routers.PermissionRouter);
appContainer.bind<Interfaces.IPermissionController>(INJECTABLES.IPermissionController).to(Controllers.PermissionController);
appContainer.bind<Interfaces.IPermissionService>(INJECTABLES.IPermissionService).to(Services.PermissionService);
appContainer.bind<Interfaces.IPermissionProvider>(INJECTABLES.IPermissionProvider).to(Providers.PermissionProvider);
