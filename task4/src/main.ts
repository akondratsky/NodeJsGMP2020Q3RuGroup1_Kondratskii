import { app } from './app';
import { PORT } from 'app/config';

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});
