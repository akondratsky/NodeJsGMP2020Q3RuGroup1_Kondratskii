import { Application } from 'express';

export interface IMentoringApp {
    init(app: Application): void;
}
