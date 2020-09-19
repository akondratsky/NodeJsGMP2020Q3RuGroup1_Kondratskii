/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ILoggerService {
    error(message: string, serializable?: any): Promise<void>;

    info(message: string, serializable?: any): Promise<void>;

    debug(message: string, serializable?: any): Promise<void>;
}
