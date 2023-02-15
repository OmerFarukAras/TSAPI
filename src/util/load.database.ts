import mongoose from "mongoose";
import { Logger } from "ng2-logger";
import measure from "../decorator/basicClassLogger";
import { IDatabaseLoadOptions } from "../interface/db.interface";

export default class loadDatabase {
    url: string; //
    log: Logger;
    constructor(options: IDatabaseLoadOptions) {
        this.url = options.url;
        this.log = options.log;
    }

    @measure
    loadDatabase(log = this.log) {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.url)
        mongoose.connection
            .on("close", () => log.info("DATABASE STATE", "Connection Open"))
            .on("error", (error) => log.error("DATABASE STATE", error))

        mongoose.connect(this.url)
        log.info('Connected!')
        return mongoose
    }
}