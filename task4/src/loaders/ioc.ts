import 'reflect-metadata';
import { Container } from 'inversify';
import { INJECTABLES } from 'app/types';

import * as Interfaces from 'app/interfaces';
import * as Services from 'app/services';
import * as Routers from 'app/routers';
import * as Controllers from 'app/controllers';
import * as Providers from 'app/providers';

import { MentoringApp } from './MentoringApp';
import { ErrorHandlersBuilder } from './ErrorHandlersBuilder';


export const appContainer = new Container();


appContainer.bind<Interfaces.IMentoringApp>(INJECTABLES.MentoringApp).to(MentoringApp);
appContainer.bind<Interfaces.IErrorHandlersBuilder>(INJECTABLES.ErrorHandlersBuilder).to(ErrorHandlersBuilder);
appContainer.bind<Interfaces.IRouterBuilder>(INJECTABLES.RootRouterBuilder).to(Routers.RootRouterBuilder);
appContainer.bind<Interfaces.ILoggerService>(INJECTABLES.LoggerService).to(Services.LoggerService);
// user
appContainer.bind<Interfaces.IUserController>(INJECTABLES.UserController).to(Controllers.UserController);
appContainer.bind<Interfaces.IRouterBuilder>(INJECTABLES.UserRouterBuilder).to(Routers.UserRouterBuilder);
appContainer.bind<Interfaces.IUserService>(INJECTABLES.UserService).to(Services.UserService);
appContainer.bind<Interfaces.IUserProvider>(INJECTABLES.UserProvider).to(Providers.UserProvider);
// group
appContainer.bind<Interfaces.IRouterBuilder>(INJECTABLES.GroupRouterBuilder).to(Routers.GroupRouter);
appContainer.bind<Interfaces.IGroupController>(INJECTABLES.GroupController).to(Controllers.GroupContoller);
appContainer.bind<Interfaces.IGroupService>(INJECTABLES.GroupService).to(Services.GroupService);
appContainer.bind<Interfaces.IGroupProvider>(INJECTABLES.GroupProvider).to(Providers.GroupProvider);
// permission
appContainer.bind<Interfaces.IRouterBuilder>(INJECTABLES.PermissionRouterBuilder).to(Routers.PermissionRouterBuilder);
appContainer.bind<Interfaces.IPermissionController>(INJECTABLES.PermissionController).to(Controllers.PermissionController);
appContainer.bind<Interfaces.IPermissionService>(INJECTABLES.PermissionService).to(Services.PermissionService);
appContainer.bind<Interfaces.IPermissionProvider>(INJECTABLES.PermissionProvider).to(Providers.PermissionProvider);
