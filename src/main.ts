import loadApp from "./util/load.app";
import loadDatabase from "./util/load.database";
import log from "./util/logger";

const client = new loadApp({
  port: 3000,
  log: log,
})

const database = new loadDatabase({
  url: 'mongodb+srv://elixxrade:elixxrade@cluster0.tbam6.mongodb.net/uwu?retryWrites=true&w=majority',
  log: log
}).loadDatabase()

client
  .loadApp()
  .loadSettings()
  .loadRoutes()


const app = client.getApp()
app.set('QXC', database.trusted)