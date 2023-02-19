import 'module-alias/register';
import "dotenv"

import config from "config";

import App from "@/util/load.app";
import Database from "@/util/load.database";
import log from "@/util/logger";

/*    
  * TODO: readme
*/


const client = new App({
  port: config.get("EXPRESS_PORT"),
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
app.set('JWT_SECRET', database.trusted)
