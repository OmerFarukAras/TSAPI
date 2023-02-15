"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routerClass_class_1 = __importDefault(require("../../class/routerClass.class"));
class main_route extends routerClass_class_1.default {
    constructor(log) {
        super({
            level: "public",
            log: log,
        });
    }
    run(router = this.router) {
        router.get("/404", (_req, res) => {
            res.sendError(404, "page not found");
        });
        router.get("/500", (_req, res) => {
            res.sendError(500, "internal server error");
        });
        router.get("/403", (_req, res) => {
            res.sendError(403, "CSRF error");
        });
        router.get("/401", (_req, res) => {
            res.sendError(401, "Unauthorized");
        });
        return router;
    }
}
exports.default = main_route;
