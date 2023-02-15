import { Logger } from "ng2-logger";
import measure from "../decorator/basicClassLogger";
import { IRouterOptions } from "../interface/router.interface";
import fs from "fs-extra";
import { Application } from "express";

class loadRoutes {
  log: Logger;
  app: Application;
  dir: string;
  routesDir: string;
  files: string[];
  routes: string[];
  constructor(options: IRouterOptions) {
    this.routesDir = options.dir;
    this.dir = options.dir;
    this.log = options.log;
    this.app = options.app;
    this.routes = [];
    this.files = [];
  }
  @measure
  load() {
    this.log.info("Loading routes!");
    this.compileFiles(this.dir)
    this.log.info("Loaded routes!");

  }

  @measure
  private compileFiles(dir: string) {
    this.files = fs.readdirSync(dir);
    this.files.forEach(async (x) => {
      if (x.endsWith(".route.js")) {
        await this.loadRoute(dir + "/" + x);
      } else {
        await this.compileFiles(dir + "/" + x);
      }
    });
  }

  @measure
  private async loadRoute(x: string ) {
    let file = await import(x);
    let route = new file.default(this.log);
    let paths = x.replace(this.routesDir + "/", "").split("/");
    this.routes.push(paths[paths.length - 1]);
    if (paths.length === 1) {
      await this.app.use("/", route.run());
      //this.log.info(`pathingen sitrayze main file ${route}...`);
    } else {
      await this.app.use("/" + paths.slice(0, paths.length - 1).join("/"), route.run());
      //console.log("pathingen sitrayze file " + paths[paths.length - 1]);
    }

  }
}

export default loadRoutes;
