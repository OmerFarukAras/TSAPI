import { IRouter } from "express";
import { Logger } from "ng2-logger";
import routerClass from "../class/routerClass.class";
import auth from "../middlewares/isAuth.middleware";

export default class main_route extends routerClass {
  constructor(log: Logger) {
    super({
      level: "public",
      log: log,
    });
  }

  run(router = this.router as IRouter) {
    router.get("/", (req, res) => {
      if (req) res.render("home")
    })

    router.get("/user", auth, (req: any, res) => {
      if (req) res.send(req.user)
    })

    router.get("*", (_req, res) => {
      res.redirect("/error/404")
    })
    return router
  }
}

