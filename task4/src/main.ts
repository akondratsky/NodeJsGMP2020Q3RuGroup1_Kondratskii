import express, { Application } from 'express';
import { DEFAULT_PORT } from 'app/config';
import { argv } from 'yargs';
import { appContainer } from 'app/loaders';
import { IMentoringApp } from 'app/interfaces';
import { INJECTABLES } from './types';

const startApplication = async () => {
    const expressApplication: Application = express();

    appContainer
        .get<IMentoringApp>(INJECTABLES.IMentoringApp)
        .init(expressApplication);

    const port = argv.PORT || DEFAULT_PORT;

    expressApplication.listen(port, () => {
        console.log(`App is listening on port ${port}!`);
    });
};

startApplication();
