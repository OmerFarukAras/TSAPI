"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routerClass_class_1 = __importDefault(require("@/class/routerClass.class"));
const auth_controller_1 = require("@/controller/auth.controller");
class main_route extends routerClass_class_1.default {
    constructor(log) {
        super({
            level: "public",
            log: log,
        });
    }
    run(router = this.router) {
        router.post("/register", auth_controller_1.CRegister);
        router.post("/login", auth_controller_1.CLogin);
        router.get("/", auth_controller_1.CAuth, (req, res) => {
            if (req.user)
                res.send(req.user.name);
        });
        router.get("/logout", auth_controller_1.CAuth, auth_controller_1.CLogout);
        return router;
    }
}
exports.default = main_route;
