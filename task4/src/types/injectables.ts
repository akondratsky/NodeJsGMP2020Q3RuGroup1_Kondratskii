export const INJECTABLES = {
    // global
    MentoringApp: Symbol.for('MentoringApp'),
    RootRouterBuilder: Symbol.for('RootRouterBuilder'),
    // user:
    UserRouterBuilder: Symbol.for('UserRouterBuilder'),
    UserController: Symbol.for('UserController'),
    UserService: Symbol.for('UserService'),
    UserProvider: Symbol.for('UserProvider'),
    // group:
    GroupRouterBuilder: Symbol.for('GroupRouterBuilder'),
    GroupController: Symbol.for('GroupController'),
    GroupService: Symbol.for('GroupService'),
    GroupProvider: Symbol.for('GroupProvider'),
    // permissions:
    PermissionRouterBuilder: Symbol.for('PermissionRouterBuilder'),
    PermissionController: Symbol.for('PermissionController'),
    PermissionService: Symbol.for('PermissionService'),
    PermissionProvider: Symbol.for('PermissionProvider')
};
