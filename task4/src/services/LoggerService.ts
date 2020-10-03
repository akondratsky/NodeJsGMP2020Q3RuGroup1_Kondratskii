import { injectable } from 'inversify';
import { createLogger, transports, format } from 'winston';
import { ILoggerService } from 'app/interfaces';
import { DEBUG } from 'app/config';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const getText = (message: string, serializable: any) => {
    const serialized = serializable !== undefined ? ` ${JSON.stringify(serializable)}` : '';
    return `${message}${serialized}`;
};

const getPrintName = (arg: any) => {
    if (arg === undefined) {
        // argument is not defined
        return '';
    }

    if (arg === null) {
        // explicit null
        return 'null';
    }

    if (typeof arg === 'number' || typeof arg === 'boolean') {
        // number or boolean
        return arg.toString();
    }

    if (typeof arg === 'string') {
        // clearly - it's a string
        return arg;
    }

    if (Array.isArray(arg) || typeof arg === 'object' && arg.constructor.name === 'Object') {
        // we assume it's a plain object or an array
        return JSON.stringify(arg);
    }

    if (arg.constructor.name !== 'Function') {
        // we assume it is a class
        return arg.constructor.name;
    }

    if (typeof arg === 'function') {
        // we assume it is a method of a class
        return arg.name;
    }
};

@injectable()
export class LoggerService implements ILoggerService {
    private logger = createLogger({
        level: 'debug',
        format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.simple()
        ),
        transports: [
            new transports.Console()
        ]
    });

    async error(object: any, action: any, message: any, serializable?: any): Promise<void> {
        this.logger.error(getText(message, serializable));
        return await Promise.resolve();
    }

    async info(object: any, action: any, message: any, serializable?: any): Promise<void> {
        this.logger.info(getText(message, serializable));
        return await Promise.resolve();
    }

    debug = async (object: any, action: any, message: any, serializable?: any): Promise<void> => {
        if (DEBUG) {
            this.logger.debug(getText(message, serializable));
        }
        return await Promise.resolve();
    }
}
