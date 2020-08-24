import express, { Application } from 'express';
import { init } from 'app/loaders';
import { DEFAULT_PORT } from 'app/config';
import { argv } from 'yargs';

const startApplication = async () => {
    const app: Application = express();

    await init(app);

    const port = argv.PORT || DEFAULT_PORT;

    app.listen(port, () => {
        console.log(`App is listening on port ${port}!`);
    });
};

startApplication();
