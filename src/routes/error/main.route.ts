import { IRouter } from "express";
import { Logger } from "ng2-logger";
import routerClass from "@/class/routerClass.class";

export default class main_route extends routerClass {
    constructor(log: Logger) {
        super({
            level: "public",
            log: log,
        });
    }

    run(router = this.router as IRouter) {
        router.get("/404", (_req, res) => {
            res.sendError(404, "page not found")
        })
        router.get("/500", (_req, res) => {
            res.sendError(500, "internal server error")
        })
        router.get("/403", (_req, res) => {
            res.sendError(403, "CSRF error")
        })
        router.get("/401", (_req, res) => {
            res.sendError(401, "Unauthorized")
        })
        return router
    }
}

