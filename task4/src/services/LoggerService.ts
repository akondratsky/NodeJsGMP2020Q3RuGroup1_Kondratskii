import { ILoggerService } from 'app/interfaces';
import { injectable } from 'inversify';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

@injectable()
export class LoggerService implements ILoggerService {
    error(message: string, serializable?: any): Promise<void> {
        console.error(message, serializable);
        return Promise.resolve();
    }

    info(message: string, serializable?: any): Promise<void> {
        console.info(message, serializable);
        return Promise.resolve();
    }

    debug(message: string, serializable?: any): Promise<void> {
        console.debug(message, serializable);
        return Promise.resolve();
    }
}
