import { IRouteOptions } from "../interfaces/router.interface";
import { Router, IRouter } from "express";

export default class routerClass {
  level: string;
  router: IRouter;

  constructor(options: IRouteOptions) {
    this.level = options.level;
    this.router = Router();
  }
  run(router = this.router) {
    router.get("/", (_req, res) => {
      res.send("Hello World");
    });
    return router;
  }
}
