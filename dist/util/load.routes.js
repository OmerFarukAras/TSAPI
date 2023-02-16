"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicClassLogger_1 = __importDefault(require("@/decorator/basicClassLogger"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class loadRoutes {
    log;
    app;
    dir;
    routesDir;
    files;
    routes;
    constructor(options) {
        this.routesDir = options.dir;
        this.dir = options.dir;
        this.log = options.log;
        this.app = options.app;
        this.routes = [];
        this.files = [];
    }
    load() {
        this.log.info("Loading routes!");
        this.compileFiles(this.dir);
        this.log.info("Loaded routes!");
    }
    compileFiles(dir) {
        this.files = fs_extra_1.default.readdirSync(dir);
        this.files.forEach(async (x) => {
            if (x.endsWith(".route.js")) {
                await this.loadRoute(dir + "/" + x);
            }
            else {
                await this.compileFiles(dir + "/" + x);
            }
        });
    }
    async loadRoute(x) {
        var _a;
        let file = await (_a = x, Promise.resolve().then(() => __importStar(require(_a))));
        let route = new file.default(this.log);
        let paths = x.replace(this.routesDir + "/", "").split("/");
        this.routes.push(paths[paths.length - 1]);
        if (paths.length === 1) {
            await this.app.use("/", route.run());
        }
        else {
            await this.app.use("/" + paths.slice(0, paths.length - 1).join("/"), route.run());
        }
    }
}
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], loadRoutes.prototype, "load", null);
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], loadRoutes.prototype, "compileFiles", null);
__decorate([
    basicClassLogger_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], loadRoutes.prototype, "loadRoute", null);
exports.default = loadRoutes;
