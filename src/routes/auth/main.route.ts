import { IRouter } from "express";
import { Logger } from "ng2-logger";

import routerClass from "@/class/routerClass.class";
import { CLogin, CLogout, CRegister, CAuth, CCAuth } from "@/controller/auth.controller";

export default class main_route extends routerClass {
    constructor(log: Logger) {
        super({
            level: "public",
            log: log,
        });
    }

    run(router = this.router as IRouter) {
        router.post("/register", CRegister);
        router.post("/login", CLogin);

        router.get("/register", (_req, res) => {
            res.render("auth/signup", {
                layout: "auth",
                title: "Register"
            })
        });
        router.get("/login", (_req, res) => {
            res.render("auth/signin", {
                layout: "auth",
                title: "Login"
            })
        });

        router.get("/", CCAuth, (req, res) => {
            if (req.user)
                res.send(req.user)
        });

        router.get("/logout", CAuth, CLogout);
        return router
    }
}

