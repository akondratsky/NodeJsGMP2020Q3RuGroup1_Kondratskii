import { createDecorator } from './helpers';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

const measureMethod = (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
) => {
    const method = propertyDescriptor.value;
    const className = target.constructor.name;
    const methodName = Reflect.get(target, propertyName).name;

    propertyDescriptor.value = async function value(...args: any[]) {
        const t1 = Date.now();
        const params = args.map(arg => JSON.stringify(arg)).join(', ');
        const result = await method.apply(this, args);
        const t2 = Date.now();
        console.log(`${className}.${methodName}(${params}) took ${t2 - t1}ms`);
        return result;
    };

    return propertyDescriptor;
};

export const measurable = createDecorator({
    method: measureMethod
});
