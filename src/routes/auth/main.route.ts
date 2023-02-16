import { IRouter } from "express";
import { Logger } from "ng2-logger";

import routerClass from "@/class/routerClass.class";
import { CLogin, CLogout, CRegister, CAuth } from "@/controller/auth.controller";

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

        router.get("/", CAuth, (req :IRequestWithBody, res) => {
        
            res.send(req.user.name)
        });
        
        router.get("/logout", CAuth, CLogout);
        return router
    }
}

