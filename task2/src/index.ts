import express, { Application } from 'express';
import usersRouter from './usersRouter';

const app: Application = express();

app.use(express.json());
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});
