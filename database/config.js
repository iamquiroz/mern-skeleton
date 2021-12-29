const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database Alive!");
  } catch (error) {
    console.log(error);

    mongoose.connection.on("error", () => {
      throw new Error(`Unable to connect to database: ${mongoUri}`);
    });
  }
};

module.exports = {
  dbConnection,
};
