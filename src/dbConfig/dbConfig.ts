import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected");
    });

    connection.on("error", () => {
      console.log("Error in mongodb connection");
      process.exit();
    });
  } catch (error) {
    console.log("error in config file", error);
  }
};

export default connect;
