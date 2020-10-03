import express, { Application } from 'express';
import { appContainer } from 'app/loaders';
import { IMentoringApp } from 'app/interfaces';
import { INJECTABLES } from './types';

export const getApp = async (): Promise<Application> => {
    const expressApplication: Application = express();

    await appContainer
        .get<IMentoringApp>(INJECTABLES.MentoringApp)
        .init(expressApplication);

    return expressApplication;
};
