import express, { Application } from 'express';
import { requestLoggerMiddleware } from './logger';
import usersRouter from './usersRouter';


const app: Application = express();

app.use(requestLoggerMiddleware);
app.use(express.json());
app.use('/users', usersRouter);

app.listen(4000, () => {
    console.log('App is listening on port 4000!');
});
