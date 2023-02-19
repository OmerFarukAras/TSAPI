import { Logger } from "ng2-logger";

export interface IDatabaseLoadOptions {
    url: string;
    log: Logger
}

export interface ILog {
    log: string
    createdAt: Date;
    updatedAt: Date;
}