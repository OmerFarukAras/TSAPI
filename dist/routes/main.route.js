"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routerClass_class_1 = __importDefault(require("../class/routerClass.class"));
class main_route extends routerClass_class_1.default {
    constructor(log) {
        super({
            level: "public",
            log: log,
        });
    }
    run(router = this.router) {
        router.get("/", (req, res) => {
            if (req)
                res.render("home");
        });
        router.get("*", (_req, res) => {
            res.redirect("/error/404");
        });
        return router;
    }
}
exports.default = main_route;
