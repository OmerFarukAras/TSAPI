import { IRouter } from "express";
import { Logger } from "ng2-logger";
import routerClass from "@/class/routerClass.class";
import { CAuth } from "@/controller/auth.controller";

/**
 * TODO: add description
 * TODO: Readme todo
 * TODO: Forgot Password
 * TODO: Reset Password
 * TODO: Email Verification
 * TODO: profile page
 * TODO: email login
 * TODO: split api and web routes
 * TODO: TEST SYSTEM CYPRESS MAYBE
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

