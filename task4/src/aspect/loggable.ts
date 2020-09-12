/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { format } from 'date-fns';


const getTimestamp = (): string => format(new Date(), 'MM.dd.yyyy-hh:mm:ss');


export const LogMethod = (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
): PropertyDescriptor => {
    const method = propertyDescriptor.value;
    const className = target.constructor.name;
    const methodName = Reflect.get(target, propertyName).name;

    propertyDescriptor.value = function value(...args: any[]) {
        const params = args.map(arg => JSON.stringify(arg)).join(', ');
        console.log(`[${getTimestamp()}] Call: ${className}.${methodName}(${params})`);
        const result = method.apply(this, args);
        return result;
    };

    return propertyDescriptor;
};


// Universal decorator
export function loggable(...args: any[]): any {
    switch (args.length) {
        case 3:
            // can be method or parameter decorator
            if (typeof args[2] === 'number') {
                // parameter decorator:
                throw new Error('Not implemented');
            }
            // method decorator:
            return LogMethod(args[0], args[1], args[2]);
        case 2: // property decorator
        case 1: // class decorator
            throw new Error('Not implemented');
        default:
            // invalid size of arguments
            throw new Error('Not a valid decorator');
    }
}
