/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ILoggerService {
    error(object: any, action: any, message: string, serializable?: any): Promise<void>;

    info(object: any, action: any, message: string, serializable?: any): Promise<void>;

    debug(object: any, action: any, message: string, serializable?: any): Promise<void>;
}
