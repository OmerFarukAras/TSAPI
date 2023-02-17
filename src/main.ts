import 'module-alias/register';
import "dotenv"

import config from "config";

import App from "@/util/load.app";
import Database from "@/util/load.database";
import log from "@/util/logger";

/* 
  * TODO: 404 page split text make it basic
  * TODO: login or register page
  * TODO: readme
  * FIXME: Auth Controller not working properly
  * 
*/


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
app.set('JWT_SECRET', database.trusted)
