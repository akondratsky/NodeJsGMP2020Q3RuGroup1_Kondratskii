import express, { Application } from 'express';
import { PORT } from 'app/config';
import { appContainer } from 'app/loaders';
import { IMentoringApp } from 'app/interfaces';
import { INJECTABLES } from './types';

const startApplication = async () => {
    const expressApplication: Application = express();

    await appContainer
        .get<IMentoringApp>(INJECTABLES.MentoringApp)
        .init(expressApplication);

    expressApplication.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}!`);
    });
};

startApplication();
