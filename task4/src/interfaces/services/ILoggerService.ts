export interface ILoggerService {
    error(object: unknown, action: unknown, message: string, serializable?: unknown): Promise<void>;

    info(object: unknown, action: unknown, message: string, serializable?: unknown): Promise<void>;

    debug(object: unknown, action: unknown, message: string, serializable?: unknown): Promise<void>;
}
