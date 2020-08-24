import 'module-alias/register';
import express, { Application } from 'express';
import { init } from 'app/loaders';
import { DEFAULT_PORT } from 'app/config';

const startApplication = async () => {
    const app: Application = express();

    await init(app);

    const port = DEFAULT_PORT;

    app.listen(port, () => {
        console.log(`App is listening on port ${port}!`);
    });
};

startApplication();
