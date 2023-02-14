"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routerClass_class_1 = __importDefault(require("../../class/routerClass.class"));
const auth_controller_1 = require("../../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
class main_route extends routerClass_class_1.default {
    constructor(log) {
        super({
            level: "public",
            log: log,
        });
    }
    run(router = this.router) {
        router.post("/register", auth_controller_1.RegisterUser);
        router.post("/login", auth_controller_1.LoginUser);
        router.get("/", auth_middleware_1.default, auth_controller_1.getUserDetails);
        router.get("/logout", auth_middleware_1.default, auth_controller_1.LogoutUser);
        return router;
    }
}
exports.default = main_route;
