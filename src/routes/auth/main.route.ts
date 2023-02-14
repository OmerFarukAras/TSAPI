import { IRouter } from "express";
import { Logger } from "ng2-logger";
import routerClass from "../../class/routerClass.class";
import { getUserDetails, LoginUser, LogoutUser, RegisterUser } from "../../controllers/auth.controller";
import auth from "../../middlewares/auth.middleware";

export default class main_route extends routerClass {
    constructor(log: Logger) {
        super({
            level: "public",
            log: log,
        });
    }

    run(router = this.router as IRouter) {
        router.post("/register", RegisterUser);
        router.post("/login", LoginUser);
        router.get("/", auth, getUserDetails);
        router.get("/logout", auth, LogoutUser);
        return router
    }
}

