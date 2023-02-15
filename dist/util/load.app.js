"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicClassLogger_1 = __importDefault(require("../decorator/basicClassLogger"));
const load_routes_1 = __importDefault(require("./load.routes"));
const express_handlebars_1 = require("express-handlebars");
const express_extended_response_1 = require("../middleware/express-extended-response");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class loadApp {
    app;
    log;
    port;
    constructor(options) {
        let app = (0, express_1.default)();
        this.app = app;
        this.log = options.log;
        this.port = options.port;
    }
    loadApp(app = this.app, log = this.log) {
        app.listen(this.port, () => {
            log.info(`App listening on port ${this.port}`);
        });
        return this;
    }
    loadRoutes(app = this.app, log = this.log) {
        const router = new load_routes_1.default({
            dir: __dirname.replace("util", "routes"),
            log: log,
            app: app,
        });
        router.load();
        return this;
    }
    loadSettings(app = this.app, log = this.log) {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cookie_parser_1.default)());
        app.use('/static', express_1.default.static(process.cwd() + "/public"));
        app.engine('handlebars', (0, express_handlebars_1.engine)());
        app.set('view engine', 'handlebars');
        app.set('views', process.cwd() + "/views");
        app.use(express_extended_response_1.extendedResponse);
        log.info(`Settings Loaded`);
        return this;
    }
    getApp() {
        return this.app;
    }
}
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], loadApp.prototype, "loadApp", null);
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], loadApp.prototype, "loadRoutes", null);
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], loadApp.prototype, "loadSettings", null);
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], loadApp.prototype, "getApp", null);
exports.default = loadApp;
