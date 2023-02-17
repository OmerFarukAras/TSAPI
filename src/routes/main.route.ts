import { IRouter } from "express";
import { Logger } from "ng2-logger";
import routerClass from "@/class/routerClass.class";
import { CAuth } from "@/controller/auth.controller";

/**
 * TODO: add description
 * TODO: Complete CRUD OF RUD (Read, Update, Delete)
 * TODO: Maybe secure the routes with CAuth
 * TODO: Check secure 
 */

export default class main_route extends routerClass {
  constructor(log: Logger) {
    super({
      level: "public",
      log: log,
    });
  }

  run(router = this.router as IRouter) {
    router.get("/", CAuth, (req, res) => {
      res.render("home", {
        user: req.user
      })
    })
    return router
  }
}

