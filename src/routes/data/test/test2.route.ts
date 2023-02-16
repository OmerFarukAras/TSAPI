import { Logger } from "ng2-logger";
import routerClass from "@/class/routerClass.class";
import { IRouter } from "express";

export default class main_route extends routerClass {
  constructor(log: Logger) {
    super({
      level: "public",
      log: log,
    });
  }

  run(router = this.router as IRouter) {
    router.get("/", (req, res) => {
      if (req) res.send("TEST TEST2 PAGE /")
    })

    return router
  }
}
