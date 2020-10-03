import { getApp } from './app';
import { PORT } from 'app/config';

export const startApplication = async (): Promise<void> => {
    const app = await getApp();

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}!`);
    });
};
