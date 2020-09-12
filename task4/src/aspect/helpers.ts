/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

type DecoratorsObject = {
    method?: any,
    parameter?: any,
    property?: any,
    class?: any
};

export const createDecorator = (decorators: DecoratorsObject): Function => {
    return (...args: any[]) => {
        switch (args.length) {
            case 3:
                if (typeof args[2] === 'number') {
                    if (!decorators.parameter) throw new Error('Parameter decorator not implemented');
                    return decorators.parameter(args[0], args[1], args[2]);
                }
                if (!decorators.method) throw new Error('Method decorator not implemented');
                return decorators.method(args[0], args[1], args[2]);
            case 2:
                if (!decorators.property) throw new Error('Property decorator not implemented');
                return decorators.property(args[0], args[1]);
            case 1:
                if (!decorators.class) throw new Error('Class decorator not implemented');
                return decorators.class(args[1]);
            default:
                // invalid size of arguments
                throw new Error('Not a valid decorator');
        }
    };
};
