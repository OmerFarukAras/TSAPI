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
        router.get("/", auth_controller_1.CAuth, (req, res) => {
            console.log(req.user);
            res.render("home", {
                user: req.user
            });
        });
        return router;
    }
}
exports.default = main_route;
