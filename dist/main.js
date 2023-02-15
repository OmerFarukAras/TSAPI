"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const load_app_1 = __importDefault(require("./util/load.app"));
const load_database_1 = __importDefault(require("./util/load.database"));
const logger_1 = __importDefault(require("./util/logger"));
const client = new load_app_1.default({
    port: 3000,
    log: logger_1.default,
});
const database = new load_database_1.default({
    url: config_1.default.get("MONGO_URL"),
    log: logger_1.default
}).loadDatabase();
client
    .loadApp()
    .loadSettings()
    .loadRoutes();
const app = client.getApp();
app.set('QXC', database.trusted);
