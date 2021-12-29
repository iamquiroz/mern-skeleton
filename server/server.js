import config from "./../config/config";
import app from "./express";

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    // Connect to Database()
    this.connectionDB();
  }
  async connectionDB() {
    await dbConnection();
  }
}
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
