export const INJECTABLES = {
    // global
    IMentoringApp: Symbol.for('IMentoringApp'),
    // user:
    IUserRouter: Symbol.for('IUserRouter'),
    IUserController: Symbol.for('IUserController'),
    IUserService: Symbol.for('IUserService'),
    IUserProvider: Symbol.for('IUserProvider'),
    // group:
    IGroupRouter: Symbol.for('IGroupRouter'),
    IGroupController: Symbol.for('IGroupController'),
    IGroupService: Symbol.for('IGroupService'),
    IGroupProvider: Symbol.for('IGroupProvider'),
    // permissions:
    IPermissionRouter: Symbol.for('IPermissionRouter'),
    IPermissionController: Symbol.for('IPermissionController'),
    IPermissionService: Symbol.for('IPermissionService'),
    IPermissionProvider: Symbol.for('IPermissionProvider')
};
