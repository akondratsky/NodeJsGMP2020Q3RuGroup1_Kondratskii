import { Request, Response, NextFunction } from 'express';
import { GroupNotFoundError } from 'app/errors';
import { ValidationError } from '@hapi/joi';

// eslint-disable-next-line
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    switch (error.constructor) {
        case ValidationError:
            console.log('okay', (error as ValidationError).details[0].message);
            break;
        case GroupNotFoundError:
            console.log('group not found');
            break;
        default:
            console.log('omg');
    }

    res.status(418);
};


/*

если ошибка валидации - н

*/