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

    error(message: string, serializable?: any): Promise<void> {
        this.logger.error(getText(message, serializable));
        return Promise.resolve();
    }

    info(message: string, serializable?: any): Promise<void> {
        this.logger.info(getText(message, serializable));
        return Promise.resolve();
    }

    debug(message: string, serializable?: any): Promise<void> {
        if (DEBUG) {
            this.logger.debug(getText(message, serializable));
        }
        return Promise.resolve();
    }
}
