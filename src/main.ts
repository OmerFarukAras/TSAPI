import 'module-alias/register';
import "dotenv"

import config from "config";

import App from "@/util/load.app";
import Database from "@/util/load.database";
import log from "@/util/logger";

import { Mailer } from './service/email.service';

const client = new App({
  port: config.get("EXPRESS_PORT"),
  log: log,
})

const database = new Database({
  url: config.get("MONGO_URL"),
  log: log
}).loadDatabase()

new Mailer(config.get("EMAIL"), log, config.get("EMAIL_SEND_DEBUG"))

client
  .loadApp()
  .loadSettings()
  .loadRoutes()

const app = client.getApp()



app.set('JWT_SECRET', database.trusted)
