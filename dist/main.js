"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_app_1 = __importDefault(require("./util/load.app"));
const logger_1 = __importDefault(require("./util/logger"));
const client = new load_app_1.default({
    port: 3000,
    log: logger_1.default,
});
client
    .loadApp()
    .loadSettings()
    .loadRoutes();
const app = client.getApp();
app.set('QXC', true);
