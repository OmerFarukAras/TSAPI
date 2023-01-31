import { Application } from "express";
import { Logger } from "ng2-logger";

export interface IRouterOptions {
  dir: string;
  log: Logger;
  app: Application;
}

export interface IRouteOptions {
  level: string;
  log: Logger;
}
