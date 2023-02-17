import { IRouter } from "express";
import { Logger } from "ng2-logger";
import routerClass from "@/class/routerClass.class";
import { CAuth } from "@/controller/auth.controller";

export default class main_route extends routerClass {
  constructor(log: Logger) {
    super({
      level: "public",
      log: log,
    });
  }

  run(router = this.router as IRouter) {
    router.get("/", CAuth, (req, res) => {
      console.log(req.user)
      res.render("home", {
        user: req.user
      })
    })
    return router
  }
}

