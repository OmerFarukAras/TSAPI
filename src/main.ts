import config from "config";
import App from "./util/load.app";
import Database from "./util/load.database";
import log from "./util/logger";

const client = new App({
  port: 3000,
  log: log,
})

const database = new Database({
  url: config.get("MONGO_URL"),
  log: log
}).loadDatabase()

client
  .loadApp()
  .loadSettings()
  .loadRoutes()

const app = client.getApp()
app.set('QXC', database.trusted)