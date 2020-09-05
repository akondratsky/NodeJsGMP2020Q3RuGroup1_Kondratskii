import { BadImplementationError } from 'app/errors';
import { ValidationError } from '@hapi/joi';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getObjectFromValidationError = (error: ValidationError): any => {
    if (!(error instanceof ValidationError)) {
        throw new BadImplementationError('Error is not instance of ValidationError');
    }

    return (error as any)._original;
};
