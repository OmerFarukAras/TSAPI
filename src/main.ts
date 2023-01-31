import loadApp from "./util/load.app";
import log from "./util/logger";

const client = new loadApp({
  port: 3000,
  log: log,
})

client
  .loadApp()
  .loadSettings()
  .loadRoutes()


const app = client.getApp()
app.set('QXC', true)