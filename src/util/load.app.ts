import express from "express";
import { IAppLoadSettings } from "../interfaces/app.interface";
import measure from "../decorators/basicClassLogger";
import { Logger } from "ng2-logger";
import loadRoutes from "./load.routes";
import { engine } from 'express-handlebars';
import { extendedResponse } from '../middlewares/express-extended-response'


export default class loadApp {
    app: express.Application
    log: Logger
    port: number;
    constructor(options: IAppLoadSettings) {
        let app = express();
        this.app = app
        this.log = options.log
        this.port = options.port
    }

    @measure
    loadApp(app = this.app, log = this.log) {
        app.listen(this, () => {
            log.info(`App listening on port ${this.port}`)
        })

        return this
    }

    @measure
    loadRoutes(app = this.app, log = this.log) {
        const router = new loadRoutes({
            dir: __dirname.replace("util", "routes"),
            log: log,
            app: app,
        });
        router.load();
        return this
    }

    @measure
    loadSettings(app = this.app, log = this.log) {
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use('/static', express.static(process.cwd() + "/public"))
        app.engine('handlebars', engine());
        app.set('view engine', 'handlebars');
        app.set('views', process.cwd() + "/views");

        app.use(extendedResponse)
        log.info(`Settings Loaded`)
        return this
    }

    @measure
    getApp() {
        return this.app
    }
}