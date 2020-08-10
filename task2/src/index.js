import express from 'express';
import usersRouter from './users';

const port = null; // TODO: yargs

const app = express();

app.use(express.json());
app.use('/user', usersRouter);

app.listen(port || 4000, () => {
    console.log('server listen');
});
