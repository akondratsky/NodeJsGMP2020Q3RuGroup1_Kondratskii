import express, { Application } from 'express';
import { appContainer } from 'app/loaders';
import { IMentoringApp } from 'app/interfaces';
import { INJECTABLES } from './types';


const app: Application = express();

appContainer
    .get<IMentoringApp>(INJECTABLES.MentoringApp)
    .init(app);

export { app };
